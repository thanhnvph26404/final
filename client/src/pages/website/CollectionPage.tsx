import { useGetCategoryListQuery } from "../../store/categoies/category.services"
import { Link } from "react-router-dom"

const CollectionPage = () => {




    const { data: categories } = useGetCategoryListQuery(null)

    return (
        <div>
            <div className="mt-[50px]">
                <h1 className="text-[56px] leading-[62px] font-semibold text-[#23314B] text-center ">Tất cả bộ sưu tập</h1>
            </div>
            <div>
                <div className="grid grid-cols-4 gap-3 grid-flow-col   mt-[40px] ml-[50px]">
                    {categories?.data.map((category: any) => {
                        return (
                            <div className="relative w-full sm:w-80 flex-col rounded-xl bg-clip-border text-gray-700 overflow-hidden">
                                <div className="relative h-96 sm:h-100 overflow-hidden rounded-xl bg-clip-border text-gray-700 group">
                                    <div className="object-cover w-full transform scale-100 group-hover:scale-105 transition-transform bg-gray-600">
                                        <img className="object-cover w-full opacity-70" src={category?.image.url} alt="profile-picture" />
                                        <Link to={`/products/${category._id}`}>
                                            <p className="absolute text-white top-[170px] left-[30%] text-[25px] font-semibold text-center">{category?.title}</p>
                                            <p className="text-white pt-[100px] font-[Noto Sans] text-[20px] font-bold absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                <i className="fas fa-chevron-circle-right fa-2x"></i>
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </div>
    )
}

export default CollectionPage