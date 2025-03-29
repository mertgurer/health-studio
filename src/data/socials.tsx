import { HugeiconsIcon } from "@hugeicons/react";
import {
    InstagramIcon,
    NewTwitterIcon,
    YoutubeIcon,
    TiktokIcon,
} from "@hugeicons/core-free-icons";

export const Socials = [
    {
        icon: (
            <HugeiconsIcon icon={InstagramIcon} size={28} strokeWidth={1.25} />
        ),
        name: "Instagram",
        url: "https://www.instagram.com",
        active: true,
        index: 0,
    },
    {
        icon: (
            <div style={{ padding: "2px" }}>
                <HugeiconsIcon
                    icon={NewTwitterIcon}
                    size={24}
                    strokeWidth={1.25}
                />
            </div>
        ),
        name: "X",
        url: "https://www.x.com",
        active: true,
        index: 1,
    },
    {
        icon: <HugeiconsIcon icon={YoutubeIcon} size={28} strokeWidth={1.25} />,
        name: "Youtube",
        url: "https://www.youtube.com",
        active: true,
        index: 3,
    },
    {
        icon: <HugeiconsIcon icon={TiktokIcon} size={28} strokeWidth={1.25} />,
        name: "Tiktok",
        url: "https://www.tiktok.com",
        active: true,
        index: 2,
    },
];
