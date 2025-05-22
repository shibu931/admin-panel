'use client'
import React from 'react'
import { Input } from '../ui/input'
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import SelectInput from '../common/SelectInput'
import ProdcutsTable from './ProdcutsTable'

const OrderForm = ({ disable, orderData, setOrderData }) => {

    const setStatusSelected = (value) => {
        setOrderData({ ...orderData, status: value });
    }
    const setDeliveryOptSelected = (value) => {
        setOrderData({ ...orderData, deliveryOption: value });
    }
    const statusoptions = [
        { value: 'pending', label: 'Pending' },
        { value: 'processing', label: 'Processing' },
        { value: 'shipped', label: 'Shipped' },
        { value: 'delivered', label: 'Delivered' },
        { value: 'cancelled', label: 'Cancelled' },
    ]

    return (
        <form>
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="grid w-full gap-1.5">
                    <Label className="font-normal text-gray-200" htmlFor="orderID">Order ID</Label>
                    <Input type="text" id="orderID" disabled defaultValue={orderData?._id || ''} />
                </div>
                <div className="grid w-full gap-1.5">
                    <Label className="font-normal text-gray-200" htmlFor="delivery-type">Delivery Type</Label>
                    <SelectInput disable={disable} label={'Delivery Type'} placeholder={'Delivery Type'} options={[{ value: 'inpost', label: 'InPost' }, { value: 'courier', label: 'DHL' }]} width={'w-full'} selected={orderData.deliveryOption} setSelected={setDeliveryOptSelected} />
                </div>
                <div className="grid col-span-1 w-full max-w-sm items-center gap-1.5">
                    <Label className="font-normal text-gray-200" htmlFor="orderStatus">Order Status</Label>
                    <SelectInput disable={disable} label={'status'} placeholder={'Order Status'} options={statusoptions} width={'w-full'} selected={orderData.status} setSelected={setStatusSelected} />
                </div>
                <div className="grid w-full gap-1.5">
                    <Label className="font-normal text-gray-200" htmlFor="name">Name</Label>
                    <Input disabled={disable} type="text" id="name" defaultValue={orderData?.addressDetails.name || ''}/>
                </div>
                <div className="grid w-full gap-1.5">
                    <Label className="font-normal text-gray-200" htmlFor="phoneNumber">Phone Number</Label>
                    <Input disabled={disable} type="text" id="phoneNumber" defaultValue={orderData?.addressDetails.phoneNumber || ''} />
                </div>
                <div className="grid w-full gap-1.5">
                    <Label className="font-normal text-gray-200" htmlFor="email">Email</Label>
                    <Input disabled={disable} type="text" id="email" defaultValue={orderData?.addressDetails.email || ''} />
                </div>
                <div className="grid w-full gap-1.5">
                    <Label className="font-normal text-gray-200" htmlFor="country">Country</Label>
                    <Input disabled={disable} type="text" id="country" defaultValue={orderData?.addressDetails.country || ''} />
                </div>
                {
                    orderData?.addressDetails?.parcelMachineNumber ?
                        <div className="grid w-full gap-1.5">
                            <Label className="font-normal text-gray-200" htmlFor="pmb">Parcel Machine Number</Label>
                            <Input disabled={disable} type="text" id="pmb" defaultValue={orderData?.addressDetails.parcelMachineNumber || ''} />
                        </div>
                        :
                        <div className="grid w-full gap-1.5">
                            <Label className="font-normal text-gray-200" htmlFor="email">Address</Label>
                            <Textarea  disabled={disable} id="address" defaultValue={orderData?.addressDetails.address || ''} />
                        </div>
                }
                <div className="grid col-span-3 w-full gap-1.5">
                <ProdcutsTable products={orderData.items} total={orderData.total} delivery={orderData.deliverCharge}/>
                </div>
            </div>
    
        </form>
    )
}

export default OrderForm