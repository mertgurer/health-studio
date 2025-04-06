import { ApproximatelyEqualCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

export default function Loading() {
    return (
        <div className="h-screen flex items-center justify-center bg-background">
            <div className="loading-icon">
                <HugeiconsIcon
                    icon={ApproximatelyEqualCircleIcon}
                    size={40}
                    color="var(--secondary)"
                    strokeWidth={1.5}
                />
            </div>
        </div>
    );
}
