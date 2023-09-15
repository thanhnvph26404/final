import jwt from "jsonwebtoken"
import User from "../models/auth"
export const authMiddlware = async ( req, res, next ) =>
{
    try
    {
        
        if (req?.headers?.authorization?.startsWith("Bearer "))
        console.log('1');
        {
            const token = req.headers.authorization.split("Bearer ")[1];
            console.log('1');
            if ( token )
            {
                const decoded = jwt.verify( token, process.env.SECRET_KEY );
                const user = await User.findById( decoded?.id );
                console.log( user );

                req.user = user;
                next();
            } else
            {
                throw new Error( "bạn chưa đăng nhập " );
            }
        }
    } catch ( error )
    {
        console.log('1');
        return res.status( 401 ).json( { message: "Lỗi token " } );

    }

}
export const isAdmin = async ( req, res, next ) =>
{
    const { email } = req.user
    const users = await User.findOne( { email } );
    if ( users?.role !== "Admin" )
    {
        res.status( 401 ).json( { message: "bạn không có quyền truy cập  " } );
    } else
    {
        next()
    }
}