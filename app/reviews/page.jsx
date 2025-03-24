import ReviewLayout from '@/components/ReviewPage/ReviewLayout';
import { getAllReviews } from '@/lib/actions/review.action'
import React from 'react'

const page = async () => {
  const {reviews} = await getAllReviews()    
  return (
    <ReviewLayout reviews={reviews}/>
  )
}

export default page