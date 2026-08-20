import {  Clock, Mail, MapPin, Phone } from "lucide-react";

const Contact = () => {

    return <div className="flex min-h-screen items-center justify-center pt-30 pb-5 overflow-hidden">
        <div className=" w-full max-w-(--breakpoint-xl) px-4 xl:px-0">
            <div className="text-center">
                <b className="font-medium text-foreground text-center text-sm uppercase tracking-wide">
                    Contact Us | <span className="text-primary">Blue Rock Investments</span>
                </b>
                <h2 className="mt-3 text-center text-foreground/80 font-medium text-4xl tracking-[-0.04em]">
                    We&apos;d love to hear from you
                </h2>
                <p className=" text-center mt-3 text-foreground/80 text-lg  md:text-xl">
                    Our friendly team is always here to chat.
                </p>
            </div>
            <section className="py-16 md:py-20">
                <div className="site-container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="grid gap-4">
                        <div
                            data-slot="card"
                            data-size="default"
                            className="group/card flex flex-col gap-4 overflow-hidden bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl surface-panel rounded-lg transition hover:border-primary/40"
                        >
                            <div
                                data-slot="card-content"
                                className="group-data-[size=sm]/card:px-3 p-5"
                            >
                                <div className="flex gap-4" >
                                    <MapPin className="size-5 text-primary" />
                                    <span>
                                        <span className="block font-heading text-xl font-black uppercase text-foreground">
                                            Address
                                        </span>
                                        <span className="mt-1 block text-sm leading-6 text-foreground/90">
                                            Gulberg III Lahore Pakistan
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div
                            data-slot="card"
                            data-size="default"
                            className="group/card flex flex-col gap-4 overflow-hidden bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl surface-panel rounded-lg transition hover:border-primary/40"
                        >
                            <div
                                data-slot="card-content"
                                className="group-data-[size=sm]/card:px-3 p-5"
                            >
                                <a href={`tel:923003456777`} className="flex gap-4">
                                    <Phone className="text-primary size-5" />
                                    <span>
                                        <span className="block font-heading text-xl font-black uppercase text-foreground">
                                            Phone
                                        </span>
                                        <span className="mt-1 block text-sm leading-6 text-foreground/90">
                                            {"923003456777".replace(/[^0-9]/g, "").replace(/^92/,"0")}
                                        </span>
                                    </span>
                                </a>
                            </div>
                        </div>
                        <div
                            data-slot="card"
                            data-size="default"
                            className="group/card flex flex-col gap-4 overflow-hidden bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl surface-panel rounded-lg transition hover:border-primary/40"
                        >
                            <div
                                data-slot="card-content"
                                className="group-data-[size=sm]/card:px-3 p-5"
                            >
                                <a href={`mailto:brh.alpha@gmail.com`} className="flex gap-4">
                                    <Mail className="text-primary size-5" />
                                    <span>
                                        <span className="block font-heading text-xl font-black uppercase text-foreground">
                                            Email
                                        </span>
                                        <span className="mt-1 block text-sm leading-6 text-foreground/90">
                                            brh.alpha@gmail.com
                                        </span>
                                    </span>
                                </a>
                            </div>
                        </div>


                    </div>
                    <div
                        data-slot="card"
                        data-size="default"
                        className="group/card flex flex-col gap-4 overflow-hidden bg-card py-4 text-sm text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl surface-panel rounded-lg"
                    >
                        <div
                            data-slot="card-content"
                            className="group-data-[size=sm]/card:px-3 flex gap-4 p-5"
                        >
                            <Clock className="text-primary size-5" />

                            <div>
                                <div className="font-heading text-xl font-black uppercase text-foreground">
                                    Hours
                                </div>
                                <div className="mt-3 grid gap-3 text-sm leading-6 text-foreground/90">
                                    <div>
                                        <div className="font-bold text-foreground">Monday-Friday</div>
                                        <div>Morning: 9:30 AM to 12:30 AM</div>
                                        <div>Evening: 1:00 PM to 6:00 PM</div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-foreground">Saturday</div>
                                        <div>Morning: 10:00 AM to 5:30 PM
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    </div>
};

export default Contact;
