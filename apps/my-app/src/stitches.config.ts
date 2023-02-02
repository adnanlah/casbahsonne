import { gold, goldDark, goldDarkA } from "@radix-ui/colors";
import { createStitches } from "@stitches/react";

export const { styled, css, keyframes, globalCss } = createStitches({
  theme: {
    colors: {
      dark: goldDark.gold1,
      medium: gold.gold8,
      light: gold.gold6,
      white: goldDark.gold12,
    },
    fontSizes: {
      xs: ".6rem",
      s: ".8rem",
      m: "1rem",
      l: "1.2rem",
      xl: "1.4rem",
    },
    shadows: {
      dark: "rgba(10,10,10,.5)",
      medium: "rgba(10,10,10,.3)",
    },
    space: {
      // margin, padding, gap
      xs: ".25rem",
      s: ".5rem",
      m: ".75rem",
      l: "1rem",
      xl: "1.25rem",
    },
    sizes: {
      // width, height
      xs: ".25rem",
      s: ".5rem",
      m: ".75rem",
      l: "1rem",
      xl: "1.25rem",
    },
    radii: {
      xs: ".25rem",
      m: "1rem",
    },
  },
  utils: {
    bgImage: (value: string) => ({
      backgroundImage: `url(${value})`,
    }),
    w: (value: number | string) => ({
      width: value,
    }),
    h: (value: number | string) => ({
      height: value,
    }),
    size: (value: number | string) => ({
      width: value,
      height: value,
    }),
    minSize: (value: number | string) => ({
      width: value,
      minWidth: value,
      height: value,
      minHeight: value,
    }),
    rotate: (value: number) => ({
      transform: `rotate(${value}deg)`,
    }),
    t: (y: number | string) => ({
      top: y,
    }),
    l: (x: number | string) => ({
      left: x,
    }),
  },
});
