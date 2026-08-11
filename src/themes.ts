export const buttonSize = "23px";
export const getMarkerSize = (zoom: number): number => {
  if (zoom >= 18) return (zoom - 6) * 2;
  return (zoom - 11) * 2;
};

export const getDefaultBrowserTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches
    ? Theme.Dark
    : Theme.Light;

export const getDeselectedImage = (size: number, color: string) =>
  `<svg viewBox="0 0 ${size} ${size}" width="${size}px" height="${size}px" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path d="M12 0a12 12 0 000 24-12-12 0 000-24zm7 6L6 19a1 1 0 01-1-1L18 5a1 1 0 011 1zM6 5l13 13a1 1 0 01-1 1L5 6a1 1 0 011-1z"/></svg>`;

export const getMarkerImage = (size: number, color: string) =>
  `<svg viewBox="0 0 ${size} ${size}" width="${size}px" height="${size}px" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path d="M12 0a12 12 0 000 24-12-12 0 000-24z"/></svg>`;

export const getMonumentMarkerImage = (size: number, color: string) =>
  `<svg viewBox="0 0 24 24" height="${size}" width="${size}" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path d="m7.00688,23.96521l1.85319,-20.32243l6.17733,0l1.8532,20.32243l-9.88372,0z"/><path d="m8.86844,3.61025l3.07629,-3.53295l3.07629,3.53295l-6.15258,0Z"/></svg>`;

export enum Theme {
  Light = "light",
  Dark = "dark",
}

// https://digitalherald.org/2021/01/hexcodes-for-heraldic-tinctures/
// https://digitalherald.org/wp-content/uploads/2021/01/Tincture-Hexcodes-Full.png
export const palette = {
  periods: {
    i: "#640000",
    ii: "darkred",
    iii: "#B22222",
    iv: "#FF4500",
    v: "#ff9b00",
  },
  lost: {
    i: "#0575b4",
    ii: "#74add1",
    iii: "lightblue",
  },
  unknown: "gold",
  overlay: "var(--color-background)",
} as const;

export type MapStyle = {
  background: string;
  building: {
    fill: string;
    outline: string;
  };
  buildingNumber: {
    text: string;
    halo: string;
  };
  road: {
    line: string;
  };
  rail: {
    line: string;
  };
  water: {
    text: string;
    fill: string;
    waterway: string;
  };
  boundary: {
    line: string;
  };
  label: {
    text: string;
    halo: string;
  };
};

export const mapStyleDark: MapStyle = {
  background: "#0d0d0d",
  building: {
    fill: "#63666A", // medium gray
    outline: "#121212",
  },
  buildingNumber: {
    text: "#fffafade",
    halo: "#121212",
  },
  road: {
    line: "#27272A",
  },
  rail: {
    line: "#36454f", // charcoal gray
  },
  water: {
    text: "#B0C4DE", // light steel blue
    fill: "#003957", // cobalt blue
    waterway: "#003957",
  },
  boundary: {
    line: "#606263", // pewter
  },
  label: {
    text: "#fffafade",
    halo: "#121212",
  },
};

export const mapStyleLight: MapStyle = {
  background: "#F3F2ED",
  building: {
    fill: "#A9A9A9",
    outline: "#fff",
  },
  buildingNumber: {
    text: "#000000de",
    halo: "#fff",
  },
  road: {
    line: "#d8d2c8",
  },
  rail: {
    line: "#BDB76B",
  },
  water: {
    text: "#000080",
    fill: "#87CEFA", // sky blue
    waterway: "#87CEFA",
  },
  boundary: {
    line: "#ffffff",
  },
  label: {
    text: "#000000de",
    halo: "#ffffff",
  },
};
