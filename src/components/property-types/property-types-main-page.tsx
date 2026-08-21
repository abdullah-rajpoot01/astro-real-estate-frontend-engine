
import homePageData from "@/content/pages/home.json";
import CategoriesCard1 from '@/components/listings/categories-card';
import { getAllPropertyTypes } from '@/utils/property-type';

function PropertyTypesMainPage() {
  const { categoriesSection, setting } = homePageData;

  if (!categoriesSection || !setting?.categoriesEnabled) return null;

    // Fetch all property types with their dynamic listing counts pre-calculated
    const allCategories = getAllPropertyTypes()


  return (
    <section className=''>
      <div className='mx-auto w-full max-w-7xl'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-balance'>{categoriesSection.heading}</h2>
          {categoriesSection?.subHeading && <p className='text-muted-foreground mt-4 text-lg'>{categoriesSection.subHeading}</p>}
        </div>

        {/* Categories Grid */}
        <CategoriesCard1 categories={allCategories} maxCategories={categoriesSection.maxItems} />

      </div>
    </section>
  )
}


export default PropertyTypesMainPage
