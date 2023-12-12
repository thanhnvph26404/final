import { useEffect, useState } from "react";
import { BsImageFill } from "react-icons/bs";
import { AiOutlineLoading3Quarters, AiOutlinePlus } from "react-icons/ai";
import { useUpdateImageMutation } from "../../store/upload/upload.service";
import { useForm, SubmitHandler } from "react-hook-form";
import { Image } from "../../store/upload/upload.interface";
import { ICategory } from "../../store/categoies/category.interface";
import
{
    useEditCategoryMutation,
    useGetCategoryQuery,
} from "../../store/categoies/category.services";
import { toastSuccess, toastError } from "../../hook/toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../store/hook";
import { addNewCategory } from "../../store/categoies/categorySlice";
import { Skeleton } from "antd";


const EditCategory = () =>
{
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm<ICategory>();
    const [ updateImageMutation, { isLoading, isError } ] =
        useUpdateImageMutation();
    const [ uploadedImages, setUploadedImages ] = useState<Image>();
    const [ editCategoryMutation, { isLoading: isLoadingEditCategory } ] =
        useEditCategoryMutation();

    const {
        data: category,
        isLoading: isLoadingCategory
    } = useGetCategoryQuery( id! );

    useEffect( () =>
    {
        console.log( category );
        if ( category )
        {
            setValue( "title", category.title );
            setUploadedImages( category.image );
        }
    }, [ category ] );
    const onSubmit: SubmitHandler<ICategory> = async ( data ) =>
    {
        if ( uploadedImages )
        {
            const formData = {
                _id: id,
                title: data.title,
                image: uploadedImages,
            };
            try
            {
                await editCategoryMutation( formData )
                    .unwrap()
                    .then( () =>
                    {
                        toastSuccess( "Cập nhật danh mục thành công!" );
                    } )
                    .then( () =>
                    {
                        dispatch( addNewCategory( formData ) );
                    } )
                    .then( () =>
                    {
                        navigate( "/admin/category" );
                    } );
            } catch ( error )
            {
                toastError( "Cật nhật danh mục thất bại!" );
            }
        }
    };

    // upload image

    const handleFileChange = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) =>
    {
        try
        {
            if ( event.target.files )
            {
                const files = event.target.files[ 0 ];
                //add file to form data
                if ( uploadedImages )
                {
                    const formData = new FormData();
                    const publicId = uploadedImages.uid;
                    formData.append( "images", files );

                    await updateImageMutation( { publicId, formData } )
                        .unwrap()
                        .then( ( data: any ) =>
                        {
                            console.log( data );

                            setUploadedImages( data.urls );
                        } )
                        .then( () =>
                        {
                            toastSuccess( "Tải ảnh thành công" );
                        } );
                }
            }
        } catch ( error )
        {
            toastError( "Tải ảnh thất bại!" );
        }
    };

    return (

        <div>
            <div className=" h-10">
                <h1 className="text-2xl font-semibold ">Cập nhật danh mục</h1>
            </div>

            { isLoadingCategory ? <Skeleton active paragraph={ { rows: 7 } } /> : <form action="" onSubmit={ handleSubmit( onSubmit ) }>
                <div className="max-w-full border-[#E0E2E7] border rounded-lg mx-auto mt-10 bg-white p-6">
                    <h3 className="text-xl text-[#1D1F2C] font-medium mb-3.5">
                        Thông tin danh mục{ " " }
                    </h3>
                    <div>
                        <h5 className="text-sm text-[#777980] font-medium">
                            Tên danh mục
                        </h5>
                        <input
                            type="text"
                            placeholder="Nhập tên danh mục ở đây..."
                            className="px-3 py-2 placeholder:text-sm placeholder:text-[#777980] font-normal outline-none border border-[#E0E2E7] rounded-lg w-full mt-1"
                            { ...register( "title", {
                                required: "Tên danh mục là bắt buộc",
                                minLength: {
                                    value: 2,
                                    message:
                                        "Tên danh mục cần tối thiểu 2 kí tư",
                                },
                            } ) }
                        />
                        { errors.title && (
                            <p className="text-red-500">
                                { errors.title.message }
                            </p>
                        ) }
                    </div>
                </div>
                {/* upload */ }
                <div className="max-w-full p-6 border-[#E0E2E7] border rounded-lg mx-auto mt-10 bg-white">
                    <h3 className="text-xl text-[#1D1F2C] font-medium mb-8">
                        Ảnh{ " " }
                    </h3>
                    <label
                        id="img"
                        className="bg-white border-dashed border border-[#E0E2E7] p-6 rounded-lg cursor-pointer flex items-center flex-col"
                    >
                        <input
                            type="file"
                            { ...register( "image" ) }
                            onChange={ handleFileChange }
                            accept=".jpg, .jpeg, .png, .gif"
                            hidden
                            id="img"
                        />

                        <div className="rounded-full h-9 w-9 bg-[#EBEEFF] flex items-center mb-4">
                            <BsImageFill className="text-base text-[#2BB2FE] mx-auto" />
                        </div>
                        <p className="text-center text-sm text-[#858D9D]">
                            Kéo hoặc thả ảnh ở đây, hoặc click để thêm
                        </p>
                    </label>
                    { errors.image && (
                        <p className="text-red-500">{ errors.image.message }</p>
                    ) }
                    { isError && (
                        <p className="text-red-500 ">Tải ảnh thất bại</p>
                    ) }
                    <div className="mt-4 grid grid-cols-3 gap-4 min-h-[180px]">
                        { isLoading && (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) }
                        { uploadedImages && (
                            <div key={ uploadedImages?.uid } className="relative w-40 h-30 object-cover overflow-hidden">
                                <img
                                    src={ uploadedImages?.url }
                                    alt="Preview"
                                    className=" "
                                />
                                <button className="absolute top-2 right-2 bg-gray-600 font-semibold text-white p-2 rounded-full hover:opacity-75 transition duration-300">
                                    Xóa
                                </button>
                            </div>
                        ) }
                    </div>
                </div>
                {/* button */ }
                <div className="h-[72px] border-t bg-white flex items-center justify-end">
                    <button className="text-white bg-[#858D9D] rounded-lg flex items-center py-2.5 px-3.5 hover:opacity-70">
                        { isLoadingEditCategory ? (
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        ) : (
                            <AiOutlinePlus className="font-semibold text-base mr-1" />
                        ) }{ " " }
                        <p className="text-sm font-semibold">
                            Cập nhật Danh mục
                        </p>
                    </button>
                </div>
            </form> }

        </div>
    );
};

export default EditCategory;
