import { cn } from "@/lib/utils";
import { getContact } from "@/utils/core-detail/contact";
import { buttonVariants } from "../ui/button";
import { WhatsApp } from "../social-icons";
import { Mail, PhoneCall } from "lucide-react";
import type { Listing } from "@/utils/listings";
import { getAllAgents } from "@/utils/agents";

interface Props {
    listing: Listing;
}

// Assumes getAllAgents() reads local static array files synchronously.
// If it returns a Promise, pass agents down as a prop from the parent component instead!
const ListingContactButtons = ({ listing }: Props) => {
    const contact = getContact();
    const agents = getAllAgents();

    // Finds matching agent profile context strings
    const agent = agents.find((ag) => ag.id === listing.agentId);

    // Clean structural fallback definitions matching your schema rules
    const email = agent?.email || contact.email;
    const phone = agent?.phone || contact.phone;
    const whatsapp = agent?.whatsapp || contact.whatsapp;
    
    return (
        <div className="flex gap-2 mt-4">
            {/* Standardized template string injection */}
            <a 
                href={`https://wa.me/${whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={cn(buttonVariants())}
            >
                <WhatsApp className="size-4" /> Whatsapp
            </a>
            <a 
                href={`mailto:${email}`} 
                className={cn(buttonVariants())}
            >
                <Mail className="size-4" /> Email
            </a>
            <a 
                href={`tel:${phone}`} 
                className={cn(buttonVariants())}
            >
                <PhoneCall className="size-4" /> Phone
            </a>
        </div>
    );
};

export default ListingContactButtons;
