import React from "react";
import Body from "./components/Body1";
import Header from "./components/Header";
import UseAuth from "./Hooks/UseAuth";
import Unauthorized from "./components/Unauthorized";

function App() {
    const { isLogin, keycloak } = UseAuth();

    return isLogin ? (
        <div>
            <Header/> 
            <Body />
        </div>
    ) : (
        <div>
<Unauthorized/>        </div>
    );
}

export default App;
