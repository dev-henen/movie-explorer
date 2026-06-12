import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchMoviesByCategory } from "../api/movieApi";
import type { MovieItem } from "../types/movie";

const categories = ["action", "drama", "comedy", "sci-fi"];

const Home = () => {
  const [category, setCategory] = useState("action");
  const { data, isLoading, isError, refetch } = useQuery<MovieItem[], Error>({
    queryKey: ["movies", category],
    queryFn: () => fetchMoviesByCategory(category),
  });

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-sky-400">Movie Explorer</p>
            <h1 className="mt-2 text-3xl font-semibold text-white">Browse sample movies by category</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${item === category ? "bg-sky-500 text-slate-950" : "border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white"}`}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-400">Data is loaded from a sample public movie API.</p>
          <button
            type="button"
            onClick={() => refetch()}
            className="rounded-full bg-slate-700 px-4 py-2 text-sm text-slate-100 transition hover:bg-slate-600"
          >
            Refresh
          </button>
        </div>
      </section>

      <section className="grid gap-4">
        {isLoading ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-8 text-center text-slate-300">Loading movies...</div>
        ) : isError ? (
          <div className="rounded-3xl border border-rose-500/30 bg-rose-500/5 p-8 text-center text-rose-200">Unable to load movies. Try again later.</div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {data?.slice(0, 12).map((movie: MovieItem) => (
              <article key={movie.id ?? movie.title} className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-5 transition hover:border-slate-600 hover:bg-slate-900">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-400">{movie.genres?.join(" · ") || category}</p>
                    <h2 className="mt-2 text-xl font-semibold text-white">{movie.title}</h2>
                  </div>

                  <p className="text-sm leading-6 text-slate-300 line-clamp-3">{movie.description || "No description available."}</p>

                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                      {movie.year ?? "Year N/A"}
                    </span>
                    <Link
                      to={`/movie/${movie.id ?? encodeURIComponent(movie.title)}`}
                      state={{ movie }}
                      className="text-sm font-semibold text-sky-400 transition hover:text-sky-300"
                    >
                      View details →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
