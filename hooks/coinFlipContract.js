// Fetch pot balance for coin flip

import useSWR from "swr";
import { TezosToolkit } from "@taquito/taquito";

const Tezos = new TezosToolkit("https://rpc.tzbeta.net/");

const fetcher = (address) =>
  Tezos.tz.getBalance(address).then((balance) => balance.toNumber() / 1000000);

export default function CoinFlipContract() {
  const { data, error } = useSWR(
    "KT1NkWx47WzJeHCSyB62WjLtFn4tRf3uXBur",
    fetcher,
    { refreshInterval: 60000 }
  );
  if (error) return "An error has occurred.";
  if (!data) return null;

  return data;
}
