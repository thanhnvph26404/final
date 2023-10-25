import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVoucher, IVoucherState } from "./voucher.interface";

const initialState: IVoucherState = {
    vouchers: []
}

const voucherSlice = createSlice({
    name: 'vouchers',
    initialState: initialState,
    reducers: {
        addNewVoucher: (state, action: PayloadAction<IVoucher>) => {
            state.vouchers.push(action.payload)
        },
        loadVoucherList: (state, action: PayloadAction<IVoucher[]>) => {
            state.vouchers = action.payload
        },
        editVoucher: (state, action: PayloadAction<IVoucher>) => {
            const newVoucher = action.payload
            state.vouchers = state.vouchers.map((voucher) => voucher._id === newVoucher._id ? newVoucher : voucher)
        },
        deleteVoucher: (state, action: PayloadAction<string>) => {
            state.vouchers = state.vouchers.filter((voucher) => voucher._id !== action.payload)
        }

    }
})

export const { addNewVoucher,loadVoucherList,editVoucher,deleteVoucher } = voucherSlice.actions
export default voucherSlice.reducer