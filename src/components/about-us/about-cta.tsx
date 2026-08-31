import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { getAboutCtaSection } from "@/utils/about-page";
import IconComponent from "../icons/icon";

const AboutCTA = () => {
    const ctaSection = getAboutCtaSection();

    if (!ctaSection.enabled) return null;

    return (
        <div className="">
            <div className="relative flex w-full flex-col items-center justify-center bg-accent py-8 rounded-2xl px-4">
                <h2 className="font-medium text-5xl tracking-tighter text-center">
                    {ctaSection.title}
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-center text-muted-foreground text-xl/normal">
                    {ctaSection.description}
                </p>
                <a href={ctaSection.buttonUrl} className={cn(buttonVariants(), "mt-8")}>{ctaSection.buttonIcon && <IconComponent name={ctaSection.buttonIcon} className="h-4! w-4!" />} {ctaSection.buttonText}</a>
            </div>
        </div>
    );
};

export default AboutCTA;
