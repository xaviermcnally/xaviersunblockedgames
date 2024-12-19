import React, { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import Atom from "../lib/Atom.js";
import { BannerAd, NativeBannerAd } from "../components/Ad.jsx";

function Settings() {
  const adsstate = () => JSON.parse(localStorage.getItem("ads")) ?? true;
  const setTheme = useSetRecoilState(Atom);
  const [selectedCloak, setSelectedCloak] = useState("default");
  const [ads, setAds] = useState(adsstate());
  const [searchEngine, setSearchEngine] = useState(
    localStorage.getItem("searchEngine") || "google"
  );

  useEffect(() => {
    localStorage.setItem("ads", JSON.stringify(ads));
  }, [ads]);

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleCloakChange = (e) => {
    setSelectedCloak(e.target.value);
    localStorage.setItem("cloak", e.target.value);
  };

  const handleAdsChange = (e) => {
    const isChecked = e.target.checked;
    setAds(isChecked);
    localStorage.setItem("ads", JSON.stringify(isChecked));
    window.location.reload();
  };

  const handleSearchEngineChange = (e) => {
    const newEngine = e.target.value;
    setSearchEngine(newEngine);
    localStorage.setItem("searchEngine", newEngine);

    // Example URL templates
    const searchEngines = {
      google: "https://www.google.com/search?q=%s",
      bing: "https://www.bing.com/search?q=%s",
      ddg: "https://duckduckgo.com/?q=%s",
    };

    chemical.setStore("searchEngine", searchEngines[newEngine]);
  };

  useEffect(() => {
    if (selectedCloak !== "default") {
      const cloak = cloaks.find((cloak) => cloak.name === selectedCloak);
      if (cloak) {
        window.cloak.setFavicon(cloak.icon);
        localStorage.setItem("cloakFavicon", cloak.icon);
        window.cloak.setTitle(cloak.title);
        localStorage.setItem("cloakTitle", cloak.title);
      }
    }
  }, [selectedCloak]);

  return (
    <div className="flex flex-col justify-center items-center flex-wrap gap-3">
      <h1 className="text-3xl font-bold mb-3">Settings</h1>
      <BannerAd />
      <div className="flex flex-wrap gap-4 justify-center">
        <Card title="Themes" description="Change the theme on Starlight.">
          <select
            className="select select-bordered w-full"
            onChange={handleThemeChange}
            value={localStorage.getItem("theme")}
          >
            <option value="sunset">Default</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="cupcake">Cupcake</option>
            <option value="lunaar">Lunaar</option>
            <option value="bumblebee">Bumblebee</option>
            <option value="emerald">Emerald</option>
            <option value="corporate">Corporate</option>
            <option value="halloween">Halloween</option>
          </select>
        </Card>
        <Card
          title="About:blank"
          description="Opens Starlight in an About:blank. page"
        >
          <button
            className="btn btn-primary w-full"
            onClick={() => window.cloak.aboutBlank()}
          >
            Launch
          </button>
        </Card>
        <Card title="Cloak" description="Change the cloak on Starlight.">
          <select
            name="cloak"
            defaultValue=""
            data-cloak-select=""
            className="select select-bordered w-full"
            onChange={handleCloakChange}
            value={localStorage.getItem("cloak")}
          >
            <option value="">None </option>
            <option value="drive">Google Drive </option>
            <option value="edpuzzle">Edpuzzle </option>
            <option value="wikipedia">Wikipedia </option>
            <option value="canvas">Canvas </option>
            <option value="classroom">Classroom </option>
            <option value="zoom">Zoom </option>
          </select>
          <div className="mt-3">
            <button className="btn btn-primary" onClick={window.cloak.reset}>
              Reset Cloak
            </button>
          </div>
          {/* Positioning the link at the bottom */}
          <div className="mt-auto text-center pt-3">
            <a
              className="text-xs text-neutral-content opacity-40"
              href="https://github.com/parcoil/cloak"
            >
              Powered by cloak.js
            </a>
          </div>
        </Card>
        <Card
          title="Search Engine"
          description="Changes the search engine that Starlight uses"
        >
          <select
            className="select select-bordered w-full"
            onChange={handleSearchEngineChange}
            value={searchEngine}
          >
            <option value="google">Google</option>
            <option value="bing">Bing</option>
            <option value="ddg">DuckDuckGo</option>
          </select>
        </Card>
        <Card
          title="Ads (Adsterra)"
          description="Toggles the ads on Starlight"
          E="(starlight needs money to run)"
        >
          <input
            type="checkbox"
            className="toggle toggle-primary toggle-lg"
            checked={ads}
            onChange={handleAdsChange}
          />
        </Card>
      </div>
      <NativeBannerAd />
    </div>
  );
}

function Card({ title, description, children, E }) {
  return (
    <div className="bg-base-300 p-4 w-[300px] h-[300px] rounded-btn flex flex-col flex-wrap">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p>{description}</p>
        <p className="text-red-600">{E}</p>
        <div className="justify-end pt-3">{children}</div>
      </div>
    </div>
  );
}

export default Settings;
