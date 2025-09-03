import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosInstance.ts";
import { create } from "zustand";
import { getAxiosErrorMessage } from "../utils/getAxiosErrorMessage.ts";

type AuthState = {
  authUser: {
    _id: string;
    name: string;
    dateOfBirth: string;
    email?: string;
    emailOtp?: string;
  } | null;

  isSigningUp: boolean;
  isSigningIn: boolean;
  isCheckingAuth: boolean;

  checkAuth: () => Promise<void>;
  getOtpOnSignUp: (formdata: {
    name: string;
    dateOfBirth: string;
    email: string;
  }) => Promise<boolean>;
  signup: (formdata: { email: string; otp: string }) => Promise<void>;
  getOtpOnSignIn: (formdata: { email: string }) => Promise<boolean>;
  signin: (formdata: { email: string; otp: string }) => Promise<void>;
  signout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isSigningIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check-auth");

      set({ authUser: res.data.user });
    } catch (error) {
      const message = getAxiosErrorMessage(error);

      console.log("Error in checkAuth:", message);

      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  getOtpOnSignUp: async (formdata) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("/auth/signup/get-otp", formdata);

      toast.success(res.data.message);
      return true;
    } catch (error) {
      const message = getAxiosErrorMessage(error);

      console.log("Error in getOtpOnSignUp:", message);

      toast.error(message);
      return false;
    } finally {
      set({ isSigningUp: false });
    }
  },

  signup: async (formdata) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("/auth/signup", formdata);

      set({ authUser: res.data.user });

      toast.success(res.data.message);
    } catch (error) {
      const message = getAxiosErrorMessage(error);

      console.log("Error in signup:", message);

      toast.error(message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  getOtpOnSignIn: async (formdata) => {
    set({ isSigningIn: true });

    try {
      const res = await axiosInstance.post("/auth/signin/get-otp", formdata);

      toast.success(res.data.message);
      return true;
    } catch (error) {
      const message = getAxiosErrorMessage(error);

      console.log("Error in getOtpOnSignIn:", message);

      toast.error(message);
      return false;
    } finally {
      set({ isSigningIn: false });
    }
  },

  signin: async (formdata) => {
    set({ isSigningIn: true });

    try {
      const res = await axiosInstance.post("/auth/signin", formdata);

      set({ authUser: res.data.user });

      toast.success(res.data.message);
    } catch (error) {
      const message = getAxiosErrorMessage(error);

      console.log("Error in signin:", message);

      toast.error(message);
    } finally {
      set({ isSigningIn: false });
    }
  },

  signout: async () => {
    try {
      const res = await axiosInstance.post("/auth/signout");

      set({ authUser: null });

      toast.success(res.data.message);
    } catch (error) {
      const message = getAxiosErrorMessage(error);

      console.log("Error in logout:", message);

      toast.error(message);
    }
  },
}));
