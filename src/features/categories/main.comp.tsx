
import {CategoryCard} from '@/features/categories/card.comp';
import { getAllCategories } from '@/features/categories/categories.utils';
import {EmptyCategoriesState} from "./empty.comp";
import { getCategoriesPageConfig } from '@/features/categories/main.utils';

export function CategoriesMainPage() {

  const categoriesPageConfig = getCategoriesPageConfig();
  // Fetch all property types with their dynamic listing counts pre-calculated
  const allCategories = getAllCategories()


  return (
    <section className=''>
      <div className='mx-auto w-full max-w-7xl'>
        {/* Header */}
        <div className='mb-12 text-center max-w-3xl mx-auto '>
          <h2 className='text-3xl font-bold tracking-tight text-balance'>{categoriesPageConfig.title}</h2>
          <p className='text-muted-foreground mt-4 text-lg'>{categoriesPageConfig.description}</p>
        </div>

        {/* Categories Grid */}
        {allCategories.length === 0 ? <EmptyCategoriesState /> : <CategoryCard categories={allCategories} />}

      </div>
    </section>
  )
}


