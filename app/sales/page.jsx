import SalesLayout from '@/components/SalesPage/SalesLayout'
import { getAllOrders } from '@/lib/actions/orders.action'
import React from 'react'

const page = async () => {
  const {orders} = await getAllOrders()  
  return (
    <SalesLayout orders={orders}/>
  )
}

export default page