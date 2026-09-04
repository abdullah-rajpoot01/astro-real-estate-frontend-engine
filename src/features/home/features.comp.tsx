import {IconComponent} from "@/features/icons";
import { getAllFeatures } from "@/features/features";
import { getHomeFeaturesSection } from "@/features/home/home.utils";

const Features = () => {
    const  featuresSection  = getHomeFeaturesSection();

    if (!featuresSection.enabled) return null;

    const features = getAllFeatures();

    
    if (features.length === 0) return null;

    return (
        <div id="our-features" className="mx-auto flex max-w-7xl flex-col py-10 relative">

            <div className="absolute inset-0 w-full h-full bg-background/70 z-0 flex justify-center">
            </div>
            <div className="z-10">


                <h2 className="max-w-3xl mx-auto text-foreground text-pretty text-center font-medium text-4xl tracking-[-0.04em] sm:text-[2.75rem]">
                    {featuresSection.title}
                </h2>
                <p className="max-w-3xl mx-auto  text-foreground/80 mt-3 text-pretty text-center  text-xl tracking-[-0.01em] sm:text-2xl">
                    {featuresSection.description}
                </p>

                <div className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            className="relative overflow-hidden rounded-xl border bg-card p-6 dark:border-card-foreground/70 "
                            key={index}
                        >
                            <div className=" flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground ">
                                <IconComponent name={feature.icon} className="size" />
                            </div>
                            <h3 className="mt-5 font-medium text-lg tracking-[-0.005em]">
                                {feature.title}
                            </h3>
                            <p className="mt-2 text-foreground/80">{feature.description}</p>

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
                </div>
            </div>
        </div>
    );
};

export default Features;
