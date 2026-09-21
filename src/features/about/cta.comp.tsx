import { Button } from "@/components/ui/button";
import { getAboutCtaSection } from "@/features/about";
import { IconComponent } from "@/features/icons";

export const AboutCTASectionComp = () => {
    const ctaSection = getAboutCtaSection();

    if (!ctaSection.enabled) return null;

    return (
        <div className="">
            <div className="relative flex w-full flex-col items-center justify-center border bg-primary py-8 rounded-xl px-4 ">
                <h2 className="font-medium text-primary-foreground text-5xl tracking-tighter text-center">
                    {ctaSection.title}
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-center text-primary-foreground/80 text-xl/normal">
                    {ctaSection.description}
                </p>
                <Button asChild variant={"secondary"}>
                    <a href={ctaSection.buttonUrl} className={"mt-8"}>{ctaSection.buttonIcon && <IconComponent name={ctaSection.buttonIcon} className="h-4! w-4!" />} {ctaSection.buttonText}</a>
                </Button>
            </div>
        </div>
    );
};

