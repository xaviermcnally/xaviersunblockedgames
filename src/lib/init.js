import { searchEngines } from "../views/Settings";

export default function initLocalStorage() {
  if (localStorage.getItem("searchEngine") === null) {
    localStorage.setItem("searchEngine", "ddg");
    window.chemical.setStore("searchEngine", searchEngines.ddg);
  }
  if (localStorage.getItem("searchEngineFavicon") === null) {
    localStorage.setItem(
      "searchEngineFavicon",
      `/media/cloaks/${localStorage.getItem("searchEngine")}.png`
    );
  }
}
