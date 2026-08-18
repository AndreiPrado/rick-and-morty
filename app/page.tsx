"use client";

import { useState } from "react";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface EpisodeResult {
  episode: {
    id: number;
    name: string;
    air_date: string;
    episode: string;
  };
  characters: Character[];
}

export default function Home() {
  const [episodeId, setEpisodeId] = useState("");
  const [result, setResult] = useState<EpisodeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!episodeId.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const res = await fetch(`/api/episode/${episodeId.trim()}`);
    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Something went wrong");
    } else {
      setResult(data);
    }

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-16 px-4">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
          Rick and Morty — Episode Characters
        </h1>

        <form onSubmit={handleSearch} className="flex gap-3">
          <input
            type="text"
            min="1"
            value={episodeId}
            onChange={(e) => setEpisodeId(e.target.value)}
            placeholder="Episode number"
            className="flex-1 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-zinc-900 dark:text-zinc-50 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-zinc-900 dark:bg-zinc-50 px-6 py-2 font-medium text-white dark:text-zinc-900 transition-colors hover:bg-zinc-700 dark:hover:bg-zinc-200 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Search"}
          </button>
        </form>

        {error && (
          <p className="text-red-600 dark:text-red-400">{error}</p>
        )}

        {result && (
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
                {result.episode.name}
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {result.episode.episode} &bull; {result.episode.air_date}
              </p>
            </div>

            <ul className="flex flex-col gap-3">
              {result.characters.map((char) => (
                <li
                  key={char.id}
                  className="flex items-center gap-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3"
                >
                  <img
                    src={char.image}
                    alt={char.name}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-50">
                      {char.name}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {char.species} &bull; {char.status}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
