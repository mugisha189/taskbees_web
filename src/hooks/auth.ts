
import { authenticate, googleLogin, googleRegister } from "@/api/auth";
import { app } from "@/lib/firebase";
import { toast } from "react-hot-toast";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import cookieStorage from "@/utils/cookieStorage";
import { AuthResponse, ProfileResponse } from "@/types/api";

const useGoogleLoginHook = async() => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  const signInWithGoogle = () => signInWithPopup(auth, provider);
  const response = await signInWithGoogle();
  const user:any=response.user;
  if(user){
    const idToken = await user.accessToken;
    const googleLoginResponse = await googleLogin(idToken)
    if (googleLoginResponse.payload.user) {
      cookieStorage.setItem("accessToken", googleLoginResponse.payload.tokens?.accessToken || "",{expires:new Date(Date.now()+1000*60*60*24)})
      cookieStorage.setItem("refreshToken", googleLoginResponse.payload.tokens?.refreshToken || "",{expires:new Date(Date.now()+1000*60*60*24*30)})
      return googleLoginResponse
    }
    else {
      toast.error(googleLoginResponse.message)
      return null;
    }
  }
  else {
    toast.error("Google Register failed")
    return null;
  }
  
};
const useGoogleRegisterHook = async ():Promise<AuthResponse | null> => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => signInWithPopup(auth, provider);
  const response = await signInWithGoogle();
  const user:any=response.user;
  if(user){
    const idToken = await user.accessToken;
    const googleLoginResponse = await googleRegister(idToken)
    if (googleLoginResponse.payload.user) {
      cookieStorage.setItem("accessToken", googleLoginResponse.payload.tokens?.accessToken || "",{expires:new Date(Date.now()+1000*60*60*24)})
      cookieStorage.setItem("refreshToken", googleLoginResponse.payload.tokens?.refreshToken || "",{expires:new Date(Date.now()+1000*60*60*24*30)})
      return googleLoginResponse
    }
    else {
      toast.error(googleLoginResponse.message)
      return null;
    }
  }
  else {
    toast.error("Google Register failed")
    return null;
  }
}
// AUTHENTICATE USER
const useAuthenticateHook = async (): Promise<ProfileResponse | null> => {
  try {
   
    const response = await authenticate()
    return response
  } catch (error) {
  
    return null
  }
 
}

export {useGoogleLoginHook,useGoogleRegisterHook,useAuthenticateHook};
