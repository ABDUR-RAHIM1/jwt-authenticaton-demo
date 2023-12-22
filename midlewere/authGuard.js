
import Jwt from "jsonwebtoken";

const authGuard = async (req, res, next) => {
    const tokenScrate = "thisisthetokensecret"
    const { authorization } = req.headers

    try {
        const token = authorization.split(" ")[1];
        const decoded = Jwt.verify(token, tokenScrate)
        const { _id, userName, email } = decoded;
        req.userName = userName,
        req.email = email;
        next()

    } catch (error) {
         
        res.status(400).json({
             message: "Authentication Failed",
             error : error.message
        })
    }

}

export default authGuard;