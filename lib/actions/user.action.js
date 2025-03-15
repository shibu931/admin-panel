"use server"

import { connectToDB } from "../db/dbConnect"
import User from "../db/models/user.model"

export async function populateUser(){
    const user ={
        name:'Shippu',
        username:'shippu908',
        password:'Shibu@123',
        role:'admin'
    }
    try {
        await connectToDB()
        const result = await User.insertOne(user)
    } catch (error) {
        console.log("Failed to create user: ",error);
    }
}