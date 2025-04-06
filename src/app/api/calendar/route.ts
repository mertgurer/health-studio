import { calendar_v3, google } from "googleapis";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, phone, startDateTime, endDateTime } = body;

        const credentials = JSON.parse(
            process.env.GOOGLE_CALENDAR_CREDENTIALS ?? ""
        );

        const auth = new google.auth.JWT({
            email: credentials.client_email,
            key: credentials.private_key.replace(/\\n/g, "\n"),
            scopes: ["https://www.googleapis.com/auth/calendar"],
        });

        const calendar = google.calendar({ version: "v3", auth });
        const calendarId = process.env.GOOGLE_CALENDAR_ID;

        const startDate = new Date(startDateTime);
        const oneMonthFromNow = new Date();
        oneMonthFromNow.setDate(oneMonthFromNow.getDate() + 30);

        if (startDate > oneMonthFromNow) {
            return NextResponse.json(
                { error: "Appointment.Error.monthLimit" },
                { status: 409 }
            );
        }

        const isAvailable = await checkAvailability(
            calendar,
            calendarId,
            startDateTime,
            endDateTime
        );
        if (!isAvailable) {
            return NextResponse.json(
                { error: "Appointment.Error.timeSlotNotAvailable" },
                { status: 409 }
            );
        }

        const event = {
            summary: `Appointment with ${name}`,
            description: `- Booked by: ${name}\n- Phone: ${phone}\n- Email: ${email}`,
            start: {
                dateTime: new Date(`${startDateTime}`).toISOString(),
                timeZone: "Europe/Istanbul",
            },
            end: {
                dateTime: new Date(`${endDateTime}`).toISOString(),
                timeZone: "Europe/Istanbul",
            },
        };

        await calendar.events.insert({
            calendarId,
            requestBody: event,
        });

        return NextResponse.json({ message: "Event created" });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Appointment.Error.failed" },
            { status: 500 }
        );
    }
}

export async function GET() {
    try {
        const credentials = JSON.parse(
            process.env.GOOGLE_CALENDAR_CREDENTIALS ?? ""
        );

        const auth = new google.auth.JWT({
            email: credentials.client_email,
            key: credentials.private_key.replace(/\\n/g, "\n"),
            scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
        });

        const calendar = google.calendar({ version: "v3", auth });
        const calendarId = process.env.GOOGLE_CALENDAR_ID;

        const now = new Date();
        const nextMonth = new Date();
        nextMonth.setMonth(now.getMonth() + 1);

        const response = await calendar.events.list({
            calendarId,
            timeMin: now.toISOString(),
            timeMax: nextMonth.toISOString(),
            singleEvents: true,
            orderBy: "startTime",
        });

        const events = (response.data.items || []).map((event) => ({
            start: event.start?.dateTime,
            end: event.end?.dateTime,
        }));

        return NextResponse.json({ events });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch events" },
            { status: 500 }
        );
    }
}

async function checkAvailability(
    calendar: calendar_v3.Calendar,
    calendarId: string | undefined,
    startDateTime: string,
    endDateTime: string
) {
    try {
        const events = await calendar.events.list({
            calendarId,
            timeMin: new Date(startDateTime).toISOString(),
            timeMax: new Date(endDateTime).toISOString(),
            singleEvents: true,
            orderBy: "startTime",
        });

        for (const event of events.data.items || []) {
            if (!event.start?.dateTime || !event.end?.dateTime) continue;
            const eventStart = new Date(event.start.dateTime);
            const eventEnd = new Date(event.end.dateTime);

            const requestedStart = new Date(startDateTime);
            const requestedEnd = new Date(endDateTime);

            if (requestedStart < eventEnd && requestedEnd > eventStart) {
                return false;
            }
        }

        return true;
    } catch (error) {
        console.error("Error checking availability:", error);
        return false;
    }
}
