import { Button } from "@/components/ui/button";
import { getSiteDetails } from "@/features/core-detail";
import { IconComponent } from "@/features/icons";
import { getAboutHeroSection } from "@/features/about";

export function AboutHeroSectionComp() {

    const heroSection = getAboutHeroSection();

    if (!heroSection.enabled) return null;

    const { title, description, logo } = getSiteDetails();

    const buttonData = heroSection.button;

    const buttonUrl = buttonData?.url || "/properties/page/1";

    const buttonTxt = buttonData?.text || "View Properties";

    const buttonIcon = buttonData?.icon || "shoppingBag";

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
                    <p className="mt-2 max-w-[60ch] text-foreground/80 text-lg sm:mt-6 sm:text-xl/normal">
                        {heroSection?.description || description}
                    </p>
                    <div className="mt-2 flex items-center gap-4 sm:mt-12">
                        <Button asChild size={"lg"}>
                            <a href={buttonUrl}>
                                <IconComponent name={buttonIcon} className="h-5! w-5!" />  {buttonTxt}
                            </a>
                        </Button>
                    </div>
                </div>
                <div className="mt-auto aspect-video w-full rounded-xl bg-card border dark:border-card-foreground/70 overflow-hidden">
                    <img src={heroSection.image || logo} className="w-full h-full object-cover relative" alt="" />
                </div>

            </div>
        </div>
    );
}
