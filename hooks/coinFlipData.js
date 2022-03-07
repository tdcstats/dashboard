// Fetches big map data from storage.
// Need to rework for pagination once there are more than 10k games

import useSWR from "swr";
import flipStats from "@/libs/flipStats";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function CoinFlipGameData() {
  const { data, error } = useSWR(
    `https://api.tzkt.io/v1/bigmaps/112443/keys?limit=10000`,
    fetcher,
    { refreshInterval: 60000 }
  );

  if (error) return "An error has occurred.";
  if (!data) return null;

  return flipStats(data);
}
