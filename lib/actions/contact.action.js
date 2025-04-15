'use server'
import { revalidatePath } from 'next/cache';
import connectToDB from '../db/dbConnect';
import Contact from '../db/models/contact.model';

export async function getAllQueries(){
    try {
       connectToDB() 
       const queries = await Contact.find();
       if(!queries) return { success: false, error: error.message }
       return { success: true, queries:JSON.parse(JSON.stringify(queries))}
    } catch (error) {
        console.error(`Error fetching queries:`, error.message);
        return { success: false, error: error.message };
    }
}

export async function deleteQuery(id) {
    try {
        connectToDB();
        const deletedQuery = await Contact.findByIdAndDelete(id);
        revalidatePath('/queries')
        if (!deletedQuery) return { success: false, error: "Query not found" };
        return { success: true };
    } catch (error) {
        console.error(`Error deleting query:`, error.message);
        return { success: false, error: error.message };
    }
}

export async function updateQuery(query) {
    try {
        await connectToDB(); // ✅ Await DB connection

        const existingQuery = await Contact.findById(query._id);

        if (!existingQuery) {
            return { success: false, error: "Query not found" };
        }

        existingQuery.isAnswered = !existingQuery.isAnswered;
        await existingQuery.save();
        console.log(existingQuery.isAnswered);
        

        revalidatePath('/queries'); 

        return {
            success: true,
            query: JSON.parse(JSON.stringify(existingQuery))
        };

    } catch (error) {
        console.error("Error updating query:", error.message);
        return { success: false, error: error.message };
    }
}