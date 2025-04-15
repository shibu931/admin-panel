'use client'
import React, { useState, useEffect } from 'react'
import SelectInput from '../common/SelectInput'
import ReviewCard from './ReviewCard'
import { deleteReview, updateReview } from '@/lib/actions/review.action'
import { toast } from 'sonner'
import { Separator } from '../ui/separator'

const ReviewLayout = ({ reviews }) => {
  const [selectedSlug, setSelectedSlug] = useState(reviews[0]?.slug || '')
  const [selectedReviews, setSelectedReviews] = useState([])
  const [selectedFilter,setSelectedFilter] = useState('all')
  const [sortBy,setSortBy] = useState('new')
  const filterOpt = [{ value: 'all', label: 'All' }, { value: 'unverified', label: 'Unverified' }, { value: 'verified', label: 'Verified' }]
  const sortByOpt = [{ value: 'new', label: 'New' }, { value: 'old', label: 'Oldest' }]

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    if (filter === 'all') {
      setSelectedReviews(reviews.find(p => p.slug === selectedSlug)?.review || []);
    } else if (filter === 'unverified') {
      setSelectedReviews(reviews.find(p => p.slug === selectedSlug)?.review.filter(review => !review.isVerified) || []);
    } else if (filter === 'verified') {
      setSelectedReviews(reviews.find(p => p.slug === selectedSlug)?.review.filter(review => review.isVerified) || []);
    }
  }

  useEffect(() => {
    handleFilterChange(selectedFilter)
    console.log('Selected Filter:', selectedFilter)
    console.log('Reviews :', selectedReviews)
  }, [selectedFilter])

  useEffect(() => {
    if (sortBy === 'new') {
      setSelectedReviews(prev => [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)))
    } else if (sortBy === 'old') {
      setSelectedReviews(prev => [...prev].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)))
    }
  }, [sortBy])

  useEffect(() => {
    if (selectedSlug) {
      const product = reviews.find(p => p.slug === selectedSlug)
      setSelectedReviews(product?.review || [])
    }
  }, [selectedSlug, reviews])

  const handleVerify = async (reviewId) => {
    try {
      const result = await updateReview(selectedSlug, reviewId)
      if (result.success) toast.success('Success', {
        description: result.message
      })
      else toast.error('Error', {
        description: result.message
      })
    } catch (error) {
      console.error('Verification failed:', error)
      toast.error('Error', {
        description: error.message
      })
    }
  }

  const handleDelete = async (reviewId) => {
    try {
      const result = await deleteReview(selectedSlug, reviewId)
      if (result.success) {
        toast.success('Success', {
          description: 'Successfully deleted review'
        })
        setSelectedReviews(prev => prev.filter(review => review._id !== reviewId))
      }
    } catch (error) {
      toast.error('Error', {
        description: error.message
      })
    }
  }

  return (
    <div className='m-4'>
      <div className='flex items-center space-x-2'>
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
        <Separator orientation="vertical" />
        <SelectInput options={filterOpt} selected={selectedFilter} setSelected={setSelectedFilter} placeholder='Filter' label='Status' width='w-[100px]' />
        <Separator orientation="vertical" />
        <SelectInput options={sortByOpt} selected={sortBy} setSelected={setSortBy} placeholder='Sort By' label='Sort By' width='w-[100px]' />

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 p-4 gap-4 border-t border-muted/80 mt-5">
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