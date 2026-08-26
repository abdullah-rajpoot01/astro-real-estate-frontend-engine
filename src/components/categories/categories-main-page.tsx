
import CategoriesPageConfig from "@/content/pages/categories.json";
import CategoriesCard1 from '@/components/categories/categories-card';
import { getAllCategories } from '@/utils/categories';
import EmptyPropertyTypesState from "./empty";

function CategoriesMainPage() {


  // Fetch all property types with their dynamic listing counts pre-calculated
  const allCategories = getAllCategories()


  return (
    <section className=''>
      <div className='mx-auto w-full max-w-7xl'>
        {/* Header */}
        <div className='mb-12 text-center max-w-3xl mx-auto '>
          <h2 className='text-3xl font-bold tracking-tight text-balance'>{CategoriesPageConfig.title}</h2>
          <p className='text-muted-foreground mt-4 text-lg'>{CategoriesPageConfig.description}</p>
        </div>

        {/* Categories Grid */}
        {allCategories.length === 0 ? <EmptyPropertyTypesState /> : <CategoriesCard1 categories={allCategories} />}

      </div>
    </section>
  )
}


export default CategoriesMainPage
