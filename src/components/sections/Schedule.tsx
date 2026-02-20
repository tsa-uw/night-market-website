import Section from "../layout/Section";

interface ScheduleEvent {
    time: string;
    title: string;
}

// TODO: Replace with actual schedule data
const SCHEDULE_EVENTS: ScheduleEvent[] = [
    { time: "00:00", title: "Event starts" },
    { time: "00:00", title: "Performance 1" },
    { time: "00:00", title: "Performance 2" },
    { time: "00:00", title: "Event ends" },
];

export default function Schedule() {
    return (
        <Section id="schedule" title="Entertainment Schedule">
            <div className="mx-auto max-w-2xl">
                {/* Timeline */}
                <ol className="relative border-l-2 border-blossom-400/40 pl-6">
                    {SCHEDULE_EVENTS.map(({ time, title }, i) => (
                        <li key={i} className="mb-8 last:mb-0">
                            {/* Dot on timeline */}
                            <span className="absolute -left-[9px] mt-1.5 h-4 w-4 rounded-full border-2 border-blossom-400 bg-night-900" />

                            <time className="text-sm font-semibold text-lantern-300">
                                {time}
                            </time>
                            <p className="mt-1 text-lg text-warm-white/80">
                                {title}
                            </p>
                        </li>
                    ))}
                </ol>
            </div>
        </Section>
    );
}
