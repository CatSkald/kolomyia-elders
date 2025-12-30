import AboutUs from "./AboutUs";
import Sources from "./Sources";

export const siteMap = [
  {
    title: "Мапа",
    path: "",
    getComponent: () => undefined,
  },
  {
    title: "Пошук",
    path: "?search",
    getComponent: () => undefined,
  },
  {
    title: "Про нас",
    path: "?about",
    getComponent: () => <AboutUs />,
  },
  {
    title: "Використані джерела",
    path: "?sources",
    getComponent: () => <Sources />,
  },
] as const;

export function getCurrentPage(): (typeof siteMap)[number] {
  const path = window.location.search;
  return siteMap.find((x) => x.path === path) ?? siteMap[0];
}
