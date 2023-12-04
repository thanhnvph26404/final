import categories from "../models/categories";
import User from "../models/auth";
import Voucher from "../models/voucher";
import { voucherSchema } from "../schemas/voucher"
import Auth from "../models/auth";

export const creatVoucher = async ( req, res ) =>
{
    try
    {
        const { error } = voucherSchema.validate( req.body, { abortEarly: false } )
        if ( error )
        {
            const errors = error.details.map( ( err ) => err.message );
            return res.status( 400 ).json( {
                message: errors
            } );
        }
        const checkVoucher = await Voucher.findOne( { code: req.body.code } )
        if ( checkVoucher )
        {
            return res.status( 404 ).json( {
                message: "mã code đã tồn tại "
            } );

        }
        const vouchers = await Voucher.create( req.body );
        if ( !vouchers )
        {
            return res.status( 404 ).json( {
                message: "thêm voucher thất bại ",
            } )
        }

        res.status( 200 ).json( {
            vouchers,
            message: "thêm voucher thành công "
        } );


    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );
    }
}
export const updateVoucher = async ( req, res ) =>
{
    try
    {
        const { error } = voucherSchema.validate( req.body, { abortEarly: true } )
        if ( error )
        {
            const errors = error.details.map( ( err ) => err.message )
            return res.status( 400 ).json( {
                errors
            } )
        }
        // const checkCategory = await categories.findById(req.body.apply);
        // if (!checkCategory) {
        //     return res.status(400).json({
        //         message: "danh mục không tồn tại",
        //     });
        // }
        const vouchers = await Voucher.findByIdAndUpdate( req.params.id, req.body, { new: true } )
        if ( !vouchers )
        {
            return res.status( 404 ).json( {
                message: "update không thành công "
            } )
        }
        res.status( 200 ).json( {
            vouchers,
            message: "update thành công "
        } )
    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );
    }
}


export const checkVoucher = async ( req, res ) =>
{
    try
    {
        const data = await Voucher.findOne( { code: req.body.code } );

        if ( !data )
        {
            return res.status( 404 ).json( {
                message: "Voucher không tồn tại",
            } );
        }

        const user = await User.findOne( { vouchers: data._id } );
        if ( user )
        {
            return res.status( 400 ).json( {
                message: "Bạn đã sử dụng voucher này",
            } );
        }

        if ( data.limit === 0 )
        {
            return res.status( 404 ).json( {
                message: "Voucher đã hết lượt sử dụng",
            } );
        }

        return res.status( 200 ).json( {
            message: "Thông tin voucher",
            data: data,
        } );
    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );
    }
};

export const getAll = async ( req, res ) =>
{
    try
    {
        const vouchers = await Voucher.find();

        if ( !vouchers || vouchers.length === 0 )
        {
            return res.status( 404 ).json( {
                message: "Không có danh sách",
            } );
        }
        res.status( 200 ).json( {
            message: "Danh sách voucher",
            data: vouchers,
        } );
    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );
    }
};

export const getOne = async ( req, res ) =>
{
    try
    {
        const data = await Voucher.findById( req.params.id )
        // .populate("apply");

        if ( !data )
        {
            return res.status( 404 ).json( {
                message: "Không có thông tin",
            } );
        }

        return res.status( 200 ).json( {
            message: "Thông tin voucher",
            data: data,
        } );
    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );
    }
};


export const remove = async ( req, res ) =>
{
    try
    {
        const data = await Voucher.findByIdAndDelete( req.params.id );

        if ( !data )
        {
            return res.status( 404 ).json( {
                message: "Xóa voucher thất bại",
            } );
        }

        return res.status( 200 ).json( {
            message: "Xóa voucher thành công ",
        } );
    } catch ( error )
    {
        return res.status( 500 ).json( {
            message: "Lỗi server: " + error.message,
        } );
    }
};
export const saveVoucherToUser = async ( req, res ) =>
{
    const { _id } = req.user
    const { voucherId } = req.body
    console.log( voucherId );
    try
    {
        const user = await Auth.findById( _id );
        console.log( user );// Tìm người dùng trong cơ sở dữ liệu
        const alreadyExists = user.vouchers.find( ( id ) => id.toString() === voucherId );
        console.log( alreadyExists );
        if ( alreadyExists )
        {
            // Kiểm tra nếu không tìm thấy người dùng hoặc voucher, hoặc nếu không hợp lệ
            return res.status( 400 ).json( { message: "bạn đã lưu voucher" } );
        } else
        {
            let updateVoucher = await Auth.findByIdAndUpdate(
                _id,
                {
                    $push: { vouchers: voucherId }
                },
                { new: true }
            );
            res.json(
                updateVoucher
            )
        }


    } catch ( error )
    {
        console.error( "Lỗi khi cập nhật đơn hàng:", error );
        return res.status( 500 ).json( { message: "Đã xảy ra lỗi khi cập nhật đơn hàng" } );
    }
};





