import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <div className="stat place-items-center pb-0">
      <div className="prose">
        <Link href={"https://tezosdegenclub.com"} passHref>
          <button>
            <h2 className="m-0">TEZOS DEGEN STATS</h2>
          </button>
        </Link>
      </div>
      <div className="tabs tabs-boxed">
        <a className={`tab tab-xs tab-active`}>Coin Flip</a>
        <div
          className="tooltip tooltip-right tooltip-info"
          data-tip="Coming Soon!"
        >
          <a className={`tab tab-xs`}>Degen Battles</a>
        </div>
      </div>
    </div>
  );
}
