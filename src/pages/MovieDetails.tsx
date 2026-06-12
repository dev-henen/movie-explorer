import { useLocation, useNavigate, useParams } from "react-router-dom";
import type { MovieItem } from "../types/movie";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const movie = location.state?.movie as MovieItem | undefined;

  return (
    <div className="space-y-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-xl shadow-slate-950/20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-sky-400">Movie details</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">{movie?.title ?? "Movie details"}</h1>
          <p className="mt-2 text-sm text-slate-400">ID: {id}</p>
        </div>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="rounded-full bg-slate-700 px-4 py-2 text-sm text-slate-100 transition hover:bg-slate-600"
        >
          Back to list
        </button>
      </div>

      {movie ? (
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-4">
            <p className="text-sm text-slate-400">Directed by</p>
            <p className="text-xl font-semibold text-white">{movie.director || "Unknown"}</p>
            <p className="leading-7 text-slate-300">{movie.description || "No description available."}</p>
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/70 p-5">
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Genre</p>
              <p className="mt-2 text-lg text-slate-200">{movie.genres?.join(", ") || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Year</p>
              <p className="mt-2 text-lg text-slate-200">{movie.year ?? "N/A"}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-3xl border border-slate-800 bg-slate-950/70 p-8 text-center text-slate-300">
          <p className="text-lg font-semibold text-white">Movie details are not available.</p>
          <p className="mt-2 text-sm text-slate-400">Please navigate from the movie list to see details.</p>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
