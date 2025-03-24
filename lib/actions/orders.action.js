'use server';
import { revalidatePath } from 'next/cache';
import connectToDB from '../db/dbConnect.js';
import Order from '../db/models/orders.model.js';

export async function getAllOrders(){
    try {
        connectToDB()
        const orders = await Order.find({},"_id addressDetails isNew createdAt").lean();
        return { success: true, orders:JSON.parse(JSON.stringify(orders))};        
    } catch (error) {
        console.error('Error getting order:', error);
        return { error: error.message || 'Failed to get order.' };
    }
}

export async function getOrderById(orderId){
  if (!orderId) throw new Error('Missing order id.');
  try {
    connectToDB()
    const orderDetails = await Order.findById(orderId);
    if(!orderDetails) return {success:false, order:null}
    orderDetails.isNew = false;
    orderDetails.save();
    const simplifiedOrderDetails = {
      _id: orderDetails._id.toString(),
      deliveryOption: orderDetails.deliveryOption,
      addressDetails: orderDetails.addressDetails,
      items: orderDetails.items.map(item => ({
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        slug:item.slug,
        productImage: item.productImage || null, 
      })),
      deliverCharge: orderDetails.deliverCharge,
      total: orderDetails.total,
      status: orderDetails.status,
      createdAt: orderDetails.createdAt
    };
    return {success:true, order:simplifiedOrderDetails}
  } catch (error) {
    console.error('Error getting order:', error);
    return { error: error.message || 'Failed to get order.' };
  }
}

export async function updateOrder(orderId, updatedData) {
  try {
    if (!orderId || typeof orderId !== 'string')throw new Error('Invalid order ID.');
    if (!updatedData || typeof updatedData !== 'object' || Object.keys(updatedData).length === 0) throw new Error('Invalid or empty update data.');

    await connectToDB()
    const result = await Order.updateOne(
      { _id: orderId },
      { $set: updatedData }
    );
    if (result.matchedCount === 0) throw new Error('Order not found.');
    if (result.modifiedCount === 0) return {success: true, message: "Order found, but no changes were made."}; 
    return { success: true, message: 'Order updated successfully.' };
  } catch (error) {
    console.error('Error updating order:', error);
    return { success: false, error: error.message };
  }
}
