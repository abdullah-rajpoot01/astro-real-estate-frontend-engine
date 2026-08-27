import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { getAboutCtaSection } from "@/utils/about-page";

const AboutCTA = () => {
    const  ctaSection  = getAboutCtaSection();

    if (!ctaSection.enabled) return null;

    return (
        <div className="">
            <div className="relative flex w-full flex-col items-center justify-center bg-accent py-8 rounded-2xl">
                <h2 className="font-medium text-5xl tracking-tighter text-center">
                    {ctaSection.title}
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-center text-muted-foreground text-xl/normal">
                    {ctaSection.description}
                </p>
                <a href={ctaSection.buttonUrl} className={cn(buttonVariants(), "mt-8")}>{ctaSection.buttonText}</a>
            </div>
        </div>
    );
};

export default AboutCTA;
