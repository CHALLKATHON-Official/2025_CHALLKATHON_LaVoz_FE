import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  login: (tokens: { accessToken: string; refreshToken: string }) => void;
  logout: () => void;
}

const getInitialAuthState = () => {
  const saved = localStorage.getItem("authState");
  if (saved) {
    return JSON.parse(saved);
  }
  return {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
  };
};

export const useAuthStore = create<AuthState>((set) => ({
  ...getInitialAuthState(),
  login: ({ accessToken, refreshToken }) => {
    const newState = {
      isAuthenticated: true,
      accessToken,
      refreshToken,
    };
    localStorage.setItem("authState", JSON.stringify(newState));
    set(newState);
  },
  logout: () => {
    localStorage.removeItem("authState");
    set({
      isAuthenticated: false,
      accessToken: null,
      refreshToken: null,
    });
  },
}));
