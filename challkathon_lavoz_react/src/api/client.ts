import axios from "axios";

const getAuthState = () => {
  const authState = localStorage.getItem("authState");
  return authState ? JSON.parse(authState) : null;
};

const baseUrl = import.meta.env.VITE_API_URL;

export const apiClient = axios.create({
  baseURL: baseUrl,
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    const authState = getAuthState();
    const accessToken = authState?.accessToken;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    } else {
      delete config.headers.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const authState = getAuthState();
      const refreshToken = authState?.refreshToken;
      if (!refreshToken || error.config.url.includes("/member/reissue")) {
        return Promise.reject(error);
      }

      try {
        const response = await axios.post(`${baseUrl}/member/reissue`, {
          refreshToken,
        });

        const newAccessToken = response.data.result.tokenDto.accessToken;
        const updatedAuthState = {
          ...authState,
          accessToken: newAccessToken,
        };

        localStorage.setItem("authState", JSON.stringify(updatedAuthState));
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(error.config);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
