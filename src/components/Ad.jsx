import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function Ad() {
  return <div>Ad</div>;
}

function BannerAd() {
  const adRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) return;

    const loadAds = () => {
      if (JSON.parse(localStorage.getItem("ads")) === true) {
        const atOptions = {
          key: "e9298e6dbe64bae2b443c38bd2d0bb8c",
          format: "iframe",
          height: 90,
          width: 728,
          params: {},
        };

        const script1 = document.createElement("script");
        script1.type = "text/javascript";
        script1.innerHTML = `atOptions = ${JSON.stringify(atOptions)};`;

        const script2 = document.createElement("script");
        script2.type = "text/javascript";
        script2.src =
          "//rethinkexercisesupplement.com/e9298e6dbe64bae2b443c38bd2d0bb8c/invoke.js";

        if (adRef.current) {
          adRef.current.innerHTML = ""; // Clear previous ads
          adRef.current.appendChild(script1);
          adRef.current.appendChild(script2);
        }
      }
    };

    loadAds();
  }, [location.pathname]); // Reload ads on route change

  if (import.meta.env.DEV) {
    return (
      <div
        className="m-5 border-2 border-dashed border-gray-400 text-gray-600"
        id="starlight-ad"
      >
        <p className="w-[728px] h-[90px] m-0 p-5">Ad Placeholder</p>
      </div>
    );
  }

  if (JSON.parse(localStorage.getItem("ads")) !== true) {
    return null;
  }

  return <div ref={adRef} id="starlight-ad" className="m-5"></div>;
}

function NativeBannerAd() {
  const adRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) return;

    const loadAds = () => {
      if (JSON.parse(localStorage.getItem("ads")) === true) {
        const script = document.createElement("script");
        script.async = true;
        script.setAttribute("data-cfasync", "false");
        script.src =
          "//rethinkexercisesupplement.com/e76624778e61e112831f9230df244d7e/invoke.js";

        if (adRef.current) {
          adRef.current.innerHTML = ""; // Clear previous ads
          adRef.current.appendChild(script);
        }
      }
    };

    loadAds();
  }, [location.pathname]); // Reload ads on route change

  if (import.meta.env.DEV) {
    return (
      <div
        className="m-5 border-2 border-dashed border-gray-400 text-gray-600"
        id="native-banner-ad"
      >
        <p className="w-full h-[90px] m-0 p-5">Native Banner Ad Placeholder</p>
      </div>
    );
  }

  if (JSON.parse(localStorage.getItem("ads")) !== true) {
    return null;
  }

  return (
    <div
      ref={adRef}
      id="container-e76624778e61e112831f9230df244d7e"
      className="m-5"
    ></div>
  );
}

export { Ad, BannerAd, NativeBannerAd };
