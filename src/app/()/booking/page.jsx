"use client";
import axios from "axios";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Booking() {
  const router = useRouter();
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const fetchMovies = async () => {
    const {
      data: { results },
    } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    setMovies(results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  const handleMovieSelect = (movie) => {
    router.push(
      `/selection?id=${movie.id}&title=${encodeURIComponent(
        movie.title
      )}&backdrop_path=${encodeURIComponent(
        movie.backdrop_path
      )}&release_date=${movie.release_date}`
    );
  };

  return (
    <div className="w-full space-y-5">
      <div className="bg-[#D9D9D9] flex items-center px-5 py-2 rounded-lg w-1/2">
        <input
          type="text"
          className="bg-transparent outline-none w-full"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>
          <Search />
        </button>
      </div>
      <p className="font-bold text-xl">Good Morning Mr. Naval Ravikant !</p>
      <div className="grid grid-cols-3 gap-5 max-h-[550px] overflow-y-auto hide-scrollbar">
        {!filteredMovies.length && (
          <p className="text-lg font-bold col-span-3 text-center">
            No movies found
          </p>
        )}
        {filteredMovies.map((movie) => (
          <div
            className="flex flex-col space-y-3"
            key={movie.id}
            onClick={() => handleMovieSelect(movie)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
              alt=""
              className="w-full object-contain rounded-lg"
            />
            <p className="text-lg font-bold">
              {movie.title} ({movie.release_date.split("-")[0]})
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
