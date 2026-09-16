import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Plus } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

const FAQS = [
  {
    q: "Does Dotis slow down my internet?",
    a: "No. Dotis only uses bandwidth you aren't using, and it steps aside the moment you stream, call or game. You can also cap it or pause it at any time.",
  },
  {
    q: "Is any of my personal data shared?",
    a: "Never. Dotis routes public web requests through spare bandwidth only. Your files, accounts, messages and browsing history are never accessed.",
  },
  {
    q: "How much does it cost me?",
    a: "Nothing. Dotis is free forever, off in one tap, and you support a verified charity of your choice without spending one cent. The value comes from enterprise clients paying for network access.",
  },
  {
    q: "Does Dotis work worldwide?",
    a: "Yes. Dotis works for people everywhere, with verified charities and projects across the world. You can choose a global cause or submit a charity in your own community for verification.",
  },
  {
    q: "Can I see proof of the donations?",
    a: "Yes. Everything shown on your Impact Dashboard is donated directly to your chosen charity, while our operating costs are covered separately. You can request receipts, transfer records and confirmations from the charity at any time.",
  },
  {
    q: "Why isn't Dotis on the Google Play or Apple App Store?",
    a: "Because we do not support big tech. We don't want to pay the companies that stand against our values, so Dotis is self-hosted (no Amazon) and distributed as an open-source download. No Google, no Apple, and no 30% cut taken out of donations. You download it straight from us, and the code is open for anyone to inspect.",
  },
  {
    q: "Can I submit my own charity or campaign?",
    a: "Yes. Anyone, anywhere in the world can submit a charity or start their own campaign. Once we verify the organisation you get your own Dotis link to share with your community. It's perfect for influencers, community leaders and local fundraisers.",
  },
  {
    q: "How are charities chosen?",
    a: "Only vetted, registered organisations make the whitelist. Each one is reviewed for financial transparency and reporting before it can receive a single donation.",
  },
  {
    q: "Can I switch causes or stop anytime?",
    a: "Yes. Change your cause whenever you like, pause sharing with one switch, or uninstall in seconds. Nothing is locked in.",
  },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-paper px-5 py-16 text-ink sm:px-6 sm:py-24 md:py-32">
      <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-9 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease }}
          className="lg:sticky lg:top-28 lg:self-start"
        >
          <span className="inline-block bg-tape px-6 py-2 font-stamp text-xs font-medium uppercase tracking-[0.32em]">
            Questions
          </span>
          <h2 className="mt-5 font-display text-[clamp(2.2rem,8.6vw,5rem)] leading-[0.92]">
            Everything
            <br />
            <span className="text-flare">worth asking</span>
          </h2>
          <p className="mt-5 max-w-sm text-base leading-relaxed text-ink/70 md:text-lg">
            Straight answers about speed, privacy and where the money lands.
          </p>
          <a
            href="mailto:apply@dotis.ai"
            className="mt-8 inline-block text-sm font-medium text-flare underline decoration-flare/40 underline-offset-4 transition-colors hover:text-ink hover:decoration-ink/40 md:text-base"
          >
            Have more questions? Reach out to us.
          </a>
        </motion.div>

        <ul className="border-t border-ink/12">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.li
                key={item.q}
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.65, delay: i * 0.05, ease }}
                className="border-b border-ink/12"
              >
                <button
                  type="button"
                  data-cursor-hover
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center gap-3 py-6 text-left sm:gap-6 sm:py-7"
                >
                  <span className="font-stamp text-xs tracking-[0.3em] text-ink/40">0{i + 1}</span>
                  <span
                    className={`flex-1 font-display text-[clamp(1.15rem,4.6vw,2.2rem)] uppercase leading-tight transition-colors duration-300 ${isOpen ? "text-flare" : "text-ink"}`}
                  >
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 135 : 0, backgroundColor: isOpen ? "oklch(0.585 0.221 30.5)" : "oklch(0.16 0.008 60 / 0.07)" }}
                    transition={{ duration: 0.4, ease }}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full sm:h-10 sm:w-10"
                  >
                    <Plus className={`h-5 w-5 ${isOpen ? "text-paper" : "text-ink/60"}`} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-7 pl-0 text-base sm:pl-12 leading-relaxed text-ink/70 md:text-lg">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
