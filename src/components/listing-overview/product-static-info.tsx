// src/components/products/ProductInfoStatic.tsx

import type { Listing } from "@/utils/listings"
import ListingContactButtons from "./contact-buttons"
import type { PropertyType } from "@/utils/property-type"
import { Badge } from "../ui/badge"

interface Props {
  listing: Listing
  propertyType?: PropertyType
}

export default function ProductInfoStatic({ listing, propertyType }: Props) {

  return (
    <div className='flex flex-col gap-2 lg:gap-4'>
      <div className='flex items-center gap-2 flex-wrap'>
        
        {propertyType?.name && (
          <span className='bg-primary/10 text-primary text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full'>
             {propertyType.name}
          </span>
        )}
        {listing.featured && (
          <span className='bg-primary/10 text-primary text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full'>
             Staff Pick
          </span>
        )}

        <span className='bg-primary/10 text-primary text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full'>
           For {listing.type}
        </span>


      </div>

      <h1 className='text-xl font-bold tracking-tight lg:text-3xl text-foreground'>{listing.title}</h1>
      {listing.description && (
        <p className='text-muted-foreground text-sm leading-relaxed text-balance'>{listing.description}</p>
      )}
      <div className='flex items-baseline gap-3 pb-4'>
        <p className='text-2xl font-bold tracking-tight'>${listing.price}</p>
        {listing.comparePrice && listing.comparePrice > listing.price && (
          <p className='text-lg text-muted-foreground line-through'>${listing.comparePrice}</p>
        )}
        {listing.saleLable ? (
          <span className='bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded'>
            {listing.saleLable}
          </span>
        ) : listing.comparePrice && listing.comparePrice > listing.price ? (
          <span className='bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded'>
            Save ${listing.comparePrice - listing.price}
          </span>
        ) : null}
      </div>
    </div>
  )
}
