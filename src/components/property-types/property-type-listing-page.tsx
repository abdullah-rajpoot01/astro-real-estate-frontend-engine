import PropertiesTypeListingPageConfig from "@/content/pages/categories.json";
import ListingCard1 from '../listings/listings-card';
import type { Listing } from '@/types/listing';


 function PropertyTypeListingPage({ listing }: { listing: Listing[] }) {

    return (
        <section className='pb-10'>
            <div className='mx-auto w-full max-w-7xl'>
                <div className='mb-12 text-center'>
                    <h2 className='text-3xl font-bold tracking-tight text-balance'>{PropertiesTypeListingPageConfig.title}</h2>
                     <p className='text-muted-foreground mt-4 text-lg'>{PropertiesTypeListingPageConfig.description}</p>
                </div>
                <ListingCard1 listings={listing} maxItems={PropertiesTypeListingPageConfig.listingPerPage} />
            </div>
        </section>
    )
}

export default PropertyTypeListingPage
