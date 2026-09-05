import { getListingsPageConfig } from '@/features/listings';
import { ListingsCardComp } from './card.comp';
import { EmptyListingsStateComp } from "./empty.comp";
import type { ListingType } from "@/features/listings";


export function ListingsPageMainComp({ listings }: { listings: ListingType[] }) {
    const propertiesPageConfig = getListingsPageConfig()

    return (
        <section className='pb-10'>
            <div className='mx-auto w-full max-w-7xl'>
                <div className='mb-12 text-center max-w-3xl mx-auto '>
                    <h2 className='text-3xl font-bold tracking-tight text-balance'>{propertiesPageConfig.title}</h2>
                    <p className='text-muted-foreground mt-4 text-lg'>{propertiesPageConfig.description}</p>
                </div>
                {listings.length === 0 ? <EmptyListingsStateComp /> : <ListingsCardComp listings={listings} maxItems={propertiesPageConfig.listingPerPage} />}
            </div>
        </section>
    )
}

