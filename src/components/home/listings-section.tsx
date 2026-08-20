import { buttonVariants } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import homePageData from "@/content/pages/home.json";
import { cn } from '@/lib/utils';
import ListingCard1 from '../listings/listings-card';
import type { Listing } from '@/types/listing';

const listing: Listing = {
    id: "listing-001",
    title: "Modern 5 Marla House for Sale in DHA Lahore",
    slug: "modern-5-marla-house-for-sale-dha-lahore",
    type: "sale",
    propertyType: "house",
    status: "available",
    price: 28500000,
    comparePrice: 30000000,
    images: [
        "https://islamabad-images-1.pages.dev/images/299444896-800x1200.webp"
    ],
    description:
        "Beautifully designed modern 5 Marla house located in a prime area of DHA Lahore. The property features spacious living areas, modern finishes, parking, and a well-designed layout suitable for a family.",
    location: {
        address: "Street 12, DHA Phase 6",
        city: "Lahore",
        state: "Punjab",
        country: "Pakistan",
        postalCode: "54000",
        latitude: 31.4697,
        longitude: 74.4084
    },
    features: [
        "Double Storey",
        "Car Parking",
        "Modern Kitchen",
        "Separate Drawing Room",
        "Electricity Backup",
        "Near Commercial Area"
    ],
    specifications: [
        {
            key: "Bedrooms",
            value: "5"
        },
        {
            key: "Bathrooms",
            value: "5"
        },
        {
            key: "Area",
            value: "5 Marla"
        },
        {
            key: "Floor",
            value: "2"
        },
        {
            key: "Furnished",
            value: "Semi Furnished"
        },
        {
            key: "Year Built",
            value: "2024"
        }
    ],
    agentId: "agent-001",
    featured: true
}



export function ListingSection() {
    const { productsSection, setting } = homePageData
    if (!productsSection || !setting?.productsEnabled) return null;

    const listings = [listing];

    return (
        <section className='py-12 '>
            <div className='mx-auto w-full max-w-7xl'>
                <div className='mb-12 text-center'>
                    <h2 className='text-3xl font-bold tracking-tight text-balance'>{productsSection.heading}</h2>
                    {productsSection?.subHeading && <p className='text-muted-foreground mt-4 text-lg'>{productsSection.subHeading}</p>}
                </div>
                <ListingCard1 listings={listings} maxItems={6} />
            </div>
            {/* Call to Action */}
            <div className='mt-12 text-center'>
                <a href='/properties'>
                    <div className={cn(buttonVariants({ size: "lg" }), "h-10 px-4 cursor-pointer gap-2")}>
                        <ShoppingBag className='size-5' />
                        {productsSection.btnTxt}
                    </div>
                </a>
            </div>
        </section>
    )
}

export default ListingSection
