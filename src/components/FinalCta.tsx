import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect } from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { openSubmitDialog } from "./SubmitCharityModal";
import collageFinalLeft from "@/assets/final-best-2-left.png";
import collageFinalRight from "@/assets/final-best-right.png";

const ease = [0.16, 1, 0.3, 1] as const;

export function FinalCta() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });
  const leftX = useTransform(smoothX, [-0.5, 0.5], [-22, 22]);
  const leftY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);
  const rightX = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const rightY = useTransform(smoothY, [-0.5, 0.5], [12, -12]);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      mouseX.set(event.clientX / window.innerWidth - 0.5);
      mouseY.set(event.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="install"
      className="relative flex h-[84svh] min-h-[540px] flex-col items-center justify-center overflow-hidden bg-paper px-4 text-ink sm:px-6 md:h-[82svh]"
    >
      {/* side collages */}
      <motion.img
        src={collageFinalLeft}
        alt=""
        aria-hidden
        style={{ x: leftX, y: leftY }}
        initial={{ opacity: 0, rotate: -4 }}
        whileInView={{ opacity: 1, rotate: -2 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease }}
        className="pointer-events-none absolute left-4 top-[4svh] z-20 h-auto w-[42vw] max-w-[210px] object-contain object-left-top mix-blend-multiply sm:left-3 sm:top-[5svh] sm:w-[34vw] sm:max-w-[350px] lg:left-5 lg:top-[6svh] lg:w-[32vw] lg:max-w-[560px]"
      />
      <motion.img
        src={collageFinalRight}
        alt=""
        aria-hidden
        style={{ x: rightX, y: rightY }}
        initial={{ opacity: 0, rotate: 4 }}
        whileInView={{ opacity: 1, rotate: 2 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease }}
        className="pointer-events-none absolute right-4 top-[4svh] z-20 h-auto w-[42vw] max-w-[210px] object-contain object-right-top mix-blend-multiply sm:right-3 sm:top-[5svh] sm:w-[34vw] sm:max-w-[350px] lg:right-5 lg:top-[6svh] lg:w-[32vw] lg:max-w-[560px]"
      />

      <div className="relative z-10 mx-auto flex max-w-2xl -translate-y-[4svh] flex-col items-center px-2 text-center sm:px-8">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="inline-block bg-ink px-5 py-2 font-stamp text-[0.65rem] font-medium uppercase tracking-[0.32em] text-paper sm:px-7 sm:py-2.5 sm:text-xs"
        >
          Ready when you are
        </motion.span>

        <h2 className="mt-4 font-display text-[clamp(1.9rem,8.4vw,5.5rem)] uppercase leading-[0.95] text-paper sm:mt-6">
          {["Start Giving", "Without Paying"].map((line, li) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span
                className="block"
                initial={{ y: "110%", rotate: 3 }}
                whileInView={{ y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.9, delay: li * 0.1, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          className="mx-auto mt-4 max-w-md px-2 text-sm leading-snug text-paper/90 sm:text-base md:text-lg"
        >
          Free forever, off in one tap, and you support a verified charity of your choice without spending one cent.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="mt-6 flex flex-row items-center justify-center gap-2 sm:gap-4"
        >
          <a
            href="#causes"
            data-cursor-hover
            className="rise-button group inline-flex whitespace-nowrap items-center gap-1.5 rounded-full border border-ink/15 bg-ink px-3 py-3 text-xs font-medium text-paper transition-transform duration-300 hover:scale-[1.03] sm:gap-3 sm:px-8 sm:py-3.5 sm:text-base md:text-lg"
          >
            <span aria-hidden className="rise-fill rise-fill--leaf" />
            <Download className="rise-label h-4 w-4 sm:h-5 sm:w-5" />
            <span className="rise-label">Install free</span>
          </a>
          <button
            type="button"
            onClick={openSubmitDialog}
            data-cursor-hover
            className="rise-button group inline-flex whitespace-nowrap items-center gap-1.5 rounded-full border border-paper/30 px-3 py-3 text-xs font-medium text-paper sm:gap-3 sm:px-8 sm:py-3.5 sm:text-base md:text-lg"
          >
            <span aria-hidden className="rise-fill rise-fill--paper" />
            <span className="rise-label transition-colors duration-500 group-hover:text-ink">Submit charity</span>
            <ArrowUpRight className="rise-label h-4 w-4 transition-colors duration-500 group-hover:text-ink sm:h-5 sm:w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}