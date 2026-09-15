import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SubmissionSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(180),
  charityName: z.string().min(1).max(160),
  website: z.string().max(200).optional().default(""),
  instagram: z.string().max(200).optional().default(""),
  x: z.string().max(200).optional().default(""),
  tiktok: z.string().max(200).optional().default(""),
  region: z.string().min(1).max(80),
  category: z.string().min(1).max(80),
  message: z.string().max(1200).optional().default(""),
  terms: z.literal(true),
});

const NOTIFY_TO = "apply@dotis.ai";

export const submitCharity = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => SubmissionSchema.parse(input))
  .handler(async ({ data }) => {
    const rows: [string, string][] = [
      ["Contact name", data.name],
      ["Email", data.email],
      ["Charity / campaign", data.charityName],
      ["Website", data.website],
      ["Instagram", data.instagram],
      ["X", data.x],
      ["TikTok", data.tiktok],
      ["Region", data.region],
      ["Category", data.category],
      ["Message", data.message],
    ];

    const formData = new URLSearchParams({
      _subject: `Dotis charity submission - ${data.charityName}`,
      _template: "table",
      _captcha: "false",
      _replyto: data.email,
      ...Object.fromEntries(rows),
    });

    const response = await fetch(`https://formsubmit.co/ajax/${NOTIFY_TO}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const result = (await response.json().catch(() => null)) as { success?: boolean | string; message?: string } | null;

    if (!response.ok) {
      const message = result?.message || `HTTP ${response.status}`;
      console.error(`FormSubmit request failed [${response.status}]: ${message}`);
      throw new Error(`Could not send the submission: ${message}`);
    }

    if (result?.success !== true && result?.success !== "true") {
      const message = result?.message || "FormSubmit did not accept the submission.";
      console.error(`FormSubmit rejected the submission: ${message}`);
      throw new Error(message);
    }

    return { ok: true as const, delivered: true as const };
  });
