

export interface IVoucher
{
    _id?: string,
    name: string,
    code: string,
    discount: string,
    limit: number,
    startDate: string,
    endDate: string,
    minimumOrderAmount: number,
    status: string,
    detailVoucher: string

}

export interface IVoucherState
{
    vouchers: IVoucher[]
}