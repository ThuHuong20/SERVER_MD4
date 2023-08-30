
import jwt from 'jsonwebtoken';

export default {
    createToken: function (data: any, time: any) {
        // time(ms)
        try {
            return jwt.sign(
                data
                , process.env.JWT_KEY ?? ""
                , { expiresIn: `${time}` });
        } catch (err) {
            return false
        }
    },
    verifyToken: function (token: any) {
        let result;
        jwt.verify(token, process.env.JWT_KEY ?? "", function (err: any, decoded: any) {
            if (err) {
                result = false
            } else {
                result = decoded
            }
        });
        return result
    }
}