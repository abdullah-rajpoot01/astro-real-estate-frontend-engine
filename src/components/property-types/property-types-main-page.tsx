
import PropertiesTypePageConfig from "@/content/pages/categories.json";
import CategoriesCard1 from '@/components/listings/categories-card';
import { getAllPropertyTypes } from '@/utils/property-type';
import EmptyPropertyTypesState from "./empty";

function PropertyTypesMainPage() {


  // Fetch all property types with their dynamic listing counts pre-calculated
  const allCategories = getAllPropertyTypes()


  return (
    <section className=''>
      <div className='mx-auto w-full max-w-7xl'>
        {/* Header */}
        <div className='mb-12 text-center max-w-3xl mx-auto '>
          <h2 className='text-3xl font-bold tracking-tight text-balance'>{PropertiesTypePageConfig.title}</h2>
          <p className='text-muted-foreground mt-4 text-lg'>{PropertiesTypePageConfig.description}</p>
        </div>

        {/* Categories Grid */}
        {allCategories.length === 0 ? <EmptyPropertyTypesState /> : <CategoriesCard1 categories={allCategories} />}

      </div>
    </section>
  )
}


export default PropertyTypesMainPage
