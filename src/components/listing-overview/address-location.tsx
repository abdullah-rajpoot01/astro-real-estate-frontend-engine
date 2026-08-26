import type { Listing } from "@/utils/listings"
import { MapPin, User } from "lucide-react"
import { getAllAgents } from "@/utils/agents"

interface Props { 
    listing: Listing
}

const AddressAndLocation = ({ listing }: Props) => {
    const { location, agentId } = listing

    // Fetch agents and check if a valid assigned agent exists
    const agents = getAllAgents()
    const agent = agents.find((ag) => ag.id === agentId)
    const hasAgent = !!agent

    const addressLine = location?.address
    const city = location?.city
    const state = location?.state
    const country = location?.country
    const lat = location?.latitude
    const lng = location?.longitude

    return (
        <section className="py-16 md:py-20">
            {/* Dynamic Grid Layout: 3 columns if agent exists, 2 columns if not */}
            <div className={`site-container grid gap-8 ${hasAgent ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>

                {/* Column 1: Address Card */}
                <div className="grid gap-4">
                    <div
                        data-slot="card"
                        data-size="default"
                        className="group/card flex flex-col gap-4 overflow-hidden bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 surface-panel rounded-lg transition hover:border-primary/40"
                    >
                        <div data-slot="card-content" className="group-data-[size=sm]/card:px-3 p-5">
                            <div className="flex gap-4">
                                <MapPin className="size-5 text-primary" />
                                <span>
                                    <span className="block font-heading text-xl font-black uppercase text-foreground">
                                        Address
                                    </span>
                                    <span className="mt-1 block text-sm leading-6 text-foreground/90">
                                        {[addressLine, city, state, country].filter(Boolean).join(", ") || "No address provided"}
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Column 2: Google Maps Section */}
                <div
                    data-slot="card"
                    className="group/card flex flex-col min-h-75 overflow-hidden bg-card text-sm text-card-foreground ring-1 ring-foreground/10 surface-panel rounded-lg transition hover:border-primary/40"
                >
                    {lat && lng ? (
                        <iframe
                            src={`https://www.google.com/maps?q=${lat},${lng}&output=embed`}
                            className="size-full min-h-75 border-0"
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Property Location Map"
                        ></iframe>
                    ) : (
                        <div className="flex size-full min-h-75 items-center justify-center bg-muted text-muted-foreground p-4 text-center">
                            Map unavailable: Missing latitude/longitude values.
                        </div>
                    )}
                </div>

                {/* Column 3: Conditional Agent Card */}
                {hasAgent && (
                    <div className="grid gap-4">
                        <div
                            data-slot="card"
                            data-size="default"
                            className="group/card flex flex-col gap-4 overflow-hidden bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 surface-panel rounded-lg transition hover:border-primary/40"
                        >
                            <div data-slot="card-content" className="p-5 flex gap-4">
                                {agent.image ? (
                                    <img 
                                        src={agent.image} 
                                        alt={agent.name} 
                                        className="size-12 rounded-full object-cover ring-1 ring-foreground/10"
                                    />
                                ) : (
                                    <div className="size-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                                        <User className="size-6" />
                                    </div>
                                )}
                                <span>
                                    <span className="block font-heading text-xl font-black uppercase text-foreground">
                                        Assigned Agent
                                    </span>
                                    <span className="mt-1 block text-lg font-semibold text-foreground/90">
                                        {agent.name}
                                    </span>
                                    {agent.title && (
                                        <span className="block text-xs text-muted-foreground uppercase tracking-wider mt-0.5">
                                            {agent.title}
                                        </span>
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}

export default AddressAndLocation
