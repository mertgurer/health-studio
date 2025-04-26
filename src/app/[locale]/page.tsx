import Welcome from "@/components/home/welcome";
import About from "@/components/home/about";
import Services from "@/components/home/services";
import BookAppointment from "@/components/home/bookAppointment";
import Contact from "@/components/home/contact";
import Split from "../../../public/assets/images/split.svg";
import Image from "next/image";
import { headers } from "next/headers";
import { InfoService } from "@/services/InfoService";
import { SocialService } from "@/services/SocialService";
import { ServiceService } from "@/services/ServiceService";
import { Experts } from "@/constants/constants";

type Props = {
  params: {
    locale: string;
  };
};

export default async function Home({ params }: Props) {
  const infoService = new InfoService();
  const socialService = new SocialService();
  const serviceService = new ServiceService();

  async function fetchReservations(): Promise<
    { start: Date; end: Date; expertId: Experts }[] | null
  > {
    const host = headers().get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const url = `${protocol}://${host}/api/calendar`;

    const res = await fetch(url);
    const data = await res.json();

    return data.error
      ? null
      : (data.events.map((event: any) => ({
          start: new Date(event.start),
          end: new Date(event.end),
          expertId: event.expertId,
        })) as { start: Date; end: Date; expertId: Experts }[]);
  }

  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay() + 7);

  // Retrieve calendar events
  const events = await fetchReservations();

  // Retrieve about data
  const about = (await infoService.getById("about"))[
    params.locale
  ] as unknown as string;

  // Retrieve member data
  const members = (await infoService.getById("members"))[
    params.locale
  ] as unknown as {
    gulce: {
      title: string;
      info: string;
    };
    tugce: {
      title: string;
      info: string;
    };
  };

  // Retrieve contact data
  const contact = (await infoService.getById("contact")) as unknown as {
    email: string;
    phone: string;
    address: { en: string; tr: string };
  };

  // Retrieve social data
  const socials = await socialService.getAll();

  // Retrieve service data
  const services = await serviceService.getAll();

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
              id: x.id,
              index: x.index,
              isActive: x.isActive,
              title: isEn ? x.en.title : x.tr.title,
              info: isEn ? x.en.info : x.tr.info,
              description: isEn ? x.en.description : x.tr.description,
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
