import { Button, buttonVariants } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Menu } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import IconComponent from "@/components/icons/icon"
import type { NavbarData } from "@/utils/navbar"

export function MobileNavDialog({ navbarData }: { navbarData: NavbarData }) {
    const { title, subtitle, image, quickLinks, buttons } = navbarData;

    const [open, setOpen] = useState(false);

    const closeDialog = () => { setTimeout(() => setOpen(false), 0) };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-full" size="icon" variant="outline">
                    <Menu />
                </Button>
            </DialogTrigger>
            <DialogContent className="h-[80vh] sm:max-w-none lg:hidden  flex flex-col gap-0 p-0">
                <DialogHeader className="p-6 pb-0 shrink-0">
                    <DialogTitle className="">
                        <a onClick={closeDialog} href={`/`} className="flex items-center gap-3">

                            <div className="relative w-12 h-12 flex justify-center items-center aspect-square  shadow-lg border rounded  border-foreground/80 overflow-hidden">

                                <img src={image || ""} className="w-full h-full" />

                            </div>


                            <span className="min-w-0 leading-none">
                                <span className="block text-base font-black uppercase tracking-wide text-foreground">
                                    {title}
                                </span>
                                <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
                                    {subtitle || "Online Store"}
                                </span>
                            </span>

                        </a>
                    </DialogTitle>
                </DialogHeader>

                <ScrollArea className="flex-1 h-full w-full px-6 overflow-hidden">
                    <div className="pt-4 pb-2 flex flex-col gap-4">
                        <nav className="flex flex-col items-start w-full gap-3">
                            {
                                quickLinks.map((link, index) => <a key={`${index}_${link.label}`} onClick={closeDialog}
                                    href={link.url}
                                    className="w-full flex items-center  gap-3 px-6 py-3 text-left bg-accent transition-colors"
                                >
                                    {link.icon && <IconComponent name={link.icon} className="size-4" />}  <span>{link.label}</span>
                                </a>)
                            }

                        </nav>
                        {
                            buttons.map((button) => <div className="shrink-0 p-6 pt-0">
                                <div className="flex flex-col gap-3">
                                    <a href={button.link} onClick={() => {
                                        closeDialog()
                                    }}
                                        className={buttonVariants({ variant: button.type as "default", size: "default" })}
                                    >
                                        {button.text}
                                    </a>
                                </div>
                            </div>)
                        }
                    </div>
                </ScrollArea>


            </DialogContent>
        </Dialog>
    )
}