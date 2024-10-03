export const buttonSize = "23px";

export const getMarkerSize = (zoom: number): number => {
  if (zoom === 18) return 32;
  if (zoom === 17) return 22;
  return zoom;
};
