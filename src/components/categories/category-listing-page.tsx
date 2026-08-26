import ListingCard1 from '../listings/listings-card';
import EmptyListingsState from "../listings/empty";
import type { Listing } from "@/utils/listings";
import { getCategoriesPageConfig } from '@/utils/categories-page';


function categoryListingPage({ listings, propertyType }: { listings: Listing[], propertyType: string }) {
    const categoriesListingPageConfig = getCategoriesPageConfig();
    return (
        <section className='pb-10'>
            <div className='mx-auto w-full max-w-7xl'>
                <div className='mb-12 text-center max-w-3xl mx-auto '>
                    <h2 className='text-3xl font-bold tracking-tight text-balance'>Explore {propertyType} Properties</h2>
                    <p className='text-muted-foreground mt-4 text-lg'>Discover the latest {propertyType} properties and find the right property for your needs.</p>
                </div>
                {listings.length === 0 ? <EmptyListingsState /> : <ListingCard1 listings={listings} maxItems={categoriesListingPageConfig.listingPerPage} />}

            </div>
        </section>
    )
}

export default categoryListingPage
