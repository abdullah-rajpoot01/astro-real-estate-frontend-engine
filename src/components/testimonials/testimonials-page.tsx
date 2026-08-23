import type { ComponentProps } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getAllTestimonials } from "@/utils/testimonials";
import EmptyTestimonialsState from "./empty";
import testimonialsPageConfig from "@/content/pages/testimonials.json"


const Testimonials = () => {
  const testimonials = getAllTestimonials
    ()
  let testimonialsWithLimitApplied = testimonials;

  const { title, description, limit } = testimonialsPageConfig
  
  if (limit && limit > 0) {
    testimonialsWithLimitApplied = testimonials.slice(0, limit);
  }

  return <div className="">
    <div>
      <h2 className="text-center font-medium text-4xl tracking-[-0.04em] md:text-[2.75rem]">
        {title}
      </h2>
      <p className="mt-3.5 text-center text-muted-foreground text-xl tracking-[-0.015em] md:text-2xl">
        {description}
      </p>
      {testimonials.length === 0 ? <EmptyTestimonialsState /> : <div className="mx-auto mt-14 max-w-(--breakpoint-xl) columns-1 gap-8 md:columns-2 lg:mt-16 lg:columns-3">
        {testimonialsWithLimitApplied.map((testimonial) => (
          <div
            className="mb-8 break-inside-avoid rounded-xl p-6 dark:bg-muted/60"
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
                  <TwitterLogo className="h-4 w-4" />
                </div>
              </Button>
            </div>
            <p className="mt-5 text-[17px]">{testimonial.message}</p>
          </div>
        ))}
      </div>}
    </div>
  </div>
};

const TwitterLogo = (props: ComponentProps<"svg">) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>X</title>
    <path
      d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
      fill="currentColor"
    />
  </svg>
);

export default Testimonials;


