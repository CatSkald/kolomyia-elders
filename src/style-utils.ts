export const buttonSize = "23px";

export const getMarkerSize = (zoom: number): number => {
  if (zoom >= 17) return zoom * 2;
  return zoom - 5;
};
