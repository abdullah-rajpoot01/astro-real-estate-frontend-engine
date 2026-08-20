
import {  buttonVariants } from '@/components/ui/button'
import { ShoppingBag } from 'lucide-react'
import homePageData from "@/content/pages/home.json";
import { cn } from '@/lib/utils';
import CategoriesCard1 from '@/components/listings/categories-card';
import type { PropertyType } from '@/types/listing';

function CategoriesSection() {
  const { categoriesSection, setting } = homePageData;

  if (!categoriesSection || !setting?.categoriesEnabled) return null;

const categories: PropertyType[] = [
  {
    id: "property-type-001",
    name: "House",
    slug: "house",
    description: "Residential houses and family homes.",
    image: "https://islamabad-images-1.pages.dev/images/299444896-800x1200.webp",
    featured: true
  },
  {
    id: "property-type-002",
    name: "Apartment",
    slug: "apartment",
    description: "Apartments and residential units.",
    image: "https://islamabad-images-1.pages.dev/images/300053279-800x1200.webp",
    featured: true
  },
  {
    id: "property-type-003",
    name: "Villa",
    slug: "villa",
    description: "Luxury villas and spacious residential properties.",
    image: "https://islamabad-images-1.pages.dev/images/302513651-800x1200.webp",
    featured: true
  },
  {
    id: "property-type-004",
    name: "Plot",
    slug: "plot",
    description: "Residential and commercial land plots.",
    image: "https://islamabad-images-1.pages.dev/images/300348706-800x1200.webp",
    featured: true
  },
  {
    id: "property-type-005",
    name: "Office",
    slug: "office",
    description: "Office spaces for businesses and professionals.",
    image: "https://islamabad-images-1.pages.dev/images/299667558-800x1200.webp",
    featured: false
  },
  {
    id: "property-type-006",
    name: "Shop",
    slug: "shop",
    description: "Retail shops and commercial spaces.",
    image: "https://islamabad-images-1.pages.dev/images/300055617-800x1200.webp",
    featured: false
  },
  {
    id: "property-type-007",
    name: "Warehouse",
    slug: "warehouse",
    description: "Warehouses and storage properties.",
    image: "https://islamabad-images-1.pages.dev/images/299444896-800x1200.webp",
    featured: false
  },
  {
    id: "property-type-008",
    name: "Commercial Building",
    slug: "commercial-building",
    description: "Commercial buildings and business properties.",
    image: "https://islamabad-images-1.pages.dev/images/299444896-800x1200.webp",
    featured: false
  }
]  
  return (
    <section className='py-12'>
      <div className='mx-auto w-full max-w-7xl'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-balance'>{categoriesSection.heading}</h2>
          {categoriesSection?.subHeading && <p className='text-muted-foreground mt-4 text-lg'>{categoriesSection.subHeading}</p>}
        </div>

        {/* Categories Grid */}
        <CategoriesCard1 categories={categories} maxCategories={categoriesSection.maxItems} />

        {/* Call to Action */}
        <div className='mt-12 text-center'>
          <a href='/categories'>
            <div className={cn(buttonVariants({ size: "lg" }), "h-10 px-4 cursor-pointer gap-2")}
            >
              <ShoppingBag className='size-5' />
              {categoriesSection.btnTxt}
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}


export default CategoriesSection
