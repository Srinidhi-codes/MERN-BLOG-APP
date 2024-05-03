import jwt from "jsonwebtoken";

const requireSignIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({ success: false, message: "Authorization token is missing" });
        }
        const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).send({ success: false, message: "Invalid or expired token" });
    }
};

export default requireSignIn;
