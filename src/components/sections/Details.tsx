import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { about, details } from "../../styles/tokens";

export default function Details() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const card1Ref = useRef<HTMLDivElement>(null);
    const card2Ref = useRef<HTMLDivElement>(null);
    const card3Ref = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
    const { scrollYProgress: card1Progress } = useScroll({ target: card1Ref, offset: ["start end", "end start"] });
    const { scrollYProgress: card2Progress } = useScroll({ target: card2Ref, offset: ["start end", "end start"] });
    const { scrollYProgress: card3Progress } = useScroll({ target: card3Ref, offset: ["start end", "end start"] });

    // About: -15% to 15% (distinct from hero's 0% to 25%)
    const bgY    = useTransform(scrollYProgress,  [0, 1], ["-15%", "15%"]);
    // Cards: each with a unique range
    const card1Y = useTransform(card1Progress, [0, 1], ["-20%", "10%"]);
    const card2Y = useTransform(card2Progress, [0, 1], ["-8%",  "18%"]);
    const card3Y = useTransform(card3Progress, [0, 1], ["-25%", "5%"]);

    return (
        <div id="details" ref={sectionRef} className={details.outerWrapper}>

            {/* About */}
            <div className={about.wrapper}>
                <div className={about.bgWrap}>
                    <motion.img
                        src="/assets/nm 2025 puffle up.jpg"
                        alt=""
                        className={about.bg}
                        style={{ y: bgY }}
                    />
                </div>
                <div className={about.overlay} />
                <div className={about.content}>
                    <h2 className={about.heading}>About</h2>
                    <p className={about.body}>
                        The UW Night Market is one of the <strong>largest student-run events</strong> at the University of Washington.
                        Come celebrate its <strong>26th year</strong> with cultural performances, fun games, delicious food, and raffle prizes.
                        It's <strong>free and open to all!</strong>
                    </p>
                </div>
            </div>

            {/* Detail cards */}
            <div className={details.wrapper}>
                <div className={details.grid}>

                    {/* When & Where (exempt) */}
                    <div ref={card1Ref} className={details.card}>
                        <div className={details.cardBgWrap}>
                            <motion.img src="/assets/nm phe.jpg" alt="" className={details.cardBg} style={{ y: card1Y }} />
                        </div>
                        <div className={details.cardOverlay} />
                        <div className={details.cardContent}>
                            <p className={details.cardLabel}>When &amp; Where</p>
                            <p className={details.cardValue}>Saturday, May 23, 2026</p>
                            <p className={details.cardValue}>4:30 – 10:00 PM</p>
                            <p className={`mt-3 ${details.cardValue}`}>Red Square @ UW</p>
                            <a href="https://maps.google.com/?q=4063+Spokane+Ln,+Seattle,+WA+98105" target="_blank" rel="noopener noreferrer" className={`${details.cardValueMuted} underline`}>4063 Spokane Ln, Seattle, WA 98105</a>
                        </div>
                    </div>

                    {/* Getting There */}
                    <div ref={card2Ref} className={details.card}>
                        <div className={details.cardBgWrap}>
                            <motion.img src="/assets/nm parking.png" alt="" className={details.cardBg} style={{ y: card2Y }} />
                        </div>
                        <div className={details.cardOverlay} />
                        <div className={details.cardContent}>
                            <p className={details.cardLabel}>Getting There</p>
                            <div className={details.cardValueGroup}>
                                <p className={details.cardValue}><strong>Free parking</strong> at East Campus Lots E1, E12, E18, E19</p>
                                <p className={details.cardValue}>Limited paid parking at <strong>Central Plaza Garage</strong></p>
                                <p className={details.cardValue}><strong>Light Rail Lines 1 &amp; 2</strong> to U District Station</p>
                                <p className={details.cardValue}>Bus stops near campus</p>
                            </div>
                        </div>
                    </div>

                    {/* Accommodations */}
                    <div ref={card3Ref} className={details.card}>
                        <div className={details.cardBgWrap}>
                            <motion.img src="/assets/nm pay.jpg" alt="" className={details.cardBg} style={{ y: card3Y }} />
                        </div>
                        <div className={details.cardOverlay} />
                        <div className={details.cardContent}>
                            <p className={details.cardLabel}>Accommodations</p>
                            <div className={details.cardValueGroup}>
                                <p className={details.cardValue}><strong>12 portable restrooms</strong>, 2 ADA-accessible</p>
                                <p className={details.cardValue}>Info booth next to <strong>Odegaard Library</strong></p>
                                <p className={details.cardValue}>Animals must be leashed</p>
                                <p className={details.cardValue}><strong>Card &amp; Apple Pay only</strong></p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
