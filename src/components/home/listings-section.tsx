import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils';
import ListingCard1 from '../listings/listings-card';
import { getAllListings } from '@/utils/listings';
import { getHomePageConfig } from '@/utils/home-page';
import IconComponent from '../icons/icon';


export function ListingSection() {
    const { listingsSection } = getHomePageConfig();
    if (!listingsSection.enabled) return null;

    // Fetch all listings from the local inventory
    const allListings = getAllListings()

    if (allListings.length === 0) return null;
    
    /* 
      ⚡ ALGORITHM: Filter and fill featured listings logic
    */
    // A. Extract all listings marked as featured
    const featuredListings = allListings.filter((l) => l.featured === true)

    // B. Gather regular listings to use as fallbacks
    const fallbackListings = allListings.filter((l) => l.featured !== true)

    // C. Merge lists ensuring featured items take absolute priority, limited safely to 6 slots
    const recommendedListings = [
        ...featuredListings,
        ...fallbackListings
    ].slice(0, 6)

    return (
        <section className='py-12 '>
            <div className='mx-auto w-full max-w-7xl'>
                <div className='mb-12 max-w-3xl mx-auto  text-center'>
                    <h2 className='text-3xl font-bold tracking-tight text-balance'>{listingsSection.title}</h2>
                    <p className='text-muted-foreground mt-4 text-lg'>{listingsSection.description}</p>
                </div>
                <ListingCard1 listings={recommendedListings} maxItems={listingsSection.maxItems} />
            </div>
            {/* Call to Action */}
            <div className='mt-12 text-center'>
                <a href='/properties'>
                    <div className={cn(buttonVariants({ size: "lg" }), "h-10 px-4 cursor-pointer gap-2")}>
                        <IconComponent name={listingsSection.buttonIcon} className='size-5' />
                        {listingsSection.buttonText}
                    </div>
                </a>
            </div>
        </section>
    )
}

export default ListingSection
