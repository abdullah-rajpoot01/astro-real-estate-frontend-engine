
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils';
import CategoriesCard1 from '@/components/listings/categories-card';
import { getAllPropertyTypes } from '@/utils/property-type';
import { getHomePageConfig } from '@/utils/home-page';
import IconComponent from '@/components/icon';

function CategoriesSection() {
  const { categoriesSection } = getHomePageConfig();

  if (!categoriesSection || !categoriesSection.enabled) return null;

  // Fetch all property types with their dynamic listing counts pre-calculated
  const allPropertyTypes = getAllPropertyTypes()

  if (allPropertyTypes.length === 0) return null;
  /* 
    ⚡ ALGORITHM: Filter and fill featured categories logic
  */
  // A. Extract all categories marked as featured
  const featuredCategories = allPropertyTypes.filter((c) => c.featured === true)

  // B. Gather regular categories to use as fallbacks
  const fallbackCategories = allPropertyTypes.filter((c) => c.featured !== true)

  // C. Merge lists ensuring featured items take absolute priority, limited safely to 6 slots
  const recommendedCategories = [
    ...featuredCategories,
    ...fallbackCategories
  ].slice(0, 6)

  return (
    <section className='py-12'>
      <div className='mx-auto w-full max-w-7xl'>
        {/* Header */}
        <div className='mb-12 max-w-3xl mx-auto  text-center'>
          <h2 className='text-3xl font-bold tracking-tight text-balance'>{categoriesSection.title}</h2>
          <p className='text-muted-foreground mt-4 text-lg'>{categoriesSection.description}</p>
        </div>

        {/* Categories Grid */}
        <CategoriesCard1 categories={recommendedCategories} maxCategories={categoriesSection.maxItems} />

        {/* Call to Action */}
        <div className='mt-12 text-center'>
          <a href='/property-types'>
            <div className={cn(buttonVariants({ size: "lg" }), "h-10 px-4 cursor-pointer gap-2")}
            >
              <IconComponent name={categoriesSection.buttonIcon} className='size-5' />
              {categoriesSection.buttonText}
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}


export default CategoriesSection
