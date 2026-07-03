import localFont from "next/font/local";

/**
 * "Some Time Later" — the recreation of the SpongeBob timecard font.
 * Source: https://github.com/ctrlcctrlv/some-time-later (SIL OFL 1.1).
 * Self-hosted from public/fonts/ via next/font/local.
 */
export const someTimeLater = localFont({
  src: "../../public/fonts/SomeTimeLater.woff2",
  variable: "--font-timecard",
  display: "swap",
  weight: "400",
  style: "normal",
  preload: true,
});
