import { useEffect, useState } from 'react';
import { useTopbuyerMutation } from '../../../store/Order/Ordersevice';
import { Table, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';


const columns = [
    {
        title: 'Tên người dùng',
        dataIndex: '_id',
        key: '_id',
        render: ( text: any ) => (
            <span >
                { text?.name }
            </span>
        ),
    },
    {
        title: 'Email',
        dataIndex: '_id',
        key: '_id',
        render: ( text: any ) => (
            <span >
                { text?.email }
            </span>
        ),
    },
    {
        title: 'Tổng đơn hàng',
        dataIndex: 'totalOrders',
        key: 'totalOrders',
    },
    {
        title: 'Tổng tiền',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        render: ( text: any ) => (
            <span >
                { new Intl.NumberFormat( 'vi-VN', { style: 'currency', currency: 'VND' } ).format( text ) }
            </span>
        ),
    },
];
const { RangePicker } = DatePicker;

const Topbuyer = () =>
{
    const [ startDate, setStartDate ] = useState<any>( dayjs().startOf( "month" ) ); // Initialize with current date
    const [ endDate, setEndDate ] = useState<any>( dayjs().endOf( 'month' ) );

    const [ topbyer ] = useTopbuyerMutation();
    const [ Topbuyer, setTopbuyer ] = useState<any>()
    console.log( Topbuyer );

    const handleFilter = () =>
    {



        // Thêm điều kiện lọc theo thời gian nếu có giá trị trong RangePicker

        const totals = {
            startDate: dayjs( startDate ).startOf( 'day' ).toISOString(),
            endDate: dayjs( endDate ).endOf( 'day' ).toISOString(),
        };
        console.log( totals );
        // Nếu không có bất kỳ điều kiện nào được áp dụng, hiển thị tất cả đơn hàng

        try
        {
            topbyer( totals ).unwrap().then( ( res ) =>
            {
                console.log( res );
                setTopbuyer( res )

            } )
        } catch ( error )
        {
            console.log( error );

        }

    }
    useEffect( () =>
    {
        handleFilter()
    }, [ startDate, endDate ] )
    const dataSource = Topbuyer?.map( ( buyer: any, index: any ) => ( { ...buyer, key: index } ) );
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h2 className="text-2xl font-bold mb-4">Danh sách top 5 người mua hàng nhiều nhất</h2>
            <div className="flex space-x-6">
                <RangePicker
                    value={ [ startDate, endDate ] }

                    onChange={ ( dates: any ) =>
                    {
                        if ( dates && dates.length === 2 )
                        {
                            setStartDate( dates[ 0 ] );
                            setEndDate( dates[ 1 ] );
                        } else
                        {
                            setStartDate( null );
                            setEndDate( null );
                        }
                    } }
                    className="w-64"
                />

            </div>
            <div className="overflow-x-auto">
                <Table dataSource={ dataSource } columns={ columns } />
            </div>
        </div>
    );
};

export default Topbuyer;
