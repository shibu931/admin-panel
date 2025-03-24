import React from 'react'
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton" 

const OrderFormSkeleton = () => {
  return (
    <form>
      <div className="grid lg:grid-cols-3 gap-6 animate-pulse">
        <div className="grid w-full gap-1.5">
          <Label className="font-normal text-gray-200">Order ID</Label>
          <Skeleton className="h-10 w-full bg-neutral-700/50 rounded-md" />
        </div>

        <div className="grid w-full gap-1.5">
          <Label className="font-normal text-gray-200">Delivery Type</Label>
          <Skeleton className="h-10 w-full bg-neutral-700/50 rounded-md" />
        </div>

        <div className="grid w-full gap-1.5">
          <Label className="font-normal text-gray-200">Order Status</Label>
          <Skeleton className="h-10 w-full bg-neutral-700/50 rounded-md" />
        </div>

        <div className="grid w-full gap-1.5">
          <Label className="font-normal text-gray-200">Name</Label>
          <Skeleton className="h-10 w-full bg-neutral-700/50 rounded-md" />
        </div>

        <div className="grid w-full gap-1.5">
          <Label className="font-normal text-gray-200">Phone Number</Label>
          <Skeleton className="h-10 w-full bg-neutral-700/50 rounded-md" />
        </div>

        <div className="grid w-full gap-1.5">
          <Label className="font-normal text-gray-200">Email</Label>
          <Skeleton className="h-10 w-full bg-neutral-700/50 rounded-md" />
        </div>

        <div className="grid w-full gap-1.5">
          <Label className="font-normal text-gray-200">Country</Label>
          <Skeleton className="h-10 w-full bg-neutral-700/50 rounded-md" />
        </div>

        <div className="grid w-full gap-1.5">
          <Label className="font-normal text-gray-200">Address</Label>
          <Skeleton className="h-20 w-full bg-neutral-700/50 rounded-md" />
        </div>

        <div className="grid col-span-3 w-full gap-1.5">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-8 w-1/4 bg-neutral-700/50 rounded-md" />
              <Skeleton className="h-8 w-1/4 bg-neutral-700/50 rounded-md" />
              <Skeleton className="h-8 w-1/4 bg-neutral-700/50 rounded-md" />
            </div>
            <Skeleton className="h-12 w-full bg-neutral-700/50 rounded-md" />
            <Skeleton className="h-12 w-full bg-neutral-700/50 rounded-md" />

            <Skeleton className="h-10 w-1/3 ml-auto bg-neutral-700/50 rounded-md" />
          </div>
        </div>
      </div>
    </form>
  )
}

export default OrderFormSkeleton