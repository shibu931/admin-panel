'use server'
import { revalidatePath } from 'next/cache.js';
import connectToDB from '../db/dbConnect.js';
import Reviews from '../db/models/review.model.js'

export async function createReview(slug,review){
    if(!slug) new Error('Product Slug is not provided');
    if(!review) new Error('Review is not provided');
    try {
        connectToDB();
        
        let existingReview = await Reviews.findOne({slug:slug})
        if (existingReview) {
            existingReview.review.push(review);
        } else {
            existingReview = new Reviews({
                slug: slug,
                review: [review],
            })
        }
        await existingReview.save();
        return {message:'ok'}
    } catch (error) {
        console.error("Failed to create review: ",error);
    }
}

export async function getAllReviews(){
    try {
        connectToDB()
        const reviews = await Reviews.find({});
        // console.log(reviews);
        return {reviews:JSON.parse(JSON.stringify(reviews))} 
    } catch (error) {
        console.error('Failed to fetch review:', error);
        return { error: error.message || 'Failed to fetch review' };  
    }
}

export async function getReviewBySlug(slug, page = 1, limit = 10) {
    if (!slug) {
      return { error: 'Product Slug is not provided' };
    }
  
    try {
      await connectToDB();
      const skip = (page - 1) * limit;
      const reviewsDoc = await Reviews.findOne({ slug: slug });
      if (!reviewsDoc || !reviewsDoc.review || reviewsDoc.review.length === 0) {
        return { message: 'No reviews found', reviews: [], averageRating: 0, ratingPercentages: {} };
      }
  
      let reviews = reviewsDoc.review
      .slice(0, page * limit)
      .map(({ name, email, rating, message, isVerified, createdAt }) => ({
        name,
        email,
        rating,
        message,
        isVerified,
        createdAt: createdAt.toISOString(), 
      }));
      const totalReviews = reviewsDoc.review.length;
  
      const totalRating = reviewsDoc.review.reduce((sum, review) => sum + review.rating, 0);
      const averageRating = totalReviews > 0 ? totalRating / totalReviews : 0;
  
      const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      reviewsDoc.review.forEach((review) => {
        ratingCounts[review.rating]++;
      });
  
      const ratingPercentages = [];
      for (const rating in ratingCounts) {
        ratingPercentages[rating-1] = totalReviews > 0 ? {starCount:rating,percentage:(ratingCounts[rating] / totalReviews) * 100} : {starCount:rating,percentage:0}
      }
  
      return {
        message: 'ok',
        reviews: reviews,
        averageRating: averageRating,
        ratingPercentages: ratingPercentages,
        totalPages: Math.ceil(totalReviews / limit),
        totalReviews:totalReviews,
        currentPage: page,
        error:null
      };
    } catch (error) {
      console.error('Failed to fetch review:', error);
      return { error: error.message || 'Failed to fetch review' };
    }
}

export async function updateReview(slug,reviewId){
  try {
    connectToDB()    
    const product = await Reviews.findOne({ slug })
    if (!product) return {success:false,message:'Review Product Not Found'}
    console.log(product);
    
    const review = product.review.id(reviewId)
    if (!review) return {success:false,message:'Review Not Found'}
    
    review.isVerified = !review.isVerified
    await product.save()
    revalidatePath('/reviews')
    return {success:true,message:'Successfully updated review'}
  } catch (error) {
    console.error("Something went wrong ",error.message)
    return {success:false,error:error.message}
  }
}

export const deleteReview = async (slug, reviewId) => {
  try {
    connectToDB()    
    const result = await Reviews.updateOne(
      { slug },
      { $pull: { review: { _id: reviewId } } }
    )

    if (result.modifiedCount === 0) {
      throw new Error('Review not found')
    }

    return { success: true }
  } catch (error) {
    console.error('Delete error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to delete review')
  }
}