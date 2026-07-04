export interface BackgroundImage {
  /** Stable key used in state and filenames. */
  id: string;
  /** Human-friendly name shown in the picker. */
  label: string;
  /** Full-size image served from /public. */
  src: string;
  /** Optional smaller image for the picker grid; falls back to `src`. */
  thumbnailSrc?: string;
  /** Optional attribution shown in the UI. */
  credit?: string;
}

/**
 * Background manifest. To add a background, drop the image file into
 * `public/backgrounds/` and add a matching entry here — no other code changes.
 * Images should be reasonably high-resolution (they are center-cropped with
 * `object-cover` to whatever aspect ratio the user selects).
 */
export const BACKGROUNDS: BackgroundImage[] = [
  { id: "enemy-in-law", label: "Enemy In-Law", src: "/backgrounds/enemy-in-law-background.jpg" },
  { id: "hall-monitor", label: "Hall Monitor", src: "/backgrounds/hall-monitor-background.jpg" },
  { id: "jellyfish-jam", label: "Jellyfish Jam", src: "/backgrounds/jellyfish-jam-background.jpg" },
  { id: "krabs-vs-plankton", label: "Krabs vs. Plankton", src: "/backgrounds/krabs-vs-plankton-background.png" },
  { id: "lame-and-fortune", label: "Lame and Fortune", src: "/backgrounds/lame-and-fortune-background.png" },
  { id: "little-yellow-book", label: "Little Yellow Book", src: "/backgrounds/little-yellow-book-titlecard-background.png" },
  { id: "married-to-money", label: "Married to Money", src: "/backgrounds/married-to-money-background.png" },
  { id: "night-light", label: "Night Light", src: "/backgrounds/night-light-background.jpg" },
  { id: "pickles", label: "Pickles", src: "/backgrounds/pickles-background-v2.jpg" },
  { id: "pineapple-invasion", label: "Pineapple Invasion", src: "/backgrounds/pineapple-invasion-background.png" },
  { id: "pizza-delivery", label: "Pizza Delivery", src: "/backgrounds/pizza-delivery-background.jpg" },
  { id: "ripped-pants", label: "Ripped Pants", src: "/backgrounds/ripped-pants-background.png" },
  { id: "selling-out", label: "Selling Out", src: "/backgrounds/selling-out-background.jpg" },
  { id: "spongebob-youre-fired", label: "SpongeBob You're Fired", src: "/backgrounds/spongebob-you-re-fired-background.png" },
  { id: "the-check-up", label: "The Check-Up", src: "/backgrounds/the-check-up-background.png" },
  { id: "the-grill-is-gone", label: "The Grill Is Gone", src: "/backgrounds/the-grill-is-gone.png" },
  { id: "the-night-patty", label: "The Night Patty", src: "/backgrounds/the-night-patty.png" },
  { id: "the-string", label: "The String", src: "/backgrounds/the-string.png" },
  { id: "the-thing", label: "The Thing", src: "/backgrounds/the-thing-background.png" },
  { id: "tutor-sauce", label: "Tutor Sauce", src: "/backgrounds/tutor-sauce-background.png" },
  { id: "two-thumbs-down", label: "Two Thumbs Down", src: "/backgrounds/two-thumbs-down-background.png" },
  { id: "welcome-to-the-chum-bucket", label: "Welcome to the Chum Bucket", src: "/backgrounds/welcome-to-the-chum-bucket-background.jpg" },
  { id: "whale-watching", label: "Whale Watching", src: "/backgrounds/whale-watching.png" },
  { id: "wigstruck", label: "Wigstruck", src: "/backgrounds/wigstruck-background.jpg" },
];

export const DEFAULT_BACKGROUND_ID = BACKGROUNDS[0].id;

export function getBackground(id: string): BackgroundImage {
  return BACKGROUNDS.find((bg) => bg.id === id) ?? BACKGROUNDS[0];
}
