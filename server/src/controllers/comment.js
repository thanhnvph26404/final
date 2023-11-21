import comment from "../models/comment";
import Auth from "../models/auth";
import Product from "../models//products";
import { commentSchema } from "../schemas/comment"

export const creatComment = async (req, res) => {
    try {

        // const { _id: iduser } = req.user;
        // const checkuser = await Auth.findById(iduser);
        // if (!checkuser) {
        //     return res.status(400).json({
        //         message: "tài khoản không tồn tại",
        //     });
        // }
        // const checkproduct = await Product.findById(req.body.product);
        // if (!checkproduct) {
        //     return res.status(400).json({
        //         message: "sản phẩm không tồn tại",
        //     });
        // }


        const { error } = commentSchema.validate(req.body, { abortEarly: false })
        if (error) {
            const errors = error.details.map(err => err.message)
            console.log(errors)
            return res.status(401).json({
                data: errors,

            });
        }
        const Comment = await comment.create({ ...req.body })
        if (!comment) {
            return res.status(400).json({

                message: "lỗi không thêm được bình luận "
            })
        }
        return res.status(200).json({
            message: "thêm bình luận thành công ",
            Comment
        })

    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server: " + error.message,
        });

    }
}
export const getAllComment = async (req, res) => {
    try {
        const Comment = await comment.find()
        if (!comment) {
            return res.status(400).json({
                message: "lỗi lấy bình luận "
            })
        }
        return res.status(200).json({
            message: "lấy thành công ",
            Comment
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server: " + error.message,
        });
    }
}

export const getCommentbyidproduct = async (req, res) => {
    const { id } = req.params
    try {
        const Comment = await comment.find({ product: id })
        if (!comment) {
            return res.status(400).json({
                message: "lỗi lấy bình luận "
            })
        }
        return res.status(200).json({
            message: "lấy thành công ",
            Comment
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server: " + error.message,
        });
    }
}

export const getOneComment = async (req, res) => {
    try {
        const { id } = req.params

        const Comment = await comment.findById(id)
        if (!comment) {
            return res.status(400).json({
                message: "lỗi lấy thương hiệu "
            })
        }
        return res.status(200).json({
            message: "lấy thành công ",
            Comment
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server: " + error.message,
        });
    }
}
export const updateComment = async (req, res) => {
    try {
        const { id } = req.params

        const Comment = await comment.findByIdAndUpdate(id, req.body, { new: true })
        if (!comment) {
            return res.status(400).json({
                message: "lỗi lấy bình luận "
            })
        }
        return res.status(200).json({
            message: "update thành công ",
            Comment
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server: " + error.message,
        });
    }

}
export const deleteComment = async (req, res) => {
    try {
        const { id } = req.params

        const Comment = await comment.findByIdAndDelete(id)
        if (!comment) {
            return res.status(400).json({
                message: "lỗi lấy bình luận "
            })
        }
        return res.status(200).json({
            message: "xóa  thành công ",
            Comment
        })
    } catch (error) {
        return res.status(500).json({
            message: "Lỗi server: " + error.message,
        });
    }
}