export default function Details() {
    return (
        <section id="details" className="px-8 py-16">

            <h2 className="mb-12 text-center font-display text-3xl font-bold tracking-wide text-black md:text-4xl">
                Event Details
            </h2>

            {/* About — full width */}
            <div className="mb-12">
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-black/40">About</p>
                <p className="text-base leading-relaxed text-black">
                    The UW Night Market is one of the largest student-run events at the University of Washington.
                </p>
                <p className="text-base leading-relaxed text-black">
                    Come celebrate its 26th year with cultural performances, fun games, delicious food, and raffle prizes.
                    It's free and open to all!
                </p>

            </div>

            <div className="grid gap-12 md:grid-cols-3">

                {/* When & Where */}
                <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-black/40">When &amp; Where</p>
                    <p className="text-base leading-relaxed text-black">Saturday, May 23, 2026</p>
                    <p className="text-base leading-relaxed text-black">4:30 – 10:00 PM</p>
                    <p className="mt-3 text-base leading-relaxed text-black">Red Square @ UW</p>
                    <p className="text-base leading-relaxed text-black/60">4063 Spokane Ln, Seattle, WA 98105</p>
                    {/* <iframe
                        title="Red Square, University of Washington"
                        src="https://maps.google.com/maps?q=Red+Square,+University+of+Washington,+Seattle,+WA+98105&output=embed&z=16"
                        width="100%"
                        className="mt-4 rounded"
                        style={{ border: 0, display: "block", height: "160px" }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    /> */}
                </div>

                {/* Getting There */}
                <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-black/40">Getting There</p>
                    <div className="space-y-2">
                        <p className="text-base leading-relaxed text-black">🚇 Light Rail Lines 1 &amp; 2 to U District Station</p>
                        <p className="text-base leading-relaxed text-black">🚌 Bus stops near campus</p>
                        <p className="text-base leading-relaxed text-black">🅿️ Free parking at East Campus Lots E1, E12, E18, E19</p>
                        <p className="text-base leading-relaxed text-black">🅿️ Limited paid parking at Central Plaza Garage</p>
                    </div>
                </div>

                {/* Accommodations */}
                <div>
                    <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-black/40">Accommodations</p>
                    <div className="space-y-2">
                        <p className="text-base leading-relaxed text-black">🚻 12 portable restrooms, 2 ADA-accessible</p>
                        <p className="text-base leading-relaxed text-black">ℹ️ Info booth next to Odegaard Library</p>
                        <p className="text-base leading-relaxed text-black">🐾 Animals must be leashed</p>
                        <p className="text-base leading-relaxed text-black">💳 Card &amp; Apple Pay only</p>
                    </div>
                </div>

            </div>

        </section>
    );
}
