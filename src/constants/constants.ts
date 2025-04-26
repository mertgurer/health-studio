export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const secondsInDay = 86400000;

export const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
];

export enum Experts {
    GULCE = 0,
    TUGCE = 1,
}

export const ExpertNames: Record<Experts, string> = {
    [Experts.GULCE]: "Gülce Şevval Bağcıbaşı",
    [Experts.TUGCE]: "Tuğçe Yurdakul",
};

export const ExpertColors: Record<string, Experts> = {
    3: Experts.GULCE,
    10: Experts.GULCE,
    9: Experts.TUGCE,
    2: Experts.TUGCE,
};
