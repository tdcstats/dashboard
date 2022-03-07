export const fmtAddress = (address) =>
  address.slice(0, 4) + "-" + address.slice(-4);

export const fmtNum = (num) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(num);
