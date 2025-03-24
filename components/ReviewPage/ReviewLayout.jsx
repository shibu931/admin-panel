'use client'
import React, { useState, useEffect } from 'react'
import SelectInput from '../common/SelectInput'
import ReviewCard from './ReviewCard'
import { deleteReview, updateReview } from '@/lib/actions/review.action'
import { toast } from 'sonner'

const ReviewLayout = ({ reviews }) => {
  const [selectedSlug, setSelectedSlug] = useState(reviews[0]?.slug || '')
  const [selectedReviews, setSelectedReviews] = useState([])

  useEffect(() => {
    if (selectedSlug) {
      const product = reviews.find(p => p.slug === selectedSlug)
      setSelectedReviews(product?.review || [])
    }
  }, [selectedSlug, reviews])

  const handleVerify = async (reviewId) => {
    try {
      const result = await updateReview(selectedSlug,reviewId)
      if(result.success) toast.success('Success',{
        description:result.message
      })
      else toast.error('Error',{
        description:result.message
      })
    } catch (error) {
      console.error('Verification failed:', error)
      toast.error('Error',{
        description:error.message
      })
    }
  }

  const handleDelete = async (reviewId) => {
    try {
        const result = await deleteReview(selectedSlug,reviewId)
        if(result.success) {
            toast.success('Success',{
            description:'Successfully deleted review'
            })
            setSelectedReviews(prev => prev.filter(review => review._id !== reviewId))
        }
    } catch (error) {
      toast.error('Error',{
        description:error.message
      })
    }
  }

  return (
    <div className='m-4'>
      <SelectInput 
        label={'Select Product'} 
        placeholder={'Product Reviews'} 
        options={reviews.map(({ slug }) => ({ 
          value: slug, 
          label: slug.replaceAll('-', ' ').toUpperCase() 
        }))} 
        width={'w-[320px]'} 
        selected={selectedSlug} 
        setSelected={setSelectedSlug} 
      />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-4 border-t border-muted/80 mt-5">
        {selectedReviews.length > 0 ? (
          selectedReviews.map((review) => (
            <ReviewCard
              key={review._id}
              review={review}
              handleVerify={handleVerify}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            No reviews found for this product
          </div>
        )}
      </div>
    </div>
  )
}

export default ReviewLayout