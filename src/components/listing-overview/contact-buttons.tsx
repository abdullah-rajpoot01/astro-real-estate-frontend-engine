import { cn } from "@/lib/utils";
import { getContact } from "@/utils/contact"
import { buttonVariants } from "../ui/button";
import { WhatsApp } from "../social-icons";
import { Mail, PhoneCall } from "lucide-react";
import type { Listing } from "@/utils/listings";
import type { PropertyType } from "@/utils/property-type";

interface Props {
    listing: Listing
    propertyType?: PropertyType
}
const ListingContactButtons = ({ listing, propertyType }: Props) => {
    const contact = getContact();
    return (
        <div className="flex gap-2 mt-4 ">
            <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" className={cn(buttonVariants(),)}>
                <WhatsApp className="size-4" />  Whatsapp
            </a>
            <a href={`mailto:${contact.email}`} className={cn(buttonVariants())}>
                <Mail className="size-4" />  Email
            </a>
            <a href={`tel:${contact.phone}`} className={cn(buttonVariants())}>
                <PhoneCall className="size-4" />  Phone
            </a>
        </div>
    )
}

export default ListingContactButtons