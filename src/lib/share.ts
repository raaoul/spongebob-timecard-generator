export type SharePlatform = "twitter" | "facebook" | "reddit";

export interface ShareTarget {
  platform: SharePlatform;
  label: string;
}

export const SHARE_TARGETS: ShareTarget[] = [
  { platform: "twitter", label: "X / Twitter" },
  { platform: "facebook", label: "Facebook" },
  { platform: "reddit", label: "Reddit" },
];

/**
 * Build a web share-intent URL for the given platform.
 *
 * NOTE: With no backend, these intents can only carry text + a link — they
 * CANNOT attach the generated image file. The UX is therefore: download the
 * PNG first, then use one of these to open the composer with text prefilled,
 * and attach the downloaded image manually.
 */
export function buildShareUrl(
  platform: SharePlatform,
  { text, url }: { text: string; url: string }
): string {
  switch (platform) {
    case "twitter":
      return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        text
      )}&url=${encodeURIComponent(url)}`;
    case "facebook":
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}&quote=${encodeURIComponent(text)}`;
    case "reddit":
      return `https://www.reddit.com/submit?url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(text)}`;
  }
}
