const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Enable CORS for all requests
app.use(cors());

// Keycloak configuration
const keycloakUrl = "http://localhost:8080/realms/Epic";
const publicKeyUrl = `${keycloakUrl}/protocol/openid-connect/certs`;

let publicKeys = []; // Store public keys indexed by kid

// Fetch the public keys
const fetchPublicKeys = async () => {
    try {
        const response = await axios.get(publicKeyUrl);
        publicKeys = response.data.keys;
    } catch (error) {
        console.error("Failed to fetch public keys:", error.message);
        throw new Error("Could not retrieve public keys");
    }
};

// Find public key by kid
const getPublicKey = (kid) => {
    const key = publicKeys.find(k => k.kid === kid);
    if (!key || !key.x5c || !key.x5c[0]) {
        throw new Error("Public key not found for kid");
    }
    // Convert the certificate into a public key
    return `-----BEGIN CERTIFICATE-----\n${key.x5c[0]}\n-----END CERTIFICATE-----`;
};

// Middleware to verify token
const verifyToken = async (token) => {
    const decodedToken = jwt.decode(token, { complete: true });
    const kid = decodedToken.header.kid;

    if (!kid) {
        throw new Error("Token does not contain kid");
    }

    const publicKey = getPublicKey(kid);

    try {
        return jwt.verify(token, publicKey, { algorithms: ["RS256"] });
    } catch (error) {
        console.error("Token verification failed:", error.message);
        throw new Error("Token is invalid or expired");
    }
};

// Endpoint to validate the token
app.post("/api/authorize", express.json(), async (req, res) => {
    const token = req.body.token;
    if (!token) {
        return res.status(400).json({ authorized: false, message: "Token is missing" });
    }

    try {
        if (publicKeys.length === 0) {
            await fetchPublicKeys();
        }
        const decoded = await verifyToken(token);
        res.status(200).json({ authorized: true, user: decoded });
    } catch (error) {
        console.error("Token verification failed:", error.message);
        res.status(401).json({ authorized: false, message: error.message });
    }
});

fetchPublicKeys().then(() => {
    app.listen(PORT, () => {
        console.log(`Backend is running at http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error("Error fetching public keys:", err.message);
});
