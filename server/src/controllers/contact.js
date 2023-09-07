import { sendContact } from "../middleware/sendEmail";
import Contact from "../models/contact";
import { contactSchema } from "../schemas/contact"

export const creatContact = async ( req, res ) =>
{
    try
    {
        const { error } = contactSchema.validate( req.body, { abortEarly: false } )
        if ( error )
        {
            const errors = error.details.map( ( err ) => err.message )
            return res.status( 400 ).json( {
                message: errors
            } );
        }
        const contact = await Contact.create( req.body );
        sendContact( req.body );
        return res.status( 200 ).json( {
            message: "phản hồi thành công ",
            contact
        } )
    } catch ( error )
    {
        console.error( err );
        return res.status( 500 ).json( {
            message: "Đã có lỗi xảy ra",
        } );
    }
}