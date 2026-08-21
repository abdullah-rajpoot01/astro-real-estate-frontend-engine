import { Button } from "@/components/ui/button";

const AboutCTA = () => {
  return (
    <div className="">
      <div className="relative flex w-full flex-col items-center justify-center bg-accent py-8 rounded-2xl">
        <h2 className="font-medium text-5xl tracking-tighter text-center">
          Ready to Build Faster?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-center text-muted-foreground text-xl/normal">
          Join thousands of developers using our premium component library to
          ship beautiful UIs in minutes, not hours.
        </p>
        <Button className="mt-8">View Properties</Button>
      </div>
    </div>
  );
};

export default AboutCTA;
