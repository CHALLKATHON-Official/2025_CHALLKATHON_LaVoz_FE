import { useCallback } from "react";
import { apiClient } from "@/api/client";
import { useAuthStore } from "@/hooks/authStore";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    accessToken,
    refreshToken,
    login: loginToStore,
    logout: logoutFromStore,
  } = useAuthStore();

  const loggedIn = isAuthenticated;

  const isTokenValid = (token: string | null) => !!token;

  const login = useCallback(
    async ({ loginId, password }: { loginId: string; password: string }) => {
      try {
        const response = await apiClient.post(`/member/login`, {
          loginId,
          password,
        });

        const accessToken = response.data.result.tokenDto.accessToken;
        const refreshToken = response.data.result.tokenDto.refreshToken;

        if (!isTokenValid(accessToken) || !isTokenValid(refreshToken)) {
          throw new Error("유효하지 않는 토큰");
        }

        loginToStore({ accessToken, refreshToken });
        return true;
      } catch {
        throw new Error("로그인에 실패했습니다.");
      }
    },
    [loginToStore]
  );

  const logout = useCallback(() => {
    logoutFromStore();
    navigate("/login");
  }, [logoutFromStore, navigate]);

  return {
    isAuthenticated,
    accessToken,
    refreshToken,
    loggedIn,
    login,
    logout,
  };
};

export default useAuth;
