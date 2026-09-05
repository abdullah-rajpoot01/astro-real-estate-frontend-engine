import { Button } from '@/components/ui/button'
import { getAllListings, ListingsCardComp } from '@/features/listings';
import { getHomeListingsSection } from '@/features/home';
import { IconComponent } from '@/features/icons';


export function HomeListingSectionComp() {
    const listingsSection = getHomeListingsSection();
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
                <ListingsCardComp listings={recommendedListings} maxItems={listingsSection.maxItems} />
            </div>
            {/* Call to Action */}
            <div className='mt-12 text-center'>
                <Button asChild size={"lg"}>
                    <a href='/properties/page/1'>
                        <IconComponent name={listingsSection.buttonIcon} className='size-5' />
                        {listingsSection.buttonText}
                    </a>
                </Button>
            </div>
        </section>
    )
}

