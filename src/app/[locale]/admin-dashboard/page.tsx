import Dashboard from "@/components/dashboard";
import { fetchFromApi } from "@/lib/fetchFromApi";
import { Service } from "@/services/ServiceService";
import { Social } from "@/services/SocialService";
import React from "react";

async function DashboardPage() {
    const about = await fetchFromApi<{ en: string; tr: string }>(
        "/info?id=about"
    );

    // Retrieve member data
    const members = await fetchFromApi<{
        en: {
            gulce: { title: string; info: string };
            tugce: { title: string; info: string };
        };
        tr: {
            gulce: { title: string; info: string };
            tugce: { title: string; info: string };
        };
    }>("/info?id=members");

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

    return (
        <div className="flex flex-col pt-20 pb-32 px-40">
            <Dashboard
                about={about}
                members={members}
                contact={contact}
                socials={socials}
                services={services}
            />
        </div>
    );
}

export default DashboardPage;
