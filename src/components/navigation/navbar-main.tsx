import { NavMenu } from "./nav-menu";
import { buttonVariants } from "../ui/button";
import IconComponent from "../icons/icon";
import { getNavbarSection } from "@/utils/sections/navbar";
import { getSiteDetails } from "@/utils/core-detail/site-detail";
import { cn } from "@/lib/utils";
import { getContact } from "@/utils/core-detail/contact";
import { MessageCircle, PhoneCall } from "lucide-react";

const Navbar = ({ children }: { children: React.ReactNode; }) => {

  const { title, subtitle, image, buttons } = getNavbarSection();

  const store = getSiteDetails();
  const contact = getContact();
  return (
    <nav className="fixed top-0 z-50 left-1/2 -translate-x-1/2  w-full max-w-7xl  border-b border-border/85  bg-background shadow-xs/3">
      <div className="flex h-full items-center justify-between px-4 py-2 ">
        <a href={`/`} className="flex items-center gap-3">

          <div className="relative w-10 h-10 flex justify-center items-center aspect-square  shadow-lg border rounded  border-foreground/80 overflow-hidden">
            <img alt="site-logo" src={image || store.logo} className="w-full h-full" />
          </div>


          <span className="min-w-0 leading-none">
            <span className="block text-base font-black uppercase tracking-wide text-foreground">
              {title || store.title}
            </span>
            <span className="block text-[10px] font-semibold uppercase tracking-[0.28em] text-primary">
              {subtitle || store.subtitle}
            </span>
          </span>

        </a>

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          {
          buttons && buttons.length > 0 ? buttons.map((button, index) => <div key={index} className="hidden lg:block"><a href={button.link} className={cn(buttonVariants({ variant: button.type, size: "default" }))} >
            {button.icon && <IconComponent name={button.icon} className="size-4" />}
            {button.text}
          </a>
          </div>
          ) : (
            <div className="flex items-center gap-3">
              <div className="hidden lg:block"><a href={"/contact-us"} className={cn(buttonVariants())} >
                <MessageCircle className="size-4" />
                Contact Us
              </a>
              </div>
              <div className="hidden lg:block"><a href={`tel:${contact.phone}`} className={cn(buttonVariants({variant:"outline"}))} >
                <PhoneCall className="size-4" />
                Call Now
              </a>
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            {children}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
