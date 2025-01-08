// ========AUTH ENDPOINTS========
import {
  AuthResponse, LoginRequest, ProfileResponse, RefreshTokenResponse, registerEmployeeRequest, RegisterRequest, ResetTokenResponse, Response
  
 } from "@/types/api";
import { PROTECTED_API, PUBLIC_API } from "./axios";
import { AxiosError } from "axios";
import cookieStorage from "@/utils/cookieStorage";


// LOGIN USER
export const login = async (userData: LoginRequest) => {
  try {
    
    const response = await PUBLIC_API.post<AuthResponse>(
      "auth/login",
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error(error instanceof AxiosError ? error.response?.data.message : "Login failed");
  }
};
// REGISTER USER
export const register = async (userData: RegisterRequest) => {
  try {
    const response = await PUBLIC_API.post<AuthResponse>(
      "auth/register",
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError ? error.response?.data.message : "Registration failed"
    );
  }
};
export const registerEmployeeApi = async (userData: registerEmployeeRequest) => {
  try {
    const response = await PUBLIC_API.post<AuthResponse>(
      "auth/register/employer",
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError ? error.response?.data.message : "Registration failed"
    );
  }
};


// AUTHENTICATE USER USING TOKEN FORM 
export const authenticate = async ():Promise<ProfileResponse | null> => {
  try {
    const response = await PROTECTED_API.get<ProfileResponse>("/profile/get-profile");
    return response.data;
  } catch (error) {
    if(error instanceof AxiosError){
      if(error.response?.status === 401){
        const refreshToken = cookieStorage.getItem("refreshToken")
        if(refreshToken){
          const response = await refreshTokenApi(refreshToken)
          cookieStorage.setItem("accessToken", response.payload.tokens?.accessToken || "",{expires:new Date(Date.now()+1000*60*60*24)})
          cookieStorage.setItem("refreshToken", response.payload.tokens?.refreshToken || "",{expires:new Date(Date.now()+1000*60*60*24*30)})
          if(response.success){
            return authenticate()
          }
          }
      }
    }
    throw new Error(error instanceof AxiosError ? error.response?.data.message : "Authentication failed");
  }
}


// SEND OTP
export const sendOTPApi = async (email: string) => {
  try {
    const response = await PUBLIC_API.post<Response>(
      "/users/request/reset/password",
      {email}
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError ? error.response?.data.message : "Registration failed"
    );
  }
};
// CONFIRM OTP

export const confirmOTPApi = async (email: string,otp:number|undefined) => {
  try {
    const response = await PUBLIC_API.post<ResetTokenResponse>(
      "/users/verify/reset/password",
      {email,otp}
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error instanceof AxiosError ? error.response?.data.message : "Registration failed"
    );
  }
};


// REFRESH TOKEN
export const refreshTokenApi = async (refreshToken:string) => {
  try {
    const response = await PROTECTED_API.post<RefreshTokenResponse>("/auth/refresh-token",{refreshToken})
    return response.data
  } catch (error) {
    throw new Error(error instanceof AxiosError ? error.response?.data.message : "Refresh token failed")
  }
} 

// LOGOUT
export const logoutApi = async () => {
  try {
    const response = await PROTECTED_API.get("/auth/logout")
    return response.data
  } catch (error) {
    throw new Error(error instanceof AxiosError ? error.response?.data.message : "Logout failed")
  }
}

// LOGOUT ON ALL DEVICES
export const logoutOnAllDevicesApi = async () => {
  try {
    const response = await PROTECTED_API.get("/auth/logout/all")
    return response.data
  } catch (error) {
    throw new Error(error instanceof AxiosError ? error.response?.data.message : "Logout on all devices failed")
  }
}

// GOOGLE LOGIN
export const googleLogin = async (authorisationToken:string):Promise<AuthResponse> => {
  try {
    const response = await PUBLIC_API.post<AuthResponse>("/auth/firebase/login",{firebaseToken:authorisationToken})
    return response.data
  } catch (error) {
    throw new Error(error instanceof AxiosError ? error.response?.data.message : "Google login failed")
  }
}

// GOOGLE REGISTER
export const googleRegister = async (authorisationToken:string) => {
  try {
    const response = await PUBLIC_API.post<AuthResponse>("/auth/firebase/register",{firebaseToken:authorisationToken})
    return response.data
  } catch (error) {
    throw new Error(error instanceof AxiosError ? error.response?.data.message : "Google Register failed")
  }
}


// DELETE ACCOUNT



//RESET PASSWORD
export const ResetPassword = async (data:{newPassword:string,resetToken:string}) => {
  try {
    const response = await PROTECTED_API.post<Response>("/users/reset/password",data)
    return response.data
  } catch (error) {
    throw new Error(error instanceof AxiosError ? error.response?.data.message : "Change password failed")
  }
}

// CHANGE PASSWORD
export const changePasswordApi = async (data:{newPassword:string,currentPassword:string}) => {
  try {
    const response = await PROTECTED_API.post<Response>("/user/change/password",data)
    return response.data
  } catch (error) {
    throw new Error(error instanceof AxiosError ? error.response?.data.message : "Change password failed")
  }
}