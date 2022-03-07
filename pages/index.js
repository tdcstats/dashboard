import React from "react";
import Head from "next/head";
import StatDashboard from "@/components/StatDashboard";
import StatTable from "@/components/StatTable";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import useGames from "@/hooks/coinFlipData";

export default function Main() {
  const gameData = useGames();
  return (
    <>
      <Head>
        <title>Tezos Degen Club Stats</title>
      </Head>
      <div className="container mx-auto xl:px-60">
        <Header />
        {gameData && (
          <>
            <StatDashboard data={gameData} />
            <StatTable data={gameData} />
            <Footer />
          </>
        )}
      </div>
    </>
  );
}
