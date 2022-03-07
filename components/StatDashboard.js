import React from "react";
import Link from "next/link";
import propTypes from "prop-types";
import useBalance from "@/hooks/coinFlipContract";
import { fmtAddress, fmtNum } from "@/libs/helpers";

export default function StatDashboard({ data }) {
  const potBalance = useBalance();

  return (
    <div className="tdc-grid">
      <div className="stat stat-box">
        <div className="stat-title">Games Played</div>
        <div className="stat-value">{fmtNum(data.games)}</div>
      </div>

      <div className="stat stat-box">
        <div className="stat-title">XTZ Flipped</div>
        <div className="stat-value">{fmtNum(data.flipped / 1000000)} ꜩ</div>
      </div>

      <div className="stat stat-box">
        <div className="stat-title">Current Pot</div>
        <div className="stat-value">{fmtNum(potBalance)} ꜩ</div>
      </div>

      <div className="stat stat-box">
        <div className="stat-title">Total Platform Fees</div>
        <div className="stat-value">{fmtNum(data.fees / 100)} ꜩ</div>
      </div>

      <div className="stat stat-box">
        <div className="stat-title">TDC Fees Share</div>
        <div className="stat-value">{data.tdcFees / 100} ꜩ</div>
        <div className="stat-desc">
          {fmtNum((data.tdcFees / data.fees) * 100)}%
        </div>
      </div>

      <div className="stat stat-box">
        <div className="stat-title">Pot Fees Share</div>
        <div className="stat-value">{data.potFees / 100} ꜩ</div>
        <div className="stat-desc">
          {fmtNum((data.potFees / data.fees) * 100)}%
        </div>
      </div>

      <div className="stat stat-box">
        <div className="stat-title">Unique Players</div>
        <div className="stat-value">{fmtNum(data.unique)}</div>
      </div>

      <div className="stat stat-box">
        <div className="stat-title">Games Won</div>
        <div className="stat-value">
          {fmtNum(data.heads.wins + data.tails.wins)}
        </div>
        <div className="stat-desc">
          {fmtNum(((data.heads.wins + data.tails.wins) / data.games) * 100)}%
        </div>
      </div>

      <div className="stat stat-box">
        <div className="stat-title">Games Lost</div>
        <div className="stat-value">
          {fmtNum(data.heads.losses + data.tails.losses)}
        </div>
        <div className="stat-desc">
          {fmtNum(((data.heads.losses + data.tails.losses) / data.games) * 100)}
          %
        </div>
      </div>

      <div className="stat stat-box">
        <div className="stat-title">Most Active Player</div>
        <div className="stat-value">
          <Link
            href={`https://tzkt.io/${data.mostActive?.address}/operations/`}
          >
            {fmtAddress(data.mostActive.address)}
          </Link>
        </div>
        <div className="stat-desc">
          {data.mostActive.wins}W - {data.mostActive.losses}L
        </div>
      </div>

      <div className="stat stat-box">
        <div className="stat-title">Luckiest Player</div>
        <div className="stat-value">
          <Link href={`https://tzkt.io/${data.lucky.address}/operations/`}>
            {fmtAddress(data.lucky.address)}
          </Link>
        </div>
        <div className="stat-desc">
          Min {Math.round(data.games / data.unique)} games: {data.lucky.wins}W -{" "}
          {data.lucky.losses}L
        </div>
      </div>

      <div className="stat stat-box">
        <div className="stat-title">Unluckiest Player</div>
        <div className="stat-value">
          <Link href={`https://tzkt.io/${data.unlucky.address}/operations/`}>
            {fmtAddress(data.unlucky.address)}
          </Link>
        </div>
        <div className="stat-desc">
          Min {Math.round(data.games / data.unique)} games: {data.unlucky.wins}W
          - {data.unlucky.losses}L
        </div>
      </div>
    </div>
  );
}

StatDashboard.propTypes = {
  data: propTypes.object,
};
