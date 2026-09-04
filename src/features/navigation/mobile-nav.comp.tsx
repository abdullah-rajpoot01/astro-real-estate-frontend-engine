import { Button, buttonVariants } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Menu, MessageCircle, PhoneCall } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from "react"
import {IconComponent} from "@/features/icons/icon.comp"
import type { NavbarData } from "@/features/navigation/navbar.utils"
import type { StoreDetailData } from "@/features/core-detail/site-detail.utils"

export function MobileNavDialog({ navbarData, siteDetail, phone }: { navbarData: NavbarData, siteDetail: StoreDetailData, phone: string }) {
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

                            <div className="relative w-12 h-12 flex justify-center items-center aspect-square shadow-lg rounded overflow-hidden border   dark:border-card-foreground/70">

                                <img src={image || siteDetail.logo} className="w-full h-full" />

                            </div>


                            <span className="min-w-0 leading-none">
                                <span className="block text-base font-black uppercase tracking-wide text-foreground">
                                    {title || siteDetail.title}
                                </span>
                                <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
                                    {subtitle || siteDetail.subtitle}
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
                            buttons && buttons.length > 0 ? (
                                // Added w-full to the dynamic buttons grid wrapper
                                <div className="grid grid-cols-1 gap-3 w-full">
                                    {buttons.map((button, index) => (
                                        <div key={index} className="w-full">
                                            <Button asChild className="w-full text-center" variant={button.type} onClick={() => {
                                                closeDialog()
                                            }}>
                                                <a
                                                    href={button.link}
                                                >
                                                    {button.text}
                                                </a>
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                // Changed flex-col to grid w-full for consistent block stacking
                                <div className="grid grid-cols-1 gap-3 w-full">
                                    <div className="lg:hidden w-full">
                                        {/* Added w-full and justify-center to align icons and text */}
                                        <Button asChild className="w-full justify-center">
                                            <a href={"/contact-us"}  >
                                                <MessageCircle className="size-4" />
                                                Contact Us
                                            </a>
                                        </Button>
                                    </div>
                                    <div className="lg:hidden w-full">
                                        <Button asChild variant={"outline"} className="w-full justify-center">
                                            <a href={`tel:${phone}`} >
                                                <PhoneCall className="size-4" />
                                                Call Now
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </ScrollArea>


            </DialogContent>
        </Dialog>
    )
}