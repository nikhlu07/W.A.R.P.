export function microSTXToSTX(microSTX) {
  return (microSTX / 1000000).toFixed(1);
}

export function STXToMicroSTX(stx) {
  return Math.floor(stx * 1000000);
}

export function formatSTX(microSTX) {
  const stx = microSTXToSTX(microSTX);
  return `${stx} STX`;
}

export function truncateAddress(address, startChars = 6, endChars = 4) {
  if (!address || address.length <= startChars + endChars) return address;
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
}

export function getTimeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return `${seconds}s ago`;
}
