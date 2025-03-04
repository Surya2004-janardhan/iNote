const jwt = require("jsonwebtoken");
const JWT_SECRET = "AvinashIsaGoodBoy.";

function fetchUser(req, res, next) {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send({
            error: "Please authenticate with valid credentials",
        });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send({
            error: "Please authenticate with valid credentials",
        });
    }
}

module.exports = fetchUser;