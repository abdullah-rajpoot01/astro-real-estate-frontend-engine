import { buttonVariants } from "@/components/ui/button";
import { getSiteDetails } from "@/utils/core-detail/site-detail";
import { cn } from "@/lib/utils";
import IconComponent from "../icons/icon";
import { getAboutHeroSection } from "@/utils/about-page";
export default function Hero() {
    const  heroSection  = getAboutHeroSection();

    if (!heroSection.enabled) return null;

    const { title } = getSiteDetails();
    return (
        <div className="flex  items-center justify-center pb-12">
            <div className="mx-auto grid w-full max-w-(--breakpoint-xl) gap-16 lg:grid-cols-2">
                <div>
                    <h1 className="mt-4 max-w-[17ch] font-medium text-4xl leading-[1.2]! tracking-[-0.04em] md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
                        {
                            heroSection.title ? heroSection.title : <>Know About
                                <br /> {title}</>
                        }
                    </h1>
                    <p className="mt-2 max-w-[60ch] text-foreground/60 text-lg sm:mt-6 sm:text-xl/normal">
                        {heroSection.description}
                    </p>
                    <div className="mt-2 flex items-center gap-4 sm:mt-12">
                        <a href={heroSection.buttonUrl} className={cn(buttonVariants({ size: "lg" }))}>
                            <IconComponent name={heroSection.buttonIcon} className="h-5! w-5!" />  {heroSection.buttonText}
                        </a>
                    </div>
                </div>
                <div className="mt-auto aspect-video w-full rounded-xl bg-accent overflow-hidden">
                    <img src="https://islamabad-images-1.pages.dev/logos/201948.jpg" className="size-full object-cover relative" alt="" />
                </div>

            </div>
        </div>
    );
}
