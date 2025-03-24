"use client"
import React, { Suspense, useEffect, useState } from 'react'
import OrdersList from './OrdersList'
import SelectInput from '../common/SelectInput'
import OrderEditorLayout from './OrderEditorLayout'
import { useRouter } from 'next/navigation'

const SalesLayout = ({orders}) => {
  const router = useRouter()
  const [ordersList,setOrdersList] = useState(orders)
  const [selected, setSelected] = useState('all')
  const options = [{ value: 'all', label: 'All' }, { value: 'new', label: 'New' }]
  const handleEditClick = (id) => {
    router.push(`/sales?orderId=${id}`)
  }

  useEffect(()=>{
    let fileterdOrders = orders
    if(selected != 'all' ) fileterdOrders= orders.filter((order) => order.isNew === true) 
    setOrdersList(fileterdOrders)
  },[selected])

  return (
    <div className='grid grid-cols-1 lg:grid-cols-10 p-4 gap-4'>
      <div className="lg:col-span-3">
        <div className="border rounded py-4 ps-2 pe-1">
          <div className="pe-1 pb-3 border-b border-neutral-700 flex items-center justify-between h-12">
            <h5 className='text-neutral-300 uppercase font-medium'>All Orders</h5>
            <SelectInput options={options} selected={selected} setSelected={setSelected} placeholder='Article Type' label='Types' width='w-[100px]' />
          </div>
          <OrdersList ordersList={ordersList} handleEditClick={handleEditClick}/>
        </div>
      </div>
      <div className="lg:col-span-7 border rounded py-4 px-2">
        <Suspense fallback={<p>Loading...</p>}>
        <OrderEditorLayout/>
        </Suspense>
      </div>
    </div>
  )
}

export default SalesLayout