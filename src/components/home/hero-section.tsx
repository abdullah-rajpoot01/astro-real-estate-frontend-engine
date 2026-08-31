import { buttonVariants } from "@/components/ui/button";
import IconComponent from "@/components/icons/icon";
import { cn } from "@/lib/utils";
import { getSiteDetails } from "@/utils/core-detail/site-detail";
import { getHeroSection } from "@/utils/home-page";

interface HeroSectionProps {
    children: React.ReactNode; // This holds our interactive carousel island
}

export default function HeroSection({ children }: HeroSectionProps) {
    const heroData = getHeroSection();

    const { heading, subHeading1, subHeading2, description, buttons } = heroData;

    const isButtonsGreaterThan1 = buttons && buttons.length > 1;

    const store = getSiteDetails();

    return (
        <section id="hero" className="">
            <div className=" grid gap-5 lg:grid-cols-2 lg:items-center">
                <div>
                    <span className="block text-primary text-balance font-heading  text-5xl md:text-6xl font-black uppercase leading-[0.94] ">{heading || store.title}</span>
                    <h2 className="mt-3 text-balance font-heading text-3xl sm:text-4xl font-black uppercase leading-[0.94] text-foreground ">
                        {subHeading1}
                        <span className="block text-primary mt-3">{subHeading2}</span>
                    </h2>
                    <p className="mt-3 max-w-xl text-xl leading-7 text-foreground/90 sm:text-text-2xl line-clamp-4">
                        {description || store.description}
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row w-full flex-wrap">
                        {
                            buttons.map((btn) => {
                                return (
                                    <a key={btn.link} href={btn.link} className={cn(`grow w-full`, isButtonsGreaterThan1 && "sm:max-w-[47%]")}>
                                        <div
                                            className={cn(buttonVariants({ variant: btn.type, size: "icon" }), "rounded-md text-sm px-4 py-3! mt-2 w-full text-center")}

                                        >
                                            {btn.icon && <IconComponent name={btn.icon} className="size-4 mr-1" />} {btn.text}
                                        </div>
                                    </a>
                                );
                            })
                        }
                    </div>

                </div>
                <div className="relative overflow-hidden max-w-md lg:aspect-square mx-auto border border-foreground/10 bg-black rounded-lg w-full h-full">

                    {children}
                </div>
            </div>
        </section>

    );
}
