import {
  Fraunces,
  Inter,
  Space_Grotesk,
  IBM_Plex_Sans,
  JetBrains_Mono,
  Anton,
  Rubik,
  Baloo_2,
  Manrope,
} from "next/font/google";

export const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "optional",
  preload: false,
});

export const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  display: "optional",
  preload: false,
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "optional",
  preload: false,
});

export const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "optional",
  preload: false,
});

export const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  display: "optional",
  preload: false,
});

export const baloo2 = Baloo_2({
  subsets: ["latin", "devanagari"],
  variable: "--font-baloo2",
  display: "optional",
  preload: false,
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "optional",
  preload: false,
});
