import React,{useState,useEffect} from "react";

const AuthContext = React.createContext({
isLoggedIn: false,
onLogout:()=>{},
onLogin:(email,college,password)=>{}
});

export const AuthContextProvider=(props) =>{
    const [isLoggedIn,setIsLoggedIn] =useState(false);

    useEffect(()=>{
        const logininfo= localStorage.getItem('Loggedin');
        if(logininfo==='1')
        {
          setIsLoggedIn(true);
        }
       },[]);

    const logoutHandler=()=>{
        localStorage.removeItem('Loggedin')
        setIsLoggedIn(false);
    };

    const loginHandler=()=>{
        localStorage.setItem('Loggedin','1');
        setIsLoggedIn(true);
    };
    return <AuthContext.Provider value={
        {isLoggedIn:isLoggedIn,
    onLogout: logoutHandler, 
    onLogin:loginHandler}
    }>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContext;