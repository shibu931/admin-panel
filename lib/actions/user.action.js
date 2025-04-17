"use server"

import connectToDB from "../db/dbConnect"
import User from "../db/models/user.model"

export async function populateUser(){
    const user ={
        name:'Shippu',
        username:'shippu908',
        email:'itzshippu@gmail.com',
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

export async function getUser(credentials) {
    try {
        await connectToDB()
        const user = await User.findOne({ email: credentials.email });
        console.log(credentials.password);
        console.log(user.email);
        
        if(!user) return null;
        const isValid = await user.comparePassword(credentials.password);
        console.log(isValid);
        
        if (!isValid) return null;
        return user
    } catch (error) {
        console.log(error.message);
        return null;
    }
}