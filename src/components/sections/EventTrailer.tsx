import Section from "../layout/Section";

export default function EventTrailer() {
    return (
        <Section id="trailer" title="Event Trailer">
            <div>
                {/* TODO: Replace with actual embedded video */}
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-black">
                    <div className="flex h-full items-center justify-center text-black/50">
                        <p className="text-lg">Video coming soon</p>
                    </div>
                </div>
            </div>
        </Section>
    );
}
