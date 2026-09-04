import { cn } from "@/lib/utils";
import { getHomeCtaSection } from "@/features/home/home.utils";
import { Button, buttonVariants } from "../../components/ui/button";

const HomeCTA = () => {
    const ctaSection = getHomeCtaSection();

    if (!ctaSection.enabled) return null;

    return (
        <div className="relative overflow-hidden">
            <div className="flex w-full flex-col items-center justify-center border bg-primary   py-8 rounded-xl px-4 ">
                <h2 className="text-5xl tracking-tighter text-center text-primary-foreground">
                    {ctaSection.title}
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-center text-primary-foreground/80 text-xl">
                    {ctaSection.description}
                </p>
                <Button asChild variant={"secondary"}>
                    <a href={ctaSection.buttonUrl} className={"mt-8"}>{ctaSection.buttonText}</a>
                </Button>
            </div>
        </div>
    );
};

export { HomeCTA };
