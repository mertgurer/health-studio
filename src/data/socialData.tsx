import { HugeiconsIcon } from "@hugeicons/react";
import {
    InstagramIcon,
    NewTwitterIcon,
    YoutubeIcon,
    TiktokIcon,
} from "@hugeicons/core-free-icons";

export const SocialIcons: { [key: string]: JSX.Element } = {
    Instagram: (
        <HugeiconsIcon icon={InstagramIcon} size={28} strokeWidth={1.25} />
    ),
    X: (
        <div style={{ padding: "2px" }}>
            <HugeiconsIcon icon={NewTwitterIcon} size={24} strokeWidth={1.25} />
        </div>
    ),
    Youtube: <HugeiconsIcon icon={YoutubeIcon} size={28} strokeWidth={1.25} />,
    Tiktok: <HugeiconsIcon icon={TiktokIcon} size={28} strokeWidth={1.25} />,
};
