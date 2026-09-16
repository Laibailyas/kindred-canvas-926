import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type LegalDocument = "privacy" | "terms";

const DOCUMENTS: Record<LegalDocument, { label: string; title: string; description: string; sections: { heading: string; body: string }[] }> = {
  privacy: {
    label: "Privacy Policy",
    title: "Privacy policy",
    description: "How Dotis handles information while helping turn unused bandwidth into support for verified causes.",
    sections: [
      {
        heading: "What Dotis accesses",
        body: "Dotis uses only bandwidth you choose to share. It does not access your files, accounts, messages, passwords or browsing history. You can pause or turn off sharing at any time.",
      },
      {
        heading: "Information we receive",
        body: "We use the minimum information needed to operate Dotis, maintain service reliability, answer support requests and verify charities. We do not sell personal information or use your private activity to build advertising profiles.",
      },
      {
        heading: "Donations and transparency",
        body: "Funds generated through the network are directed to the verified charity you choose. You may request supporting donation records, receipts and confirmations at any time.",
      },
      {
        heading: "Your choices",
        body: "You can stop sharing, uninstall Dotis or contact us with a privacy question whenever you like. For help, email apply@dotis.ai.",
      },
    ],
  },
  terms: {
    label: "Terms of Use",
    title: "Terms of use",
    description: "The simple rules for using Dotis responsibly and supporting verified charities.",
    sections: [
      {
        heading: "Using Dotis",
        body: "Dotis is provided free of charge. You may use it on devices and networks you control, provided that your use is lawful and does not interfere with other people, services or networks.",
      },
      {
        heading: "Your responsibility",
        body: "You are responsible for keeping your device and network secure and for following the rules of your internet provider. Do not use Dotis to transmit unlawful, harmful or abusive traffic.",
      },
      {
        heading: "Charities and donations",
        body: "Charities and campaigns are reviewed before they are listed, but no review can guarantee a particular outcome. Donation records are provided by the relevant charity or campaign, and you can request proof of where generated funds went.",
      },
      {
        heading: "Changes and support",
        body: "We may update these terms as Dotis develops. Continued use after an update means you accept the revised terms. Questions can be sent to apply@dotis.ai.",
      },
    ],
  },
};

export function LegalFooter({ embedded = false }: { embedded?: boolean }) {
  const [document, setDocument] = useState<LegalDocument | null>(null);
  const activeDocument = document ? DOCUMENTS[document] : null;

  return (
    <>
      <footer
        className={`${embedded ? "absolute inset-x-0 bottom-0" : "relative"} z-30 px-5 pb-5 pt-4 text-paper sm:px-6 sm:pb-7 sm:pt-5 ${embedded ? "bg-transparent" : "border-t border-paper/10 bg-ink"}`}
      >
        <div className="mx-auto flex max-w-[1800px] flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-paper/75 sm:gap-x-10 sm:text-sm">
          <p>© 2026 dotis.ai</p>
          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {(Object.keys(DOCUMENTS) as LegalDocument[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setDocument(key)}
                className="transition-colors hover:text-paper"
              >
                {DOCUMENTS[key].label}
              </button>
            ))}
          </nav>
        </div>
      </footer>

      <Dialog open={document !== null} onOpenChange={(open) => !open && setDocument(null)}>
        <DialogContent className="max-h-[88svh] max-w-2xl overflow-y-auto rounded-3xl border-ink/10 bg-paper p-6 text-ink sm:p-8">
          {activeDocument && (
            <DialogHeader className="text-left">
              <span className="inline-block w-fit bg-tape px-4 py-1.5 font-stamp text-[0.6rem] uppercase tracking-[0.28em]">
                Dotis legal
              </span>
              <DialogTitle className="mt-4 font-display text-[clamp(1.7rem,5vw,2.6rem)] uppercase leading-[0.95]">
                {activeDocument.title}
              </DialogTitle>
              <DialogDescription className="text-sm leading-relaxed text-ink/70">
                {activeDocument.description}
              </DialogDescription>
              <div className="mt-5 grid gap-5 text-sm leading-relaxed text-ink/75 sm:text-base">
                {activeDocument.sections.map((section) => (
                  <section key={section.heading}>
                    <h3 className="font-stamp text-[0.62rem] uppercase tracking-[0.24em] text-ink/55">{section.heading}</h3>
                    <p className="mt-1.5">{section.body}</p>
                  </section>
                ))}
              </div>
            </DialogHeader>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
