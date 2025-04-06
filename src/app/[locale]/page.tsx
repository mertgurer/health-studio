import Welcome from "@/components/home/welcome";
import About from "@/components/home/about";
import Services from "@/components/home/services";
import BookAppointment from "@/components/home/bookAppointment";
import Contact from "@/components/home/contact";
import Split from "../../../public/assets/images/split.svg";
import Image from "next/image";
import { headers } from "next/headers";
import Loading from "./loading";

export default async function Home() {
    const host = headers().get("host");
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    const url = `${protocol}://${host}/api/calendar`;

    const res = await fetch(url);
    const data = await res.json();

    const events = data.error
        ? null
        : (data.events.map((event: any) => ({
              start: new Date(event.start),
              end: new Date(event.end),
          })) as { start: Date; end: Date }[]);

    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - today.getDay() + 7);

    return (
        <main>
            <Welcome />
            <About />
            <Services />
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
            <Contact />
        </main>
    );
}
