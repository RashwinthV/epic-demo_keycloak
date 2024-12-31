import { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";
import axios from "axios";

const UseAuth = () => {
    const isRun = useRef(false);
    const [isLogin, setLogin] = useState(false);
    const [keycloakInstance, setKeycloakInstance] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        if (isRun.current) return;

        isRun.current = true;

        const client = new Keycloak({
            url: import.meta.env.VITE_KEYCLOAK_URL || "http://localhost:8080/",
            realm: import.meta.env.VITE_KEYCLOAK_REALM || "Epic",
            clientId: import.meta.env.VITE_KEYCLOAK_CLIENT || "Epicx",
        });

        client
            .init({ onLoad: "login-required" })
            .then(async (authenticated) => {
                if (authenticated) {
                    const token = client.token;

                    // Validate token with backend
                    try {
                        const response = await axios.post("http://localhost:3000/api/authorize", { token });
                        if (response.data.authorized) {
                            setLogin(true);
                            setKeycloakInstance(client);
                        } else {
                            setLogin(false);
                            setErrorMessage("Unauthorized: Token invalid");
                        }
                    } catch (error) {
                        setLogin(false);
                        setErrorMessage("Authorization failed: " + error.message);
                    }
                } else {
                    setLogin(false);
                    setErrorMessage("Authentication failed");
                }
            })
            .catch((error) => {
                setErrorMessage("Keycloak initialization failed");
            });
    }, []);

    // Handle token expiration and refresh
    useEffect(() => {
        const interval = setInterval(() => {
            if (keycloakInstance && keycloakInstance.isTokenExpired()) {
                keycloakInstance.updateToken(70).then((refreshed) => {
                    if (!refreshed) {
                    }
                }).catch((error) => {
                });
            }
        }, 60000); 

        return () => clearInterval(interval); 
    }, [keycloakInstance]);

    return { isLogin, keycloak: keycloakInstance, errorMessage };
};

export default UseAuth;
