
import { Button } from "@/components/ui/button";

export default function Error() {

    const reloadPage = () => {
        if (typeof window === "undefined") return;
        window.location.reload();
    };
    
    return (
        <div className="flex min-h-screen flex-col items-center justify-center px-6">
            <p className="select-none font-satoshi text-[6rem] font-semibold leading-none tracking-tight text-muted-foreground/50">
                Oops!
            </p>

            <h1 className="mt-2 text-center text-3xl font-medium tracking-tight">
                Something went wrong
            </h1>

            <p className="mt-3 max-w-sm text-center text-pretty text-muted-foreground">
                An unexpected error occurred while loading this page. Please try again
                or contact us if the problem persists.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button onClick={reloadPage}>
                    Try Again
                </Button>

                <Button asChild variant="outline">
                    <a href="tel:+923046954705">
                        Call Now
                    </a>
                </Button>

                <Button asChild variant="outline">
                    <a
                        href="https://wa.me/923046954705"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Chat on WhatsApp
                    </a>
                </Button>
            </div>
        </div>
    );
}