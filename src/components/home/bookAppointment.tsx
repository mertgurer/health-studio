"use client";

import {
    ArrowLeft01Icon,
    ArrowRight01Icon,
    ArrowUp01Icon,
    Cancel01Icon,
    ArrowDown01Icon,
    Appointment01Icon,
    CheckmarkSquare03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import React, { FormEvent, useState } from "react";
import FormInput from "../formTextInput";
import { emailRegex } from "@/constants/constants";

const secondsInDay = 86400000;

const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
];

interface Props {
    todayValue: Date;
    weekStartValue: Date;
    weekEndValue: Date;
    reservations: {
        id: string;
        date: string;
        startTime: string;
        endTime: string;
    }[];
}

function BookAppointment({
    todayValue,
    weekStartValue,
    weekEndValue,
    reservations,
}: Props) {
    const t = useTranslations();

    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedTime, setSelectedTime] = useState<{
        date: Date;
        startTime: string;
        endTime: string;
    } | null>(null);
    const [weekStart, setWeekStart] = useState(weekStartValue);
    const [weekEnd, setWeekEnd] = useState(weekEndValue);

    function changeWeek(direction: "next" | "prev") {
        const newDate = new Date(weekStart);
        const days = direction === "next" ? 7 : -7;
        newDate.setDate(newDate.getDate() + days);

        const monday = new Date(newDate);
        monday.setDate(newDate.getDate() - newDate.getDay() + 1);

        const sunday = new Date(newDate);
        sunday.setDate(newDate.getDate() - newDate.getDay() + 7);

        setWeekStart(monday);
        setWeekEnd(sunday);
    }

    function createReservation(event: FormEvent<HTMLFormElement>): void {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const customerName = formData.get("customerName") as string;
        const phone = formData.get("phone") as string;
        const email = formData.get("email") as string;

        if (!customerName && !phone && !email) {
            return;
        }

        if (!customerName || !phone) {
            return;
        }

        if (email && !emailRegex.test(email)) {
            alert(t("Common.invalidEmail"));
            return;
        }

        console.log(customerName, phone, email);
    }

    return (
        <section
            id="appointment"
            className="flex flex-col items-center w-full px-[10%] py-16 bg-secondary -mt-10 max-2xl:px-[5%]"
        >
            <div className="flex justify-between items-end w-full px-10 overflow-hidden max-2xl:px-0">
                <div className="flex items-center h-min gap-7 max-2xl:gap-2 max-2xl:ml-[3%]">
                    <button
                        onClick={() => changeWeek("prev")}
                        className="p-2 rounded-full hover:bg-secondary/20 duration-300"
                    >
                        <HugeiconsIcon
                            icon={ArrowLeft01Icon}
                            size={36}
                            strokeWidth={1.5}
                            className="max-2xl:size-7"
                        />
                    </button>
                    <div className="flex items-center justify-center gap-5">
                        <span className="text-2xl font-medium max-2xl:text-lg">
                            {weekStart.getFullYear()}
                        </span>
                        <span className="text-2xl font-medium whitespace-nowrap max-2xl:text-lg">
                            {weekStart.getMonth() === weekEnd.getMonth()
                                ? t(
                                      `Common.${new Intl.DateTimeFormat(
                                          "en-US",
                                          {
                                              month: "long",
                                          }
                                      )
                                          .format(weekStart)
                                          .toLowerCase()}`
                                  )
                                : `${t(
                                      `Common.${new Intl.DateTimeFormat(
                                          "en-US",
                                          {
                                              month: "long",
                                          }
                                      )
                                          .format(weekStart)
                                          .toLowerCase()}`
                                  )} - ${t(
                                      `Common.${new Intl.DateTimeFormat(
                                          "en-US",
                                          {
                                              month: "long",
                                          }
                                      )
                                          .format(weekEnd)
                                          .toLowerCase()}`
                                  )}`}
                        </span>
                    </div>
                    <button
                        onClick={() => changeWeek("next")}
                        className="p-2 rounded-full hover:bg-secondary/20 duration-300"
                    >
                        <HugeiconsIcon
                            icon={ArrowRight01Icon}
                            size={36}
                            strokeWidth={1.5}
                            className="max-2xl:size-7"
                        />
                    </button>
                </div>
                <div className="flex flex-col justify-center items-center text-center mb-8 -mr-[10%]">
                    <h1 className="max-2xl:text-sm">
                        - {t("Appointment.subtitle")} -
                    </h1>
                    <h2 className="text-4xl font-semibold italic max-2xl:text-3xl">
                        {t("Appointment.title")}
                    </h2>
                    <p className="text-sm text-balance w-2/3 mt-3 opacity-80 max-2xl:text-xs">
                        {t("Appointment.info")}
                    </p>
                </div>
            </div>

            <div className="flex flex-col w-full items-center">
                <div className="grid grid-cols-7 gap-[2px] p-[2px] w-full mt-7">
                    {days.map((x, index) => {
                        const day = new Date(
                            weekStart.getTime() + index * secondsInDay
                        );

                        const isToday =
                            day.toDateString() === todayValue.toDateString();

                        return (
                            <div
                                key={index}
                                className={`flex items-center justify-center font-medium gap-5`}
                            >
                                {isToday && (
                                    <div className="w-4 h-[2px] bg-primary" />
                                )}
                                <div className="flex flex-col items-center justify-center max-2xl:text-sm">
                                    <span>{day.getDate()}</span>
                                    <span>{t(`Common.${x}`)}</span>
                                </div>
                                {isToday && (
                                    <div className="w-4 h-[2px] bg-primary" />
                                )}
                            </div>
                        );
                    })}
                </div>
                <motion.div
                    className="relative w-full bg-secondary overflow-hidden"
                    initial={{
                        height: "23vw",
                    }}
                    animate={{
                        height: isExpanded ? "auto" : "23vw",
                    }}
                    transition={{ duration: 0.7 }}
                >
                    <div className="grid grid-cols-7 gap-[2px] p-[2px]">
                        {Array.from({ length: 7 }).map((_, timeIndex) =>
                            Array.from({ length: 7 }).map((_, dayIndex) => {
                                const startHour = 10 + timeIndex;
                                const startTime = `${startHour}:00`;
                                const endTime = `${startHour}:50`;

                                const date = new Date(
                                    weekStart.getTime() +
                                        dayIndex * secondsInDay
                                );

                                const threeHoursFromNow = new Date(
                                    todayValue.getTime() + 3 * 60 * 60 * 1000
                                );

                                const isPast = date < threeHoursFromNow;
                                const isReserved = reservations.some(
                                    (reservation) =>
                                        reservation.date ==
                                            date.toISOString().split("T")[0] &&
                                        reservation.startTime == startTime
                                );

                                return (
                                    <div
                                        key={`${dayIndex}-${timeIndex}`}
                                        className="relative w-full aspect-[2.2] flex flex-col items-center justify-center text-sm bg-primary"
                                    >
                                        <span className="absolute top-3 left-3 italic text-xs text-secondary">
                                            {startTime} - {endTime}
                                        </span>
                                        {!isPast &&
                                            (!isReserved ? (
                                                <button
                                                    className="flex items-center gap-2 px-3 py-1 bg-secondary mt-6 rounded-sm max-2xl:text-xs"
                                                    onClick={() => {
                                                        const date = new Date(
                                                            weekStart.getTime() +
                                                                dayIndex *
                                                                    secondsInDay
                                                        );
                                                        const startHour =
                                                            10 + timeIndex;
                                                        const startTime = `${startHour}:00`;
                                                        const endTime = `${startHour}:50`;
                                                        setSelectedTime({
                                                            date,
                                                            startTime,
                                                            endTime,
                                                        });
                                                    }}
                                                >
                                                    <HugeiconsIcon
                                                        icon={Appointment01Icon}
                                                        size={16}
                                                        strokeWidth={1.5}
                                                        className="max-2xl:size-3"
                                                    />
                                                    {t("Common.reserve")}
                                                </button>
                                            ) : (
                                                <p className="opacity-70 mt-6 max-2xl:text-xs">
                                                    {t("Common.unavailable")}
                                                </p>
                                            ))}
                                        {(isPast || isReserved) && (
                                            <div className="absolute inset-0 z-10 bg-black/10" />
                                        )}
                                    </div>
                                );
                            })
                        )}
                    </div>
                    <button
                        onClick={() => setIsExpanded(false)}
                        className="w-full bg-secondary p-2 flex justify-center"
                    >
                        <HugeiconsIcon
                            icon={ArrowUp01Icon}
                            size={36}
                            strokeWidth={1.5}
                            color="#000000"
                        />
                    </button>
                    <button
                        onClick={() => setIsExpanded(true)}
                        className={`absolute bottom-0 left-0 flex justify-center w-full pt-10 bg-gradient-to-t from-secondary to-transparent duration-500 z-10 ${
                            isExpanded
                                ? "opacity-0 pointer-events-none"
                                : "opacity-100"
                        }`}
                    >
                        <HugeiconsIcon
                            icon={ArrowDown01Icon}
                            size={36}
                            strokeWidth={1.5}
                        />
                    </button>
                </motion.div>
            </div>
            <AnimatePresence>
                {selectedTime && (
                    <motion.div
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.3,
                        }}
                        style={{
                            backgroundColor:
                                "color-mix(in srgb, var(--text), transparent 40%)",
                        }}
                        className="fixed top-0 left-0 w-full h-full z-40 flex items-center justify-center"
                        onClick={() => setSelectedTime(null)}
                    >
                        <div
                            className="relative flex items-center justify-center bg-primary rounded-sm shadow-lg p-14 cursor-default"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col items-center w-full">
                                <div className="flex items-center text-2xl font-medium mb-3 self-start max-2xl:text-xl">
                                    <HugeiconsIcon
                                        icon={Appointment01Icon}
                                        size={24}
                                        strokeWidth={1.5}
                                        className="max-2xl:size-5"
                                    />
                                    <span className="ml-2 italic">
                                        {t("Common.reserveForm")}
                                    </span>
                                </div>
                                <div className="flex flex-col items-start self-start ml-8">
                                    <span>
                                        <span className="font-medium mr-1 italic">
                                            {t("Common.date")}:{" "}
                                        </span>
                                        {selectedTime.date.getDate()}{" "}
                                        {t(
                                            `Common.${selectedTime.date
                                                .toLocaleString("default", {
                                                    month: "long",
                                                })
                                                .toLowerCase()}`
                                        )}
                                        {", "}
                                        {t(
                                            `Common.${selectedTime.date
                                                .toLocaleString("default", {
                                                    weekday: "long",
                                                })
                                                .toLowerCase()}`
                                        )}
                                    </span>
                                    <span>
                                        <span className="font-medium mr-1 italic">
                                            {t("Common.time")}:{" "}
                                        </span>
                                        {selectedTime.startTime} -{" "}
                                        {selectedTime.endTime}
                                    </span>
                                </div>
                                <div className="flex flex-col mt-10">
                                    <form
                                        className="flex flex-col items-center gap-4"
                                        onSubmit={createReservation}
                                    >
                                        <div className="flex gap-4">
                                            <FormInput
                                                label={"Common.name"}
                                                name={"customerName"}
                                            />
                                            <FormInput
                                                label={"Common.phone"}
                                                name={"phone"}
                                            />
                                            <FormInput
                                                label={"Common.email"}
                                                type="email"
                                                name={"email"}
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="flex items-center justify-center gap-2 bg-secondary px-4 py-2 rounded-sm w-full"
                                        >
                                            {t("Common.reserve")}
                                            <HugeiconsIcon
                                                icon={CheckmarkSquare03Icon}
                                                size={20}
                                                strokeWidth={1.5}
                                            />
                                        </button>
                                    </form>
                                </div>
                            </div>
                            <button
                                className="absolute top-3 right-3 p-2"
                                onClick={() => setSelectedTime(null)}
                            >
                                <HugeiconsIcon
                                    icon={Cancel01Icon}
                                    size={24}
                                    strokeWidth={1.5}
                                />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default BookAppointment;
