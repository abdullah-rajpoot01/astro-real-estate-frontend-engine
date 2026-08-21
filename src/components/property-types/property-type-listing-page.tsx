import { buttonVariants } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import homePageData from "@/content/pages/home.json";
import { cn } from '@/lib/utils';
import ListingCard1 from '../listings/listings-card';
import type { Listing } from '@/types/listing';


 function PropertyTypeListingPage({ listing }: { listing: Listing[] }) {
    const { productsSection, setting } = homePageData
    if (!productsSection || !setting?.productsEnabled) return null;


    return (
        <section className='pb-10'>
            <div className='mx-auto w-full max-w-7xl'>
                <div className='mb-12 text-center'>
                    <h2 className='text-3xl font-bold tracking-tight text-balance'>{productsSection.heading}</h2>
                    {productsSection?.subHeading && <p className='text-muted-foreground mt-4 text-lg'>{productsSection.subHeading}</p>}
                </div>
                <ListingCard1 listings={listing} />
            </div>
        </section>
    )
}

export default PropertyTypeListingPage
