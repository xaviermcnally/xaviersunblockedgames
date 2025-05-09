import React from "react";
import games from "../assets/games.json";
import Fuse from "fuse.js";
import { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import { BannerAd } from "../components/Ad";
import { useNavigate } from "react-router-dom";
import { LuGamepad2 } from "react-icons/lu";
import { Helmet } from "react-helmet";
import { Suspense } from "react";

function Games() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const fuse = new Fuse(games, {
    keys: ["name"],
  });

  const results = fuse.search(searchTerm);
  const filteredGames = searchTerm
    ? results.map((result) => result.item)
    : games;

  function handleOnSearch(e) {
    setSearchTerm(e.target.value);
  }

  async function handleClick(game) {
    if (game.proxy) {
      const encodedResult = await chemical.encode(game.url, {
        service: window.chemical.getStore("service") || "uv",
        autoHttps: true,
      });
      sessionStorage.setItem("lpurl", encodedResult);
      sessionStorage.setItem("rawurl", game.name);
      navigate("/go");
    } else {
      navigate(`/play/${game.url}`);
    }
  }

  return (
    <>
      {!localStorage.getItem("cloakFavicon") && (
        <Helmet>
          <title>Games - Starlight</title>
        </Helmet>
      )}

      <div className="flex flex-col justify-center items-center">
        <LuGamepad2 size={35} className="m-2" />
        <h1 className="text-3xl font-bold">Games</h1>
        <input
          type="text"
          className="input input-bordered mt-5 transition-width duration-300 w-[330px] focus:w-[355px] focus:input-primary input-lg text-center"
          placeholder={`Search ${games.length} Games`}
          value={searchTerm}
          onChange={handleOnSearch}
        />
        <BannerAd />

        <div className="games flex flex-wrap m-0 justify-center gap-4 mt-5 ">
          {filteredGames.map((game) => {
            const gameImage = game.proxy
              ? `/media/games/${game.image}`
              : `/cdn/${game.url}/${game.image}`;

            return (
              <div
                className="card flex flex-col justify-center items-center flex-shrink-0 w-[200px] h-[300px] "
                key={game.name}
              >
                <LazyLoadImage
                  src={gameImage}
                  alt={game.name}
                  width="200px"
                  loading="lazy"
                  effect="opacity"
                  height="200px"
                  onClick={() => handleClick(game)}
                  className="rounded-3xl min-h-[200px] min-w-[200px] max-h-[200px] max-w-[200px] transition-all hover:scale-95
"
                />
                <p className="mt-2 font-bold">{game.name}</p>
                <div className="flex flex-row gap-2">
                  {game.new && <p className="badge badge-primary">NEW</p>}
                  {game.top && <p className="badge badge-primary">🔥</p>}
                  {game.exp && <p className="badge badge-primary">🧪</p>}
                  {game.updated && (
                    <p className="badge badge-primary">🆕 Updated</p>
                  )}
                </div>
              </div>
            );
          })}
          {filteredGames.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl font-bold">No games found</p>
              <p className="text-lg">Try searching for something else.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Games;
