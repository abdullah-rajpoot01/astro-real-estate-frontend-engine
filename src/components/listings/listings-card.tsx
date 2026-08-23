import { buttonVariants } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { Listing } from '@/utils/listings'

interface ListingCardType {
    maxItems?: number,
    listings: Listing[]
}
function ListingCard1({ maxItems, listings = [], }: ListingCardType) {

    if (maxItems === 0) {
        return null;
    }

    const displayedListings = maxItems ? listings.slice(0, maxItems) : listings;

    return (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-6 xl:grid-cols-6'>
            {displayedListings.map(listing => (
                <Card
                    key={listing.id}
                    className='flex flex-col gap-4 overflow-hidden rounded-lg py-4 shadow-none transition-shadow duration-300 hover:shadow-md relative'
                >
                    <CardContent className='flex flex-1 flex-col gap-4 px-4 '>

                        {/* Image container - Heart button removed */}
                        <div className='aspect-square overflow-hidden rounded-md relative'>
                            <div className='absolute top-4 left-2 z-10 flex flex-col gap-2'>

                                {listing.comparePrice && listing.comparePrice > listing.price && (
                                    <Badge variant="destructive" className="rounded-full">
                                        {Math.round(
                                            ((listing.comparePrice - listing.price) / listing.comparePrice) * 100
                                        )}
                                        % OFF
                                    </Badge>
                                )}
                                <Badge variant='secondary' className='rounded-full capitalize'>For {listing.type}</Badge>
                            </div>
                            <img
                                src={listing.images[0]}
                                alt={listing.title}
                                className='size-full rounded-md object-cover dark:brightness-[0.95] dark:invert'
                                loading='lazy'
                                width={400}
                                height={400}
                            />
                        </div>

                        <div className='flex flex-1 flex-col'>
                            <h2 className='mb-1 font-medium text-balance line-clamp-1'>{listing.title}</h2>
                            <div className='mt-auto flex items-baseline gap-2'>
                                <p className='font-semibold'>${listing.price.toFixed(2)}</p>
                                {listing.comparePrice && (
                                    <p className='text-muted-foreground text-sm line-through md:text-base xl:text-sm 2xl:text-base'>
                                        ${listing.comparePrice.toFixed(2)}
                                    </p>
                                )}
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className='px-3 md:px-4 pt-0 bg-transparent border-t-0'>
                        <a href={`/properties/${listing.id}`} className='w-full'>
                            <div className={cn(buttonVariants({ size: "sm", variant: "outline" }), "h-8 px-3 w-full cursor-pointer text-sm")} >
                                Visit Now
                            </div>
                        </a>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default ListingCard1
