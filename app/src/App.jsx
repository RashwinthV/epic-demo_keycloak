import React from "react";
import Body from "./components/Body";
import Header from "./components/Header";
import UseAuth from "./Hooks/UseAuth";

function App() {
    const { isLogin, keycloak } = UseAuth();

    return isLogin ? (
        <div>
            <Header/> 
            <Body />
        </div>
    ) : (
        <div>
           nauthorized Login
        </div>
    );
}

export default App;
