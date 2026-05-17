import {create} from "zustand";

const useAuthStore=create((set)=>({
    token:localStorage.getItem("token") || null,
    refreshToken:localStorage.getItem("refreshToken") || null,
    login:(token,refreshToken)=>{
        localStorage.setItem("token",token);
        if(refreshToken){
            localStorage.setItem("refreshToken",refreshToken);
        } else {
            localStorage.removeItem("refreshToken");
        }
        set({token,refreshToken:refreshToken || null});
    },
    setToken:(token)=>{
        localStorage.setItem("token",token);
        set({token});
    },
    logout:()=>{
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        set({token:null,refreshToken:null});
    }

}));

export default useAuthStore;
