'use client'
import { getOrderById, updateOrder } from '@/lib/actions/orders.action';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import OrderFormSkeleton from '../LoadingSkeletons/OrderFormSkeleton';
import { Button } from '../ui/button';
import OrderForm from './OrderForm';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const initialOrderData = {
    deliveryOption: 'courier',
    addressDetails: '',
    orderSite: '',
    items: [],
    total: 0,
    deliverCharge: 0,
    isOpen: false,
    status: 'pending',
    createdAt: new Date().toDateString()
}

const OrderEditorLayout = () => {
    const params = useSearchParams();
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [orderData, setOrderData] = useState(initialOrderData)
    const orderId = params.get('orderId')
    const [disable,setDisable] = useState(true)

    async function handleSaveOrder() {
        try {
            setLoading(true)
            const result = await updateOrder(orderId,orderData)
            if (result.success) {
                toast.success('Success', {
                    description: 'Order created successfully'
                })
                setOrderData(initialOrderData)
                router.push('/sales')
            } else if (result.error) {
                toast.error('Error', {
                    description: result.error
                })
            }
        } catch (error) {
            console.error('Save order failed:', error)
            toast.error('Error', {
                description: 'Failed to save order'
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        async function fetchOrder() {
            try {
                setLoading(true)
                const result = await getOrderById(orderId)
                if(result.success) setOrderData(result.order)
                else toast.error('Error',{  description:result.error })
            } catch (error) {
                console.error("Something went wrong: ",error.message);
                toast.error('Error', {
                    description: error
                })
            } finally {
                setLoading(false)
            }
        }
        if(orderId) fetchOrder()
    }, [orderId])
    return (
        <div className='relative h-full min-h-[600px] pb-12'>
            <div className="pe-1 pb-3 border-b border-neutral-700 flex items-center justify-between h-12">
                <h5 className='text-neutral-300 uppercase font-medium'>Order Details</h5>
                {orderId && <Button variant='outline' onClick={()=>setDisable(!disable)} >{disable ? 'Update' :'Cancel'}</Button>}
            </div>
            <div className='p-4 max-h-[500px] overflow-y-auto relative'>
                {loading ? <OrderFormSkeleton /> : <OrderForm disable={disable} orderData={orderData} setOrderData={setOrderData} />}
            </div>
            <div className="absolute bottom-0 w-full pe-1 pt-3 border-t border-neutral-700 flex justify-end space-x-2 h-12">
                <Button disabled={disable} onClick={() => { handleSaveOrder() }} className={'disabled:cursor-pointer rounded btn-sm bg-blue-700 hover:bg-blue-800 text-white'}>
                    {loading ? 'Loading' : 'Save'}
                </Button>
            </div>
        </div>
    )
}

export default OrderEditorLayout