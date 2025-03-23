import React, { useRef, useState } from "react";
import {
  LuRotateCw,
  LuArrowLeft,
  LuArrowRight,
  LuHome,
  LuMaximize,
} from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { LucideSquareMousePointer } from "lucide-react";

function Go() {
  const navigate = useNavigate();
  const url = sessionStorage.getItem("lpurl");
  const [searchTerm, setSearchTerm] = useState("");
  const iframeRef = useRef(null);
  const [isInspectOpen, setisInspectOpen] = useState(false);
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

  async function handleOnSearch(e) {
    setSearchTerm(e.target.value);
    const encodedResult = await chemical.encode(e.target.value, {
      service: "uv",
      autoHttps: true,
      searchEngine: "https://www.google.com/search?q=%s",
    });
    sessionStorage.setItem("lpurl", encodedResult);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await handleOnSearch(e);
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
      <div className="navbar bg-base-300 background-filter z-2 relative transition-all">
        <div className="navbar-start gap-2 flex justify-end mr-5">
          <button className="btn btn-circle btn-primary" onClick={goBack}>
            <LuArrowLeft size={24} />
          </button>
          <button className="btn btn-circle btn-primary" onClick={goForward}>
            <LuArrowRight size={24} />
          </button>
          <button
            className="btn btn-circle btn-primary"
            onClick={refreshIframe}
          >
            <LuRotateCw size={24} />
          </button>
        </div>
        <div className="navbar-center gap-2 ">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="input input-bordered transition-width duration-300 w-[400px] focus:w-[420px] focus:input-primary"
              placeholder="Search For Something"
              value={searchTerm || sessionStorage.getItem("rawurl")}
              onChange={handleOnSearch}
            />
          </form>
        </div>
        <div className="navbar-end justify-start ml-5 gap-2">
          <button
            className="btn btn-circle btn-primary"
            onClick={() => navigate("/")}
          >
            <LuHome size={24} />
          </button>
          <button
            className="btn btn-circle btn-primary"
            onClick={enterFullscreen}
          >
            <LuMaximize size={24} />
          </button>
          <button className="btn btn-circle btn-primary" onClick={inspect}>
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
        <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 flex-col">
          <span className="loading loading-spinner text-primary text-7xl w-16"></span>
          <h1 className="text-3xl mt-3">Loading</h1>
        </div>
      </div>
    </>
  );
}

export default Go;
