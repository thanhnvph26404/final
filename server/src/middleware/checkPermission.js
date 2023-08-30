import jwt from "jsonwebtoken"
export const authMiddlware = async ( req, res, next ) =>
{
    try
    {
        if ( req?.headers?.authorization?.startsWith( "Bearer " ) )
        {
            const token = req.headers.authorization.split( "Bearer " )[ 1 ];
            console.log( token );
            if ( token )
            {
                const decoded = jwt.verify( token, process.env.SECRET_KEY )
                console.log( decoded );
            }
        }
    } catch ( error )
    {
        return res.status( 401 ).json( { message: "Lỗi token " } );

    }
}