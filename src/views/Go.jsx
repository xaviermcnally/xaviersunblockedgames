import React, { useRef, useState, useEffect } from "react";
import {
  LuRotateCw,
  LuArrowLeft,
  LuArrowRight,
  LuSearch,
  LuHome,
  LuMaximize,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { LucideSquareMousePointer } from "lucide-react";
import { Helmet } from "react-helmet";

function Go() {
  const navigate = useNavigate();
  const url = sessionStorage.getItem("lpurl");
  const [searchTerm, setSearchTerm] = useState(
    sessionStorage.getItem("rawurl") || ""
  );
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const iframeRef = useRef(null);
  const searchInputRef = useRef(null);

  const [isInspectOpen, setisInspectOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.onload = () => {
        setIsLoading(false);
      };
    }
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
    handleSearch(suggestion);
  };

  const enterFullscreen = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    }
  };

  async function handleSearch() {
    if (!searchTerm.trim()) return;

    setIsLoading(true);
    try {
      const encodedResult = await chemical.encode(searchTerm, {
        service: window.chemical.getStore("service") || "uv",
        autoHttps: true,
        searchEngine: chemical.getStore("searchEngine"),
      });
      sessionStorage.setItem("lpurl", encodedResult);
      sessionStorage.setItem("rawurl", searchTerm);
      if (iframeRef.current) {
        iframeRef.current.src = encodedResult;
      }
    } catch (error) {
      console.error("Search failed:", error);
      setIsLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await handleSearch();
    await handleSearch();
  }

  const goBack = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.history.back();
    }
  };

  const goForward = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.history.forward();
    }
  };

  const refreshIframe = () => {
    if (iframeRef.current) {
      const iframe = iframeRef.current;
      iframe.src = iframe.src;
    }
  };

  const inspect = () => {
    if (isInspectOpen === false) {
      window.eruda.init();
      window.eruda.show();
      setisInspectOpen(true);
    } else {
      eruda.destroy();
      setisInspectOpen(false);
    }
  };

  return (
    <>
      {!localStorage.getItem("cloakFavicon") && (
        <Helmet>
          <title>Go - Starlight</title>
        </Helmet>
      )}
      <div className="navbar bg-base-300 background-filter z-2 relative transition-all">
        <div className="navbar-start gap-2 flex justify-end mr-5">
          <button className="btn btn-circle btn-soft" onClick={goBack}>
            <LuArrowLeft size={24} />
          </button>
          <button className="btn btn-circle btn-soft" onClick={goForward}>
            <LuArrowRight size={24} />
          </button>
          <button className="btn btn-circle btn-soft" onClick={refreshIframe}>
            <LuRotateCw size={24} />
          </button>
        </div>
        <div className="navbar-center gap-2">
          <form
            onSubmit={handleSubmit}
            className="join relative"
            ref={searchInputRef}
          >
            <input
              type="text"
              className="input transition-width duration-300 w-[400px] focus:w-[420px] focus:input-primary join-item"
              placeholder="Search For Something"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={() => searchTerm.trim() && setShowSuggestions(true)}
            />
            <button type="submit" className="join-item btn btn-primary">
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
        </div>
        <div className="navbar-end justify-start ml-5 gap-2">
          <button
            className="btn btn-circle btn-soft"
            onClick={() => navigate("/")}
          >
            <LuHome size={24} />
          </button>
          <button className="btn btn-circle btn-soft" onClick={enterFullscreen}>
            <LuMaximize size={24} />
          </button>

          <button className="btn btn-circle btn-soft" onClick={inspect}>
            <LucideSquareMousePointer />
          </button>
        </div>
      </div>
      <div className="w-screen h-screen fixed">
        <iframe
          ref={iframeRef}
          src={url}
          frameBorder="0"
          className="w-full h-full z-1 fixed"
        ></iframe>
        {isLoading && (
          <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 flex-col">
            <span className="loading loading-spinner text-primary text-7xl w-16"></span>
            <h1 className="text-3xl mt-3">Loading</h1>
          </div>
        )}
        {isLoading && (
          <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 flex-col">
            <span className="loading loading-spinner text-primary text-7xl w-16"></span>
            <h1 className="text-3xl mt-3">Loading</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default Go;
