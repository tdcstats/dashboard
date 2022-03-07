import React from "react";
import Link from "next/link";
import { useTheme } from "@/hooks/theme";

export default function Footer() {
  const { themes, handleTheme } = useTheme();

  return (
    <div className="tdc-grid">
      <div className="col-span-full -mt-4 sm:-mt-10 pb-2 text-xs text-center">
        <div className="dropdown dropdown-top">
          <label tabIndex="0" className="btn btn-sm text-xs m-1">
            Theme ↑
          </label>
          <ul
            tabIndex="0"
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 overflow-auto"
          >
            {themes.map((theme, i) => (
              <li key={i}>
                <option value={theme} onClick={() => handleTheme(theme)}>
                  {theme}
                </option>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-span-full -mt-4 sm:-mt-6 text-xs text-center">
        <span>
          <Link href="https://tzkt.io/KT1NkWx47WzJeHCSyB62WjLtFn4tRf3uXBur/info">
            Pot Address ↗
          </Link>
        </span>
        <span> | </span>
        <span>
          <Link href="https://tzkt.io/KT1K6TyRSsAxukmjDWik1EoExSKsTg9wGEEX/info">
            Club Rewards Address ↗
          </Link>
        </span>
        <span> | </span>
        <span>
          <Link href="https://daisyui.com/">♥ DaisyUI ↗</Link>
        </span>
      </div>
    </div>
  );
}
