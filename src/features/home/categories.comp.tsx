
import { Button } from '@/components/ui/button'
import { getAllCategories ,CategoryCard} from '@/features/categories';
import { getHomeCategoriesSection } from '@/features/home';
import { IconComponent } from '@/features/icons';

export function CategoriesSection() {
  const categoriesSection = getHomeCategoriesSection();

  if (!categoriesSection || !categoriesSection.enabled) return null;

  // Fetch all property types with their dynamic listing counts pre-calculated
  const allCategories = getAllCategories()

  if (allCategories.length === 0) return null;
  /* 
    ⚡ ALGORITHM: Filter and fill featured categories logic
  */
  // A. Extract all categories marked as featured
  const featuredCategories = allCategories.filter((c) => c.featured === true)

  // B. Gather regular categories to use as fallbacks
  const fallbackCategories = allCategories.filter((c) => c.featured !== true)

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
        <CategoryCard categories={recommendedCategories} maxCategories={categoriesSection.maxItems} />

        {/* Call to Action */}
        <div className='mt-12 text-center'>
          <Button asChild size={"lg"}>
            <a href='/categories'>
              <IconComponent name={categoriesSection.buttonIcon} className='size-5' />
              {categoriesSection.buttonText}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}


