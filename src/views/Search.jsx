import { useEffect, useState, useRef } from "react";

import { LuSearch } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { BannerAd, NativeBannerAd } from "../components/Ad";
import { Helmet } from "react-helmet";
function Search() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const searchInputRef = useRef(null);
  const apps = [
    {
      name: "Chess",
      image: "/media/apps/chess.png",
      link: "https://www.chess.com",
    },
    {
      name: "Discord",
      image: "/media/apps/discord.jpeg",
      link: "https://discord.com/app",
    },
    {
      name: "GFN",
      image: "/media/apps/GFN.png",
      link: "https://www.geforce.com",
    },
    {
      name: "Google",
      image: "/media/apps/google.png",
      link: "https://www.google.com",
    },
    {
      name: "Netflix",
      image: "/media/apps/netflix.png",
      link: "https://www.netflix.com",
    },
    { name: "Now.gg", image: "/media/apps/nowgg.png", link: "https://now.gg" },
    {
      name: "Reddit",
      image: "/media/apps/reddit.png",
      link: "https://www.reddit.com",
    },
    {
      name: "Sflix",
      image: "/media/apps/sflix.png",
      link: "https://www.sflix.to",
    },
    {
      name: "Spotify",
      image: "/media/apps/spotify.png",
      link: "https://www.spotify.com",
    },
    {
      name: "Telegram",
      image: "/media/apps/Telegram.png",
      link: "https://telegram.org",
    },
    {
      name: "TikTok",
      image: "/media/apps/tiktok.jpg",
      link: "https://www.tiktok.com",
    },
    { name: "X", image: "/media/apps/x.jpg", link: "https://x.com" },
    {
      name: "YouTube",
      image: "/media/apps/youtube.jpg",
      link: "https://www.youtube.com",
    },
  ];

  function updateTime() {
    setTime(new Date().toLocaleTimeString());
  }
  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = async (term) => {
    if (!term.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const results = await chemical.getSuggestions(term);
      setSuggestions(results);
      setShowSuggestions(true);
    } catch (error) {
      console.error("Failed to fetch suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    fetchSuggestions(value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    handleOnSearch(suggestion);
  };

  async function handleOnSearch(term = searchTerm) {
    const encodedResult = await chemical.encode(term, {
      service: window.chemical.getStore("service") || "uv",
      autoHttps: true,
      searchEngine: chemical.getStore("searchEngine"),
    });
    navigate("/go");
    sessionStorage.setItem("lpurl", encodedResult);
    sessionStorage.setItem("rawurl", term);
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    handleOnSearch();
  }

  async function handleButton(link) {
    const encodedResult = await chemical.encode(link, {
      service: window.chemical.getStore("service") || "uv",
      autoHttps: true,
      searchEngine: chemical.getStore("searchEngine"),
    });
    navigate("/go");
    sessionStorage.setItem("rawurl", link);
    sessionStorage.setItem("lpurl", encodedResult);
  }

  return (
    <>
      {!localStorage.getItem("cloakFavicon") && (
        <Helmet>
          <title>Search - Starlight</title>
        </Helmet>
      )}
      <div className="flex flex-col justify-center items-center">
        <BannerAd />
        <h1 className="text-7xl font-bold transition-all">{time}</h1>
        <form
          onSubmit={handleOnSubmit}
          className="join items-center mt-5 relative"
          ref={searchInputRef}
        >
          <div className="join-item btn btn-lg btn-primary">
            <img
              src={
                localStorage.getItem("searchEngineFavicon") ||
                "/media/apps/google.png"
              }
              alt=""
              className="w-[25px]"
            />
          </div>
          <input
            value={searchTerm}
            onChange={handleInputChange}
            onFocus={() => searchTerm.trim() && setShowSuggestions(true)}
            type="text"
            className="input input-bordered input-lg transition-width duration-300 w-[500px] focus:w-[520px] focus:input-primary join-item"
            placeholder={`Search The web with ${
              localStorage.getItem("searchEngine") === "bing"
                ? "Bing"
                : localStorage.getItem("searchEngine") === "google"
                ? "Google"
                : localStorage.getItem("searchEngine") === "ddg"
                ? "DuckDuckGo"
                : localStorage.getItem("searchEngine") === "brave"
                ? "Brave"
                : localStorage.getItem("searchEngine")
            }`}
          />
          <button
            className="btn btn-lg btn-primary join-item rounded-r-field"
            type="submit"
          >
            <LuSearch size={24} />
          </button>
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 w-full mt-1 bg-base-200 rounded-lg shadow-lg z-50">
              <ul className="menu w-full">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="w-full">
                    <button
                      className="text-left px-4 py-2 hover:bg-base-300 w-full"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </form>
        <div className="flex mt-6 flex-wrap justify-center gap-5 w-[700px]">
          {apps.map((app, index) => {
            return (
              <button
                onClick={() => handleButton(app.link)}
                key={index}
                className="btn flex flex-col btn-ghost justify-center items-center h-[100px] w-[100px]"
              >
                <div className="flex flex-col justify-center items-center">
                  <img src={`${app.image}`} alt="" className="w-7 mb-3" />
                  {app.name}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Search;
