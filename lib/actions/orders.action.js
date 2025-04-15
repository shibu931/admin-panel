'use server';
import { revalidatePath } from 'next/cache';
import connectToDB from '../db/dbConnect.js';
import Order from '../db/models/orders.model.js';

export async function getAllOrders(){
    try {
        connectToDB()
        const orders = await Order.find({},"_id addressDetails isNew createdAt").lean();
        return { success: true, orders:JSON.parse(JSON.stringify(orders.reverse()))};        
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

export async function countNewOrders(){
  try {
    connectToDB()
    const newOrderCount = await Order.countDocuments({isNew:true})
    return { success: true, ordersCount:newOrderCount};
  } catch (error) {
    console.error('Error counting order:', error);
    return { error: error.message || 'Failed to count order.' };    
  }
}


export const getSalesChartData = async () => {
  try {
    connectToDB();
    const salesData = await Order.aggregate([
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt"
            }
          },
          sales: { $sum: 1 }, 
          value: { $sum: { $add: ["$total", "$deliverCharge"] } }, 
        }
      },
      { $sort: { _id: 1 } }, 
      {
        $project: {
          date: "$_id",
          sales: 1,
          value: 1,
          _id: 0
        }
      }
    ]);

    const filledData = await fillMissingDates(salesData);
    return { 
      success: true, 
      data: filledData 
    };
  } catch (error) {
    console.error("Error fetching sales data:", error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};

const fillMissingDates = async (data) => {
  if (data.length === 0) return [];
  
  const startDate = new Date(data[0].date);
  const endDate = new Date(data[data.length - 1].date);
  const dateArray = [];
  
  let currentDate = startDate;
  while (currentDate <= endDate) {
    dateArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateArray.map(date => {
    const dateString = date.toISOString().split('T')[0];
    const existing = data.find(d => d.date === dateString);
    return existing || { 
      date: dateString, 
      sales: 0, 
      value: 0 
    };
  });
};