export const buttonSize = "23px";
export const getMarkerSize = (zoom: number): number => {
  if (zoom >= 18) return (zoom - 6) * 2;
  return (zoom - 11) * 2;
};

export const getDeselectedImage = (size: number, color: string) =>
  `<svg viewBox="0 0 ${size} ${size}" width="${size}px" height="${size}px" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path d="M12 0a12 12 0 000 24-12-12 0 000-24zm7 6L6 19a1 1 0 01-1-1L18 5a1 1 0 011 1zM6 5l13 13a1 1 0 01-1 1L5 6a1 1 0 011-1z"/></svg>`;

export const getMarkerImage = (size: number, color: string) =>
  `<svg viewBox="0 0 ${size} ${size}" width="${size}px" height="${size}px" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path d="M12 0a12 12 0 000 24-12-12 0 000-24z"/></svg>`;

export const getLostBuildingMarkerImage = (size: number, color: string) =>
  `<svg viewBox="0 0 ${size} ${size}" width="${size}px" height="${size}px" stroke="${color}" strokeWidth="3" xmlns="http://www.w3.org/2000/svg"><path d="M12 0a12 12 0 000 24-12-12 0 000-24z"/></svg>`;

export const getMonumentMarkerImage = (size: number, color: string) =>
  `<svg viewBox="0 0 24 24" height="${size}" width="${size}" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path d="m7.00688,23.96521l1.85319,-20.32243l6.17733,0l1.8532,20.32243l-9.88372,0z"/><path d="m8.86844,3.61025l3.07629,-3.53295l3.07629,3.53295l-6.15258,0Z"/></svg>`;

export enum Theme {
  Light = "light",
  Dark = "dark",
}

// https://digitalherald.org/2021/01/hexcodes-for-heraldic-tinctures/
// https://digitalherald.org/wp-content/uploads/2021/01/Tincture-Hexcodes-Full.png
export const palette = {
  i: "gold",
  ii: "coral",
  iii: "crimson",
  iv: "deepskyblue",
  v: "royalblue",
  vi: "mediumslateblue",
  unknown: "darkseagreen",
  overlay: "#666666bf",
};
