import Order from '../models/order';
import { orderSchema } from "../schemas/order"

export const createOrder = async ( req, res ) =>
{
    try
    {
        // Kiểm tra dữ liệu đầu vào
        const { error } = orderSchema.validate( req.body, { abortEarly: false } );
        if ( error )
        {
            const errors = error.details.map( ( err ) => err.message );
            return res.status( 400 ).json( {
                message: errors
            } );
        }

        const newOrder = new Order( req.body );
        const createdOrder = await newOrder.save();
        res.status( 201 ).json( {
            order: createdOrder,
            message: "Tạo đơn hàng thành công"
        } );
    } catch ( error )
    {
        res.status( 500 ).json( { message: "Lỗi server: " + error.message } );
    }
};
export const updateOrder = async ( req, res ) =>
{
    try
    {
        // Kiểm tra dữ liệu đầu vào
        const { error } = orderSchema.validate( req.body, { abortEarly: true } );
        if ( error )
        {
            const errors = error.details.map( ( err ) => err.message );
            return res.status( 400 ).json( {
                errors
            } );
        }

        const updatedOrder = await Order.findByIdAndUpdate( req.params.id, req.body, { new: true } );
        if ( !updatedOrder )
        {
            return res.status( 404 ).json( { message: "Cập nhật đơn hàng không thành công" } );
        }
        res.status( 200 ).json( {
            order: updatedOrder,
            message: "Cập nhật đơn hàng thành công"
        } );
    } catch ( error )
    {
        res.status( 500 ).json( { message: "Lỗi server: " + error.message } );
    }
};
export const deleteOrder = async ( req, res ) =>
{
    try
    {
        const deletedOrder = await Order.findByIdAndRemove( req.params.id );
        if ( !deletedOrder )
        {
            return res.status( 404 ).json( { message: "Xóa đơn hàng không thành công" } );
        }
        res.status( 200 ).json( { message: "Xóa đơn hàng thành công" } );
    } catch ( error )
    {
        res.status( 500 ).json( { message: "Lỗi server: " + error.message } );
    }
};
export const getAllOrders = async ( req, res ) =>
{
    try
    {
        const orders = await Order.find();
        res.status( 200 ).json( {
            orders,
            message: "Danh sách đơn hàng"
        } );
    } catch ( error )
    {
        res.status( 500 ).json( { message: "Lỗi server: " + error.message } );
    }
};
export const getOneOrder = async ( req, res ) =>
{
    try
    {
        const order = await Order.findById( req.params.id );
        if ( !order )
        {
            return res.status( 404 ).json( { message: "Không tìm thấy đơn hàng" } );
        }
        res.status( 200 ).json( {
            order,
            message: "Thông tin đơn hàng"
        } );
    } catch ( error )
    {
        res.status( 500 ).json( { message: "Lỗi server: " + error.message } );
    }
};
export const adaytotal = async ( req, res ) =>
{
    try
    {
        const today = new Date(); // Lấy ngày hiện tại

        // Đặt thời gian từ 00:00:00.000 đến 23:59:59.999 của ngày hiện tại
        const startOfToday = new Date( today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0 );
        const endOfToday = new Date( today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999 );

        const totalAmount = await Order.aggregate( [
            {
                $match: {
                    createdAt: {
                        $gte: startOfToday, // Lớn hơn hoặc bằng ngày bắt đầu của ngày hiện tại
                        $lte: endOfToday, // Nhỏ hơn hoặc bằng ngày cuối cùng của ngày hiện tại
                    },
                    status: { $nin: [ "Đã hủy", "Đã hoàn tiền" ] }, // Lọc trạng thái không phải 'đã hủy' hoặc 'đã hoàn tiền'
                },
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$paymentIntent.amount' }, // Tính tổng số tiền của các đơn hàng
                },
            },
        ] );

        if ( totalAmount.length > 0 )
        {
            res.json( {
                today: today.toISOString().split( 'T' )[ 0 ],
                totalAmount: totalAmount[ 0 ].totalAmount,
            } );
        } else
        {
            res.json( {
                today: today.toISOString().split( 'T' )[ 0 ],
                totalAmount: 0,
            } ); // Trả về 0 nếu không có đơn hàng nào trong ngày
        }
    } catch ( error )
    {
        console.error( "Lỗi khi tính tổng số tiền:", error );
        res.status( 500 ).json( { error: "Đã xảy ra lỗi khi tính tổng số tiền" } );
    }
}
export const calculateTotalAmount = async ( req, res ) =>
{
    try
    {
        // Tìm các đơn hàng có trạng thái không phải 'đã hủy' hoặc 'đã hoàn tiền'
        const orders = await Order.find( {
            status: { $nin: [ "Đã hủy", "Đã hoàn tiền" ] }
        } );

        // Tính tổng số tiền của các đơn hàng
        let totalAmount = 0;
        orders.forEach( ( order ) =>
        {
            totalAmount += order.paymentIntent.amount;
        } );

        res.json( {
            totalAmount
        } )
    } catch ( error )
    {
        console.error( "Lỗi khi tính tổng số tiền:", error );
        return 0;
    }
};
export const calculatetotalAmountday = async ( req, res ) =>
{
    try
    {
        const { startDate, endDate } = req.body;

        const start = new Date( startDate );
        const end = new Date( endDate );
        const datesInRange = [];

        // Tạo mảng chứa tất cả ngày trong khoảng thời gian
        const currentDate = new Date( start );
        while ( currentDate <= end )
        {
            datesInRange.push( new Date( currentDate ) );
            currentDate.setDate( currentDate.getDate() + 1 );
        }

        const result = await Order.aggregate( [
            {
                $match: {
                    status: { $nin: [ "Đã hủy", "Đã hoàn tiền" ] },
                    createdAt: {
                        $gte: new Date( startDate ),
                        $lt: new Date( endDate )
                    }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    totalAmount: { $sum: "$paymentIntent.amount" }
                }
            },
            {
                $sort: { _id: 1 } // Sắp xếp theo ngày tăng dần
            }
        ] );

        const logData = {};

        result.forEach( item =>
        {
            logData[ item._id ] = item.totalAmount;
        } );

        console.log( "Tất cả các ngày trong khoảng thời gian:" );
        console.log( datesInRange );

        console.log( "Tổng tiền từng ngày trong khoảng thời gian:" );
        console.log( logData );

        // Kiểm tra và log những ngày không có dữ liệu từ kết quả truy vấn
        datesInRange.forEach( date =>
        {
            const dateString = date.toISOString().split( 'T' )[ 0 ];
            if ( !logData.hasOwnProperty( dateString ) )
            {
                logData[ dateString ] = 0;
            }
        } );

        // Tạo mảng giống dailyTotals từ kết quả truy vấn và logData
        const dailyTotals = datesInRange.map( date =>
        {
            const dateString = date.toISOString().split( 'T' )[ 0 ];
            return {
                _id: dateString,
                totalAmount: logData[ dateString ]
            };
        } );

        console.log( "Tổng tiền từng ngày trong khoảng thời gian sau khi kiểm tra:" );
        console.log( logData );

        // Tính totalAmountInRange từ logData
        const totalAmountInRange = Object.values( logData ).reduce( ( total, amount ) => total + amount, 0 );

        console.log( "Tổng tổng tiền trong khoảng thời gian:", totalAmountInRange );

        res.json( { dailyTotals, logData, totalAmountInRange } );

    } catch ( error )
    {
        console.error( "Lỗi khi lấy tổng tiền từng ngày trong khoảng thời gian:", error );
        res.status( 500 ).json( { error: "Đã xảy ra lỗi khi lấy tổng tiền từng ngày trong khoảng thời gian" } );
    }
};
export const calculatetotalAmountmonth = async ( req, res ) =>
{
    try
    {
        const { startYear, endYear } = req.body;
        const startMonth = startYear.substring( 5 );
        const endMonth = endYear.substring( 5 );

        const startDate = new Date( `${ startYear }-01T00:00:00.000Z` );
        const endDate = new Date( `${ endYear }-31T23:59:59.999Z` );

        const result = await Order.aggregate( [
            {
                $match: {
                    status: { $nin: [ "Đã hủy", "Đã hoàn tiền" ] },
                    "createdAt": {
                        $gte: startDate,
                        $lt: endDate
                    }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    totalAmount: { $sum: "$paymentIntent.amount" }
                }
            },
        ] );

        const finalData = [];
        const currentDate = new Date( startDate );

        while ( currentDate <= endDate )
        {
            const formattedMonth = currentDate.toISOString().slice( 0, 7 );

            // Kiểm tra xem tháng này có trong kết quả không
            const foundMonth = result.find( item => item._id === formattedMonth );

            // Chỉ thêm vào finalData nếu nằm trong khoảng thời gian đã chọn
            if ( currentDate >= startDate && currentDate <= endDate )
            {
                if ( foundMonth )
                {
                    finalData.push( { month: formattedMonth, totalAmount: foundMonth.totalAmount } );
                } else
                {
                    finalData.push( { month: formattedMonth, totalAmount: 0 } );
                }
            }

            currentDate.setMonth( currentDate.getMonth() + 1 );
        }
        const totalAmountAllMonths = finalData.reduce( ( total, monthData ) => total + monthData.totalAmount, 0 );

        console.log( "Tổng tổng tiền trong khoảng thời gian:", totalAmountAllMonths );
        res.json( { result: finalData, totalAmountAllMonths } );
    } catch ( error )
    {
        console.error( "Lỗi khi lấy tổng tiền theo khoảng thời gian:", error );
        res.status( 500 ).json( { error: "Đã xảy ra lỗi khi lấy tổng tiền theo khoảng thời gian" } );
    }
}
export const calculatetotalAmountyear = async ( req, res ) =>
{
    try
    {
        const { year } = req.body;
        const monthlyTotal = [];

        for ( let month = 1; month <= 12; month++ )
        {
            let endMonth = month + 1;
            let endYear = year;

            // Xử lý tháng 12: nếu là tháng 12, kết thúc là tháng 1 của năm tiếp theo
            if ( month === 12 )
            {
                endMonth = 1;
                endYear++;
            }

            const result = await Order.aggregate( [
                {
                    $match: {
                        status: { $nin: [ "Đã hủy", "Đã hoàn tiền" ] },
                        "createdAt": {
                            $gte: new Date( `${ year }-${ month }-01T00:00:00.000Z` ),
                            $lt: new Date( `${ endYear }-${ endMonth }-01T00:00:00.000Z` )
                        }
                    }
                },
                {
                    $group: {
                        _id: null,
                        totalAmount: { $sum: "$paymentIntent.amount" }
                    }
                }
            ] );
            console.log( result );

            monthlyTotal.push( { month, totalAmount: ( result.length > 0 ? result[ 0 ].totalAmount : 0 ) } );
        }
        res.json( { year, monthlyTotal } );
    } catch ( error )
    {
        console.error( "Lỗi khi lấy tổng tiền từng tháng:", error );
        res.status( 500 ).json( { error: "Đã xảy ra lỗi khi lấy tổng tiền từng tháng" } );
    }
}
export const calculateTotalProductsSold = async ( req, res ) =>
{
    try
    {
        const { startDate, endDate } = req.body;

        const start = new Date( startDate );
        const end = new Date( endDate );

        const orders = await Order.find( {
            createdAt: {
                $gte: new Date( startDate ),
                $lte: new Date( endDate ),
            },
            status: { $nin: [ "Đã hủy", "Đã hoàn tiền" ] }
        } );

        const productsSoldPerDay = {};

        orders.forEach( ( order ) =>
        {
            const date = order.createdAt.toISOString().split( 'T' )[ 0 ]; // Lấy ngày từ createdAt

            if ( !productsSoldPerDay[ date ] )
            {
                productsSoldPerDay[ date ] = 0;
            }

            order.products.forEach( ( product ) =>
            {
                productsSoldPerDay[ date ] += product.quantity;
            } );
        } );

        // Chuyển đổi cấu trúc dữ liệu trước khi trả về
        const formattedData = Object.keys( productsSoldPerDay ).map( ( date ) => ( {
            aday: date,
            totalproductslod: productsSoldPerDay[ date ],
        } ) );

        console.log( 'Số lượng sản phẩm bán được theo từng ngày:', formattedData );
        res.json( { productsSoldPerDay: formattedData } );
    } catch ( error )
    {
        console.error( 'Đã xảy ra lỗi khi tính toán số lượng sản phẩm:', error );
        res.status( 500 ).json( { error: 'Đã xảy ra lỗi khi tính toán số lượng sản phẩm' } );
    }
};
export const calculateProductsSoldPerMonth = async ( req, res ) =>
{
    try
    {
        const { startYear, endYear } = req.body;

        const startMonth = startYear.substring( 5 );
        const endMonth = endYear.substring( 5 );

        const startDate = new Date( `${ startYear }-01T00:00:00.000Z` );
        const endDate = new Date( `${ endYear }-31T23:59:59.999Z` );

        const orders = await Order.find( {
            createdAt: {
                $gte: startDate,
                $lte: endDate
            },
            status: { $nin: [ "Đã hủy", "Đã hoàn tiền" ] }
        } );

        const monthlyProductsSold = {};

        orders.forEach( order =>
        {
            const orderMonth = order.createdAt.toISOString().substring( 0, 7 );
            order.products.forEach( product =>
            {
                if ( !monthlyProductsSold[ orderMonth ] )
                {
                    monthlyProductsSold[ orderMonth ] = 0;
                }
                monthlyProductsSold[ orderMonth ] += product.quantity;
            } );
        } );

        const formattedMonthlyProducts = Object.keys( monthlyProductsSold ).map( month => ( {
            month,
            totalProduct: monthlyProductsSold[ month ]
        } ) );

        console.log( "Số sản phẩm bán được từng tháng:" );
        console.log( formattedMonthlyProducts );

        res.json( { monthlyProductsSold: formattedMonthlyProducts } );
    } catch ( error )
    {
        console.error( "Lỗi khi tính tổng số sản phẩm bán:", error );
        res.status( 500 ).json( { error: "Đã xảy ra lỗi khi tính tổng số sản phẩm bán" } );
    }
};
export const calculateTotalProductsSoldToday = async ( req, res ) =>
{
    try
    {
        const today = new Date(); // Lấy ngày hiện tại

        // Đặt thời gian từ 00:00:00.000 đến 23:59:59.999 của ngày hiện tại
        const startOfToday = new Date( today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0, 0 );
        const endOfToday = new Date( today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59, 999 );

        const orders = await Order.find( {
            createdAt: {
                $gte: startOfToday, // Lớn hơn hoặc bằng thời gian bắt đầu của ngày hiện tại
                $lte: endOfToday, // Nhỏ hơn hoặc bằng thời gian kết thúc của ngày hiện tại
            },
            status: { $nin: [ "Đã hủy", "Đã hoàn tiền" ] },
        } );

        let totalProductsSoldToday = 0;

        orders.forEach( ( order ) =>
        {
            order.products.forEach( ( product ) =>
            {
                totalProductsSoldToday += product.quantity;
            } );
        } );

        res.json( {
            today: today.toISOString().split( 'T' )[ 0 ], // Ngày hiện tại
            totalProductsSoldToday
        } );
    } catch ( error )
    {
        console.error( 'Đã xảy ra lỗi khi tính toán số lượng sản phẩm:', error );
        res.status( 500 ).json( { error: 'Đã xảy ra lỗi khi tính toán số lượng sản phẩm' } );
    }
};
export const topBuys = async ( req, res ) =>
{
    try
    {
        const { startDate, endDate } = req.body; // Assuming these dates are sent in the request body

        if ( !startDate || !endDate )
        {
            return res.status( 400 ).json( { error: 'Start date and end date are required.' } );
        }

        const topBuyers = await Order.aggregate( [
            {
                $match: {
                    createdAt: { $gte: new Date( startDate ), $lte: new Date( endDate ) },
                    // Add any other conditions based on your data model
                },
            },
            {
                $group: {
                    _id: '$userId',
                    totalOrders: { $sum: 1 },
                    totalAmount: { $sum: '$paymentIntent.amount' },
                },
            },

            {
                $sort: { totalOrders: -1 },
            },
            {
                $limit: 5,
            },
        ] ).exec();

        const populatedBuyers = await Order.populate( topBuyers, { path: '_id', model: 'User' } );

        res.json( populatedBuyers );
    } catch ( error )
    {
        res.status( 500 ).json( { error: 'Internal server error' } );
    }
};
export const topSellingProducts = async ( req, res ) =>
{
    try
    {
        const { startDate, endDate } = req.body; // Assuming these dates are sent in the request body

        if ( !startDate || !endDate )
        {
            return res.status( 400 ).json( { error: 'Start date and end date are required.' } );
        }

        const topProducts = await Order.aggregate( [
            {
                $match: {
                    createdAt: { $gte: new Date( startDate ), $lte: new Date( endDate ) },
                    status: { $nin: [ "Đã hủy", "Đã hoàn tiền" ] } // Lọc bỏ trạng thái "Đã hủy"
                }
            },
            {
                $unwind: '$products',
            },
            {
                $group: {
                    _id: '$products.product', // Group by product ID
                    totalQuantitySold: { $sum: '$products.quantity' }, // Calculate total quantity sold for each product
                    productName: { $first: '$products.productInfo.name' }, // Get product name
                    productInfo: { $first: '$products.productInfo' }, // Get product info
                },
            },
            {
                $sort: { totalQuantitySold: -1 }, // Sort by total quantity sold
            },
            {
                $limit: 10, // Get the top 5 products
            },
        ] ).exec();

        res.json( topProducts );
    } catch ( error )
    {
        res.status( 500 ).json( { error: 'Internal server error' } );
    }
};



