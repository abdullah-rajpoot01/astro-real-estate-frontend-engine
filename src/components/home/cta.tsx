import { cn } from "@/lib/utils";
import { getHomeCtaSection } from "@/utils/home-page";
import { buttonVariants } from "../ui/button";

const HomeCTA = () => {
    const  ctaSection  = getHomeCtaSection();

    if (!ctaSection.enabled) return null;

    return (
        <div className="">
            <div className="relative flex w-full flex-col items-center justify-center bg-accent py-8 rounded-2xl px-4">
                <h2 className="text-5xl tracking-tighter text-center">
                    {ctaSection.title}
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-center text-muted-foreground text-xl">
                    {ctaSection.description}
                </p>
                <a href={ctaSection.buttonUrl} className={cn(buttonVariants(), "mt-8")}>{ctaSection.buttonText}</a>
            </div>
        </div>
    );
};

export default HomeCTA;
