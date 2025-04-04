import Welcome from "@/components/home/welcome";
import About from "@/components/home/about";
import Services from "@/components/home/services";
import BookAppointment from "@/components/home/bookAppointment";
import Contact from "@/components/home/contact";
import Split from "../../../public/assets/images/split.svg";

import reservations from "@/data/reservations.json";
import Image from "next/image";

export default function Home() {
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
                reservations={reservations}
            />
            <Contact />
        </main>
    );
}
