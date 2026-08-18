import type { NextRequest } from "next/server";

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
}

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
}

export async function GET(
  _req: NextRequest,
  ctx: RouteContext<"/api/episode/[id]">
) {
  const { id } = await ctx.params;

  const episodeRes = await fetch(
    `https://rickandmortyapi.com/api/episode/${id}`
  );

  if (!episodeRes.ok) {
    return Response.json(
      { error: "Episode not found" },
      { status: episodeRes.status }
    );
  }

  const episode: Episode = await episodeRes.json();

  const ids = episode.characters.map((url) => url.split("/").pop()).join(",");
  const charRes = await fetch(
    `https://rickandmortyapi.com/api/character/${ids}`
  );

  if (!charRes.ok) {
    return Response.json(
      { error: "Failed to fetch characters" },
      { status: charRes.status }
    );
  }

  const charData = await charRes.json();
  const characters: Character[] = Array.isArray(charData)
    ? charData
    : [charData];

  characters.sort((a, b) => a.name.localeCompare(b.name));

  return Response.json({
    episode: {
      id: episode.id,
      name: episode.name,
      air_date: episode.air_date,
      episode: episode.episode,
    },
    characters,
  });
}
