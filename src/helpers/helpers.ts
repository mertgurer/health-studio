export const DateHelpers = {
    monthToNumber: (month: string): number => {
        const months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];
        return months.indexOf(month) + 1;
    },
};
