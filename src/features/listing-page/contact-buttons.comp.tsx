import { getContact } from "@/features/core-detail/contact.utils";
import { Button } from "../../components/ui/button";
import { WhatsApp } from "../icons/social.comp";
import { Mail, PhoneCall } from "lucide-react";
import type { ListingType } from "@/features/listings";
import { getAllAgents } from "@/features/agents";

interface Props {
    listing: ListingType;
}

// Assumes getAllAgents() reads local static array files synchronously.
// If it returns a Promise, pass agents down as a prop from the parent component instead!
export const ListingPageContactButtonsSectionComp = ({ listing }: Props) => {
    const contact = getContact();
    const agents = getAllAgents();

    // Finds matching agent profile context strings
    const agent = agents.find((ag) => ag.id === listing.agentId);

    // Clean structural fallback definitions matching your schema rules
    const email = agent?.email || contact.email;
    const phone = agent?.phone || contact.phone;
    const whatsapp = (agent?.whatsapp || contact.whatsapp)?.replace(/^\+/, "");

    return (
        <div className="flex gap-2 mt-4">
            {/* Standardized template string injection */}
            <Button asChild>
                <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <WhatsApp className="size-4" /> Whatsapp
                </a>
            </Button>
            <Button asChild>
                <a
                    href={`mailto:${email}`}
                >
                    <Mail className="size-4" /> Email
                </a>
            </Button>
            <Button asChild>
                <a
                    href={`tel:${phone}`}
                >
                    <PhoneCall className="size-4" /> Phone
                </a>
            </Button>
        </div>
    );
};

