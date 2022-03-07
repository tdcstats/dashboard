import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import propTypes from "prop-types";

export default function StatTable({ data }) {
  const [page, setPage] = useState(1);

  const players = Object.values(data.players).sort((a, b) => {
    return b.wins + b.losses - (a.wins + a.losses);
  });

  return (
    <div className="tdc-grid">
      <div className="col-span-full text-center">Activity Board</div>
      <div className="stat place-items-center p-0 col-span-2 sm:col-span-full">
        <table className="table table-compact w-full">
          <thead className="sticky top-0 z-30">
            <tr>
              <th></th>
              <th className="text-xs sm:text-lg">Player</th>
              <th className="text-xs sm:text-lg">Wins</th>
              <th className="text-xs sm:text-lg">Losses</th>
            </tr>
          </thead>
          <tbody>
            {players.slice(page * 5 - 5, page * 5).map((player) => (
              <tr
                key={player.address}
                className="even:bg-neutral even:bg-opacity-40"
              >
                <th className="p-0 sm:p-1">
                  <Image
                    src={`https://services.tzkt.io/v1/avatars/${player.address}`}
                    alt=""
                    width={16}
                    height={16}
                    layout="responsive"
                  />
                </th>
                <td className="text-tiny sm:text-sm">
                  <Link href={`https://tzkt.io/${player.address}/operations`}>
                    {player.address}
                  </Link>
                </td>
                <td className="text-xs sm:text-sm">{player.wins}</td>
                <td className="text-xs sm:text-sm">{player.losses}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination page={page} setPage={setPage} players={data.unique} />
      </div>
    </div>
  );
}

StatTable.propTypes = {
  data: propTypes.object,
};

function TablePagination({ page, setPage, players }) {
  return (
    <div className="flex justify-end w-full mt-2 mb-4">
      <div className="btn-group">
        <button
          className="btn btn-sm"
          onClick={() => setPage(1)}
          disabled={page === 1 ? true : false}
        >
          «
        </button>
        <button
          className="btn btn-sm"
          onClick={() => setPage(page - 1)}
          disabled={page === 1 ? true : false}
        >
          ‹
        </button>
        <button className="btn btn-sm">{page}</button>
        <button
          className="btn btn-sm"
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(players / 5) ? true : false}
        >
          ›
        </button>
        <button
          className="btn btn-sm"
          onClick={() => setPage(Math.ceil(players / 5))}
          disabled={page === Math.ceil(players / 5) ? true : false}
        >
          »
        </button>
      </div>
    </div>
  );
}
TablePagination.propTypes = {
  page: propTypes.number,
  setPage: propTypes.func,
  players: propTypes.number,
};
