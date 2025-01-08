/* eslint-disable @typescript-eslint/no-explicit-any */
import { authenticate, changePasswordApi, confirmOTPApi, login, logoutApi, register, registerEmployeeApi, ResetPassword, sendOTPApi } from "@/api/auth";
import { AuthResponse, LoginRequest, ProfileResponse, registerEmployeeRequest, RegisterRequest, ResetTokenResponse, Response } from "@/types/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Register user 
export const registerUser = createAsyncThunk<AuthResponse, RegisterRequest>(
  "auth/register",
  async (registerData, { rejectWithValue }) => {
    try {
      const response = await register(registerData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerEmployee = createAsyncThunk<AuthResponse, registerEmployeeRequest>(
  "auth/register/employer",
  async (registerData, { rejectWithValue }) => {
    try {
      const response = await registerEmployeeApi(registerData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Login user 
export const loginUser = createAsyncThunk<AuthResponse, LoginRequest>(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const response = await login(loginData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Authenticate user
export const authenticateUser = createAsyncThunk<ProfileResponse, void>(
  "auth/authenticate",
  async (_data, { rejectWithValue }) => {
    try {
      const response = await authenticate();
      if (!response) {
        return rejectWithValue("Authentication failed");
      }
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Authenticate user
export const sendOTP = createAsyncThunk<Response,string>(
  "sendOtp",
  async (email, { rejectWithValue }) => {
    try {
      const response = await sendOTPApi(email);
      return response;
    } catch (error: any) {
      console.log(error)
      return rejectWithValue(error.message);
    }
  }
);


// Confirm OTP
export const confirmOTP = createAsyncThunk<ResetTokenResponse, {email: string, otp: number|undefined}>(
  "confirmOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await confirmOTPApi(data.email, data?data.otp:undefined);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const resetPassword = createAsyncThunk<Response, {newPassword:string,resetToken:string}>(
  "resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await ResetPassword(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const changePassword = createAsyncThunk<Response, {newPassword:string,currentPassword:string}>(
  "changePassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await changePasswordApi(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_,{ rejectWithValue }) => {
    try {
      const response = await logoutApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);