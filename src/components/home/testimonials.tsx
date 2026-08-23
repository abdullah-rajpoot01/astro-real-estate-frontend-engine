import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { getHomePageConfig } from "@/utils/home-page";
import { X } from "../social-icons";
import { getAllTestimonials } from "@/utils/testimonials";


const Testimonials = () => {

  const { testimonialsSection } = getHomePageConfig();

  if (!testimonialsSection.enabled) return null;
  
  const testimonials  = getAllTestimonials();

  if (testimonials.length === 0) return null;

  return (<div className="py-10 ">
    <h2 className="max-w-3xl mx-auto text-center font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
      {testimonialsSection.title}
    </h2>
    <p className="max-w-3xl mx-auto mt-3.5 text-center text-muted-foreground text-xl tracking-[-0.015em] md:text-2xl">
      {testimonialsSection.description}
    </p>
    <div className="mask-x-from-80% mt-14">
      <Marquee className="[--duration:60s]" pauseOnHover>
        <TestimonialList />
      </Marquee>
      <Marquee className="mt-0 [--duration:60s]" pauseOnHover reverse>
        <TestimonialList />
      </Marquee>
    </div>
  </div>
  )
};

const TestimonialList = () => {
  const testimonials  = getAllTestimonials();
  return <>
    {testimonials.map((testimonial) => (
      <div
        className="min-w-96 max-w-sm rounded-xl bg-accent p-6"
        key={testimonial.id}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="size-10">
              <AvatarFallback className="bg-primary font-medium text-primary-foreground text-xl">
                {testimonial.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{testimonial.name}</p>
              <p className="text-muted-foreground text-sm">
                {testimonial.role}
              </p>
            </div>
          </div>
          <Button asChild size="icon" variant="ghost">
            <div>
              <X className="h-4 w-4" />
            </div>
          </Button>
        </div>
        <p className="mt-5 text-[17px]">{testimonial.message}</p>
      </div>

    ))}
  </>
};



export default Testimonials;
