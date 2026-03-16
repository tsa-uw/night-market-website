import Section from "../layout/Section";

export default function EventTrailer() {
    return (
        <Section id="trailer" title="Event Trailer">
            <div className="mx-auto max-w-3xl">
                {/* TODO: Replace with actual embedded video */}
                <div className="aspect-video w-full overflow-hidden rounded-xl border border-crimson-600 bg-crimson-800">
                    <div className="flex h-full items-center justify-center text-warm-gold/75">
                        <p className="text-lg">Video coming soon</p>
                    </div>
                </div>
            </div>
        </Section>
    );
}
