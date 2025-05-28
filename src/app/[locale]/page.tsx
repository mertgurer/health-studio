import Welcome from "@/components/home/welcome";
import About from "@/components/home/about";
import Services from "@/components/home/services";
import BookAppointment from "@/components/home/bookAppointment";
import Contact from "@/components/home/contact";
import Split from "../../../public/assets/images/split.svg";
import Image from "next/image";
import { Experts } from "@/constants/constants";
import { fetchFromApi } from "@/lib/fetchFromApi";
import { Service } from "@/services/ServiceService";
import { Social } from "@/services/SocialService";

type Props = {
    params: {
        locale: string;
    };
};

export default async function Home({ params }: Props) {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay() + 7);

    // Retrieve about data
    const about = (
        await fetchFromApi<{ en: string; tr: string }>("/info?id=about")
    )[params.locale as "en" | "tr"];

    // Retrieve member data
    const members = (
        await fetchFromApi<{
            en: {
                gulce: { title: string; info: string };
                tugce: { title: string; info: string };
            };
            tr: {
                gulce: { title: string; info: string };
                tugce: { title: string; info: string };
            };
        }>("/info?id=members")
    )[params.locale as "en" | "tr"];

    // Retrieve contact data
    const contact = await fetchFromApi<{
        email: string;
        phone: string;
        address: { en: string; tr: string };
    }>("/info?id=contact");

    // Retrieve social data
    const socials = await fetchFromApi<Social[]>("/social");

    // Retrieve service data
    const services = await fetchFromApi<Service[]>("/service");

    // Retrieve calendar events
    const events = (
        await fetchFromApi<{
            events: { start: Date; end: Date; expertId: Experts }[];
        }>("/calendar")
    ).events
        .filter((x) => x && Object.keys(x).length > 0)
        .map((x) => {
            console.log("Raw Event:", x);
            return {
                start: new Date(x.start),
                end: new Date(x.end),
                expertId: x.expertId,
            };
        });

    return (
        <main>
            <Welcome />
            <About about={about} members={members} />
            <Services
                services={services
                    .filter((x) => x.isActive)
                    .map((x) => {
                        const isEn = params.locale === "en";

                        return {
                            serviceId: x.serviceId,
                            index: x.index,
                            isActive: x.isActive,
                            title: isEn ? x.en.title : x.tr.title,
                            info: isEn ? x.en.info : x.tr.info,
                            description: isEn
                                ? x.en.description
                                : x.tr.description,
                        };
                    })}
            />
            <div className="relative w-full h-[200px] overflow-hidden rotate-180 bg-secondary max-md:h-[50px]">
                <Image
                    src={Split}
                    alt="Decorative split"
                    fill
                    sizes="100%"
                    draggable={false}
                    className="object-cover w-full"
                />
            </div>
            <BookAppointment
                todayValue={today}
                weekStartValue={monday}
                weekEndValue={sunday}
                reservations={events}
            />
            <Contact
                email={contact.email}
                phone={contact.phone}
                address={contact.address[params.locale as "en" | "tr"]}
                socials={socials.filter((x) => x.isActive)}
            />
        </main>
    );
}
