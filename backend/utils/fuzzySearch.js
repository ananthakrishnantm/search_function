module.exports = function fuzzySearch(text, search) {
  if (typeof text !== "string" || typeof search !== "string") {
    return false;
  }

  const t = text.toLowerCase();
  const s = search.toLowerCase();

  if (t.includes(s)) return true;

  let i = 0;
  for (const c of t) {
    if (c === s[i]) i++;
    if (i === s.length) return true;
  }

  return false;
};
