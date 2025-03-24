'use client'
import Link from 'next/link'
import React from 'react'
import { FaRegEdit } from "react-icons/fa";

const OrdersList = ({ ordersList, handleEditClick }) => {
    return (
        <ul className='max-h-[550px] overflow-y-auto pe-1'>
            {ordersList.map((order, index) => (
                <OrdersListCard key={order._id} order={order} index={index} handleEditClick={handleEditClick} />
            ))}
        </ul>
    )
}

export default OrdersList

const OrdersListCard = ({ order, index, handleEditClick }) => {
    const date = new Date(order.createdAt).toDateString()    
    return (
        <li className='hover:shadow-md shadow-neutral-800/25 transition-all duration-200 py-4 last:mb-1 border-b last:border-b-0 border-neutral-900 flex space-x-3 px-1'>
            <div className="p-1 w-12 h-12 bg-muted/50 rounded flex items-center justify-center text-neutral-500 text-lg font-semibold">
                {++index}
            </div>
            <div>
                <h3 className='text-sm text-neutral-300 tracking-wide line-clamp-1 mb-1' title={order.addressDetails.email}>{order.addressDetails.email}
                    {order.isNew && <span className='text-xs bg-red-700/10 font-semibold text-red-700 border border-red-700/50 p-1 rounded ms-2'>New</span>}</h3>
                <span className='text-xs text-neutral-600 block '><span className='text-neutral-500'>Date</span>: {date}</span>
                <span className='text-xs text-neutral-600 block '><span className="text-neutral-500">Id:</span> <Link className='hover:underline hover:text-neutral-400 transition-all duration-200' href={order._id}>{order._id}</Link></span>
            </div>
            <div className='h-full flex flex-col ms-auto space-y-1'>
                <button onClick={() => handleEditClick(order._id)} type='button' className='bg-blue-700/20 text-blue-700/80 hover:text-blue-600 hover:scale-[105%] transition-all duration-200 hover:shadow shadow-blue-300/5 hover:cursor-pointer p-1 rounded text-sm'><FaRegEdit /></button>
            </div>
        </li>
    )
}