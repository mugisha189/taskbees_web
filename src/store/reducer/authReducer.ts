
import { AuthResponse, Company, CompanyResponse, ResetTokenResponse, Response, User } from "@/types/api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authenticateUser, changePassword, confirmOTP, loginUser, logoutUser, registerEmployee, registerUser, resetPassword, sendOTP } from "../actions/authAction";
import cookieStorage from "@/utils/cookieStorage";
import toast from "react-hot-toast"
interface AuthState {
  company: Company | null;
  user: User | null;
  loading: boolean;
  resetEmail: string|null;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  resetEmail:null
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
   
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setCompany(state, action: PayloadAction<Company>) {
      state.company = action.payload;
    },
    logout(state) {
      cookieStorage.removeItem("accessToken")
      cookieStorage.removeItem("refreshToken")
      state.user = null;
      state.loading = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    }
    
  },
  extraReducers: (builder) => {
  
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.error = null;
          state.user = action.payload.payload.user;
          cookieStorage.setItem("accessToken", action.payload.payload.tokens?.accessToken || "")
          cookieStorage.setItem("refreshToken",action.payload.payload.tokens?.refreshToken||"")
          toast.success(action.payload.message)
          
          
        }
      )
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Registration failed"
        toast.error(action.payload as string)
        
      })
      .addCase(registerEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        registerEmployee.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.loading = false;
          state.error = null;
          state.user = action.payload.payload.user;
          cookieStorage.setItem("accessToken", action.payload.payload.tokens?.accessToken || "")
          cookieStorage.setItem("refreshToken",action.payload.payload.tokens?.refreshToken||"")
          toast.success(action.payload.message)
          
          
        }
      )
      .addCase(registerEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Registration failed"
        toast.error(action.payload as string)
        
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<AuthResponse|CompanyResponse>) => {
          state.loading = false;
          state.user = action.payload.payload.user;
          if (action.payload.role = "EMPLOYER") {
            
            state.company = action.payload.payload
          }
          state.error = null;
          cookieStorage.setItem("accessToken", action.payload.payload.tokens?.accessToken || "")
          cookieStorage.setItem("refreshToken",action.payload.payload.tokens?.refreshToken||"")
          toast.success(action.payload.message)
        }
    )
    .addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || "Login failed";
     
    })
    .addCase(authenticateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || "Authentication failed";
      
    })
    .addCase(authenticateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(
      authenticateUser.fulfilled,
      (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.user = action.payload.payload.user;
        toast.success(action.payload.message)
      }
    )
    .addCase(sendOTP.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || "Sending otp failed";
      toast.error(state.error)
      
    })
    .addCase(sendOTP.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(
      sendOTP.fulfilled,
      (state, action: PayloadAction<Response>) => {
        state.loading = false;
        state.error = null;
        toast.success(action.payload.message)
      }
    )
    .addCase(confirmOTP.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || "Authentication failed";
      toast.error(state.error)
    })
    .addCase(confirmOTP.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(
      confirmOTP.fulfilled,
      (state, action: PayloadAction<ResetTokenResponse>) => {
        cookieStorage.setItem('resetToken',action.payload.payload.resetToken||"")
        state.loading = false;
        toast.success(action.payload.message)
      }
    )
    .addCase(changePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || "Change password failed";
      toast.error(state.error)
    })
    .addCase(changePassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
      
    .addCase(
      changePassword.fulfilled,
      (state, action: PayloadAction<Response>) => {
        state.loading = false;
        state.error = null;
        toast.success(action.payload.message)
      }
    )
      .addCase(resetPassword.rejected, (state, action) => { 
        state.loading = false;
        state.error = action.payload as string || "Reset password failed";
        toast.error(state.error)
      })
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        resetPassword.fulfilled,
        (state, action: PayloadAction<Response>) => {
          state.loading = false;
          state.error = null;
          toast.success(action.payload.message)
        }
    )
    .addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || "Logout failed";
      toast.error(state.error)
    })
    .addCase(logoutUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(
      logoutUser.fulfilled,
      (state, action: PayloadAction<Response>) => {
        cookieStorage.removeItem("accessToken")
        cookieStorage.removeItem("refreshToken")
        state.user = null;
        state.loading = false;
        state.error = null;
        toast.success(action.payload.message)
      }
    )
   
  },
});
export const { logout,clearError,setUser } = authSlice.actions;
export default authSlice.reducer;
