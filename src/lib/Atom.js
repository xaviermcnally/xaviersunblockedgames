import { atom } from "recoil";

const Atom = atom({
  key: "theme",
  default: localStorage.getItem("theme") || "sunset",
});

export default Atom;
