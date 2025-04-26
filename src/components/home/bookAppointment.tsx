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
import React, { FormEvent, useEffect, useState } from "react";
import FormInput from "../formTextInput";
import {
  days,
  emailRegex,
  ExpertNames,
  Experts,
  secondsInDay,
} from "@/constants/constants";
import { useScreenSize } from "@/hooks/useScreenSize";
import toast from "react-hot-toast";
import Selection from "../Selection";

interface Props {
  todayValue: Date;
  weekStartValue: Date;
  weekEndValue: Date;
  reservations:
    | {
        start: Date;
        end: Date;
        expertId: Experts;
      }[]
    | null;
}

function BookAppointment({
  todayValue,
  weekStartValue,
  weekEndValue,
  reservations,
}: Props) {
  const t = useTranslations();
  const { isMobile } = useScreenSize();

  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTime, setSelectedTime] = useState<{
    date: Date;
    startTime: string;
    endTime: string;
    experts: Experts[];
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

  async function createReservation(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const customerName = formData.get("customerName") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const selectedExpertId = formData.get("selectedExpert") as string;

    if (!customerName && !phone && !email && !selectedExpertId) {
      return;
    }

    if (!customerName || !phone || !selectedExpertId) {
      toast.error(t("Appointment.Error.fillAllFields"));
      return;
    }

    if (email && !emailRegex.test(email)) {
      toast.error(t("Common.invalidEmail"));
      return;
    }

    setLoading(true);

    try {
      await toast.promise(
        async () => {
          const res = await fetch("/api/calendar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: customerName,
              phone,
              email,
              startDateTime: `${
                selectedTime?.date.toISOString().split("T")[0]
              }T${selectedTime?.startTime}`,
              endDateTime: `${selectedTime?.date.toISOString().split("T")[0]}T${
                selectedTime?.endTime
              }`,
              expertId: selectedExpertId,
            }),
          });

          if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error);
          }

          setSelectedTime(null);

          if (reservations) {
            const newEvent = {
              start: new Date(
                `${selectedTime?.date.toISOString().split("T")[0]}T${
                  selectedTime?.startTime
                }`
              ),
              end: new Date(
                `${selectedTime?.date.toISOString().split("T")[0]}T${
                  selectedTime?.endTime
                }`
              ),
              expertId:
                selectedExpertId == Experts.GULCE.toString()
                  ? Experts.GULCE
                  : Experts.TUGCE,
            };

            reservations.push(newEvent);
          }
        },
        {
          loading: t("Appointment.loading"),
          success: t("Appointment.Success.created"),
          error: (err) => t(err.message),
        }
      );
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!reservations) {
      toast.error(t("Appointment.Error.notLoaded"));
    }
  }, [reservations, t]);

  return (
    <section
      id="appointment"
      className="relative flex flex-col items-center w-full px-[10%] py-16 bg-secondary -mt-10 max-2xl:px-[5%] max-md:-mt-0 max-md:py-8 max-md:overflow-hidden"
    >
      <div className="flex justify-between items-end w-full px-10 overflow-hidden max-2xl:px-0 max-md:flex-col-reverse max-md:items-center">
        <div className="flex flex-col max-md:items-center">
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
                      `Common.${new Intl.DateTimeFormat("en-US", {
                        month: "long",
                      })
                        .format(weekStart)
                        .toLowerCase()}`
                    )
                  : `${t(
                      `Common.${new Intl.DateTimeFormat("en-US", {
                        month: "long",
                      })
                        .format(weekStart)
                        .toLowerCase()}`
                    )} - ${t(
                      `Common.${new Intl.DateTimeFormat("en-US", {
                        month: "long",
                      })
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
          <div className="flex flex-col ml-[14%] max-md:ml-0">
            <div className="flex gap-2 items-center">
              <div className="bg-primary p-1 rounded-md">
                <div className="bg-[#C6A980] w-3 rounded-full aspect-square border-1 border-text" />
              </div>
              <p>{ExpertNames[0]}</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="bg-primary p-1 rounded-md">
                <div className="bg-[#D3BC9C] w-3 rounded-full aspect-square border-1 border-text" />
              </div>
              <p>{ExpertNames[1]}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center text-center mb-8 -mr-[10%] max-md:mr-0 max-md:mb-4">
          <h1 className="max-2xl:text-sm">- {t("Appointment.subtitle")} -</h1>
          <h2 className="text-4xl font-semibold italic max-2xl:text-3xl">
            {t("Appointment.title")}
          </h2>
          <p className="text-sm text-balance w-2/3 mt-3 opacity-80 max-2xl:text-xs max-md:w-full">
            {t("Appointment.info")}
          </p>
        </div>
      </div>

      <div className="flex flex-col w-full items-center max-md:overflow-auto max-md:items-start">
        <div className="grid grid-cols-7 gap-[2px] p-[2px] w-full mt-7 max-md:flex">
          {days.map((x, index) => {
            const day = new Date(weekStart.getTime() + index * secondsInDay);

            const isToday = day.toDateString() === todayValue.toDateString();

            return (
              <div
                key={index}
                className={`flex items-center justify-center font-medium gap-5 max-md:min-w-[120px] max-md:flex-shrink-0`}
              >
                {isToday && <div className="w-4 h-[2px] bg-primary" />}
                <div className="flex flex-col items-center justify-center max-2xl:text-sm">
                  <span>{day.getDate()}</span>
                  <span>{t(`Common.${x}`)}</span>
                </div>
                {isToday && <div className="w-4 h-[2px] bg-primary" />}
              </div>
            );
          })}
        </div>
        <motion.div
          className="w-full bg-secondary overflow-hidden max-md:w-[852px] max-md:pb-2"
          initial={{
            height: !isMobile ? "23vw" : "50vw",
          }}
          animate={{
            height: isExpanded ? "auto" : !isMobile ? "23vw" : "50vw",
          }}
          transition={{ duration: 0.7 }}
        >
          <div className="grid grid-cols-7 gap-[2px] p-[2px] max-md:flex-wrap max-md:w-[852px]">
            {Array.from({ length: 10 }).map((_, timeIndex) =>
              Array.from({ length: 7 }).map((_, dayIndex) => {
                const startHour = 10 + timeIndex;
                const startTime = `${startHour}:00`;
                const endTime = `${startHour}:45`;

                const date = new Date(
                  weekStart.getTime() + dayIndex * secondsInDay
                );
                date.setHours(startHour, 0, 0, 0);

                const threeHoursFromNow = new Date(
                  todayValue.getTime() + 3 * 60 * 60 * 1000
                );

                const oneMonthFromNow = new Date(
                  todayValue.getTime() + 30 * 24 * 60 * 60 * 1000
                );

                let isPastOrFuture = true;
                let isReserved = false;
                let isReservedForGulce = false;
                let isReservedForTugce = false;

                if (reservations) {
                  isPastOrFuture =
                    date < threeHoursFromNow || date > oneMonthFromNow;

                  const matchingReservations = reservations.filter(
                    (reservation) =>
                      reservation.start.toISOString().split("T")[0] ==
                        date.toISOString().split("T")[0] &&
                      (reservation.start.getHours() == startHour ||
                        (reservation.end.getHours() == startHour &&
                          reservation.end.getMinutes() !== 0))
                  );

                  isReservedForGulce = matchingReservations.some(
                    (r) => r.expertId === Experts.GULCE
                  );
                  isReservedForTugce = matchingReservations.some(
                    (r) => r.expertId === Experts.TUGCE
                  );

                  isReserved = isReservedForGulce && isReservedForTugce;
                }

                return (
                  <div
                    key={`${dayIndex}-${timeIndex}`}
                    className="relative w-full aspect-[2.2] flex flex-col items-center justify-center text-sm bg-primary max-md:min-w-[120px] max-md:flex-shrink-0"
                  >
                    <span className="absolute top-3 left-3 italic text-xs text-secondary max-md:top-1 max-md:left-1">
                      {startTime} - {endTime}
                    </span>
                    {!(isPastOrFuture || dayIndex === 6) &&
                      (!isReserved ? (
                        <div className="flex flex-col items-center gap-1">
                          <button
                            className="flex items-center gap-2 px-3 py-1 bg-secondary mt-6 rounded-sm max-2xl:text-xs max-md:mt-4 max-md:px-2"
                            onClick={() => {
                              const date = new Date(
                                weekStart.getTime() + dayIndex * secondsInDay
                              );
                              const startHour = 10 + timeIndex;
                              const startTime = `${startHour}:00`;
                              const endTime = `${startHour}:45`;

                              const experts = [];
                              if (!isReservedForGulce)
                                experts.push(Experts.GULCE);
                              if (!isReservedForTugce)
                                experts.push(Experts.TUGCE);

                              setSelectedTime({
                                date,
                                startTime,
                                endTime,
                                experts,
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
                          <div className="absolute top-3 right-3 flex gap-1 max-md:top-2 max-md:right-1 max-md:gap-px">
                            {!isReservedForGulce && (
                              <div className="bg-[#C6A980] w-3 rounded-full aspect-square border-1 border-text max-md:w-2" />
                            )}
                            {!isReservedForTugce && (
                              <div className="bg-[#D3BC9C] w-3 rounded-full aspect-square border-1 border-text max-md:w-2" />
                            )}
                          </div>
                        </div>
                      ) : (
                        <p className="opacity-70 mt-6 max-2xl:text-xs max-md:mt-4">
                          {t("Common.unavailable")}
                        </p>
                      ))}
                    {(isPastOrFuture || isReserved || dayIndex === 6) && (
                      <div className="absolute inset-0 z-10 bg-black/10" />
                    )}
                  </div>
                );
              })
            )}
          </div>
          {!isMobile && (
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
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`absolute bottom-0 left-0 flex justify-center w-full pt-10 mb-16 bg-gradient-to-t from-secondary to-transparent duration-500 z-10 max-md:mb-8 max-md:mx-[5vw] max-md:w-[90vw] ${
              isExpanded ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <HugeiconsIcon icon={ArrowDown01Icon} size={36} strokeWidth={1.5} />
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
            onClick={() => !loading && setSelectedTime(null)}
          >
            <div
              className="relative flex items-center justify-center bg-primary rounded-sm shadow-lg p-14 cursor-default max-md:px-10 max-md:w-[90%]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center w-full">
                <div className="flex items-center text-2xl font-medium mb-3 self-start max-2xl:text-xl max-md">
                  <HugeiconsIcon
                    icon={Appointment01Icon}
                    size={24}
                    strokeWidth={1.5}
                    className="max-2xl:size-5"
                  />
                  <span className="ml-2 italic">{t("Common.reserveForm")}</span>
                </div>
                <div className="flex flex-col items-start self-start ml-8">
                  <span>
                    <span className="font-medium mr-1 italic">
                      {t("Common.date")}:{" "}
                    </span>
                    {selectedTime.date.getDate()}{" "}
                    {t(
                      `Common.${selectedTime.date
                        .toLocaleString("en", {
                          month: "long",
                        })
                        .toLocaleLowerCase()}`
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
                    {selectedTime.startTime} - {selectedTime.endTime}
                  </span>
                </div>
                <div className="flex flex-col mt-10 max-md:w-full">
                  <form
                    className="flex flex-col items-center gap-4 max-md:w-full"
                    onSubmit={createReservation}
                  >
                    <div className="flex gap-4 min-w-[35vw] max-md:flex-col max-md:w-full">
                      <FormInput
                        label={"Common.name"}
                        name={"customerName"}
                        required
                      />
                      <FormInput
                        label={"Common.phone"}
                        name={"phone"}
                        type="tel"
                        required
                      />
                    </div>
                    <div className="flex gap-4 min-w-[35vw] max-md:flex-col max-md:w-full">
                      <FormInput
                        label={"Common.email"}
                        type="email"
                        name={"email"}
                      />
                      <Selection
                        options={selectedTime.experts.map((x) => ({
                          id: x,
                          name: ExpertNames[x],
                        }))}
                        label="Common.expert"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className={`flex items-center justify-center gap-2 bg-secondary px-4 py-2 rounded-sm w-full font-medium disabled:opacity-70 disabled:cursor-not-allowed`}
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
                onClick={() => !loading && setSelectedTime(null)}
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
