import { NavMenuComp } from "./nav-menu.comp";
import { Button } from "@/components/ui/button";
import { IconComponent } from "@/features/icons";
import { getNavbarData } from "@/features/navigation/navbar.utils";
import { getSiteDetails, getContact } from "@/features/core-detail";
import { MessageCircle, PhoneCall } from "lucide-react";

export const NavbarComp = ({ children }: { children: React.ReactNode; }) => {

  const { title, subtitle, image, buttons } = getNavbarData();

  const store = getSiteDetails();
  const contact = getContact();
  return (
    <nav className="fixed top-0 z-50 left-1/2 -translate-x-1/2  w-full max-w-7xl  border-b border-border/85  bg-background shadow-xs/3">
      <div className="flex h-full items-center justify-between px-4 py-2 ">
        <a href={`/`} className="flex items-center gap-3">

          <div className="relative w-10 h-10 flex justify-center  items-center aspect-square overflow-hidden shadow-lg rounded  border dark:border-card-foreground/70">
            <img alt="site-logo" src={image || store.logo} className="w-full h-full object-cover" />
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
        <NavMenuComp className="hidden md:block" />

        <div className="flex items-center gap-3">
          {
            buttons && buttons.length > 0 ? buttons.map((button, index) => <div key={index} className="hidden lg:block">
              <Button asChild variant={button.type} >
                <a href={button.link} >
                  {button.icon && <IconComponent name={button.icon} className="size-4" />}
                  {button.text}
                </a>
              </Button>

            </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="hidden lg:block">
                  <Button asChild>
                    <a href={"/contact-us"}  >
                      <MessageCircle className="size-4" />
                      Contact Us
                    </a>
                  </Button>

                </div>
                <div className="hidden lg:block">
                  <Button asChild variant={"outline"}>
                    <a href={`tel:${contact.phone}`}  >
                      <PhoneCall className="size-4" />
                      Call Now
                    </a>
                  </Button>

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

