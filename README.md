# Rick and Morty — Episode Characters

A Next.js app that lists all characters from a given Rick and Morty episode in alphabetical order.

## How it works

1. Enter an episode number in the input field and hit **Search**.
2. The app calls the internal route `/api/episode/:id`, which fetches episode data from the [Rick and Morty API](https://rickandmortyapi.com/) and retrieves all characters in parallel.
3. Characters are returned sorted alphabetically and displayed with their photo, species, and status.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS v4**
- **TypeScript**

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
