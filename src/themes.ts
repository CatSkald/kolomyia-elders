export const buttonSize = "23px";
export const getMarkerSize = (zoom: number): number => {
  if (zoom >= 18) return (zoom - 6) * 2;
  return (zoom - 11) * 2;
};

export const getMarkerImage = (size: number, color: string) =>
  `<svg viewBox="0 0 ${size} ${size}" width="${size}px" height="${size}px" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path stroke="${palette.overlay}" strokeWidth="1" d="M12,1a9,9,0,0,0-9,9c0,8,9,13,9,13s9-5,9-13A9,9,0,0,0,12,1Zm0,13a4,4,0,1,1,4-4A4,4,0,0,1,12,14Z"/></svg>`;

export const getMonumentMarkerImage = (size: number, color: string) =>
  `<svg viewBox="0 0 24 24" height="${size}" width="${size}" fill="${color}" xmlns="http://www.w3.org/2000/svg"><path d="m7.00688,23.96521l1.85319,-20.32243l6.17733,0l1.8532,20.32243l-9.88372,0z"/><path d="m8.86844,3.61025l3.07629,-3.53295l3.07629,3.53295l-6.15258,0z"/></svg>`;

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
