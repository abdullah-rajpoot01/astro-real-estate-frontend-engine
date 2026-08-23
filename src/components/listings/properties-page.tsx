import propertiesPageConfig from "@/content/pages/properties.json";
import ListingCard1 from '../listings/listings-card';
import type { Listing } from '@/types/listing';
import EmptyListingsState from "./empty";


function PropertyListingPage({ listings }: { listings: Listing[] }) {


    return (
        <section className='pb-10'>
            <div className='mx-auto w-full max-w-7xl'>
                <div className='mb-12 text-center max-w-3xl mx-auto '>
                    <h2 className='text-3xl font-bold tracking-tight text-balance'>{propertiesPageConfig.title}</h2>
                    <p className='text-muted-foreground mt-4 text-lg'>{propertiesPageConfig.description}</p>
                </div>
                {listings.length === 0 ? <EmptyListingsState /> : <ListingCard1 listings={listings} maxItems={propertiesPageConfig.listingPerPage} />}
            </div>
        </section>
    )
}

export default PropertyListingPage 
