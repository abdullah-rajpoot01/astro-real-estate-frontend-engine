import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { getHomeTestimonialsSection } from "@/features/home/home.utils";
import { X } from "../icons/social.comp";
import { getAllTestimonials } from "@/features/testimonials/testimonials.utils";


export const HomeTestimonialsSectionComp = () => {

  const testimonialsSection = getHomeTestimonialsSection();

  if (!testimonialsSection.enabled) return null;

  const testimonials = getAllTestimonials();

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
  const testimonials = getAllTestimonials();
  return <>
    {testimonials.map((testimonial) => (
      <div
        className="min-w-96 max-w-sm rounded-xl border bg-card p-6 dark:border-card-foreground/70 relative overflow-hidden"
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
              <p className="text-foreground text-sm">
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
        <div
          className="absolute inset-0 -top-px z-0"
          style={{
            backgroundImage: `
        linear-gradient(to right, var(--border) 1px, transparent 1px),
        linear-gradient(to bottom, var(--border) 1px, transparent 1px)
      `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 0",
            maskImage: `
          repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 100% 80% at 100% 0%, #000 50%, transparent 100%)
      `,
            WebkitMaskImage: `
    repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 100% 0%, #000 50%, transparent 90%)
      `,
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in",
          }}
        />
      </div>

    ))}
  </>
};



