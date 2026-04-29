/**
 * LeetCode profile fetcher.
 *
 * Designed to plug into either:
 *   1) A self-hosted instance of https://github.com/noworneverev/leetcode-api
 *      — set VITE_LEETCODE_API to its base URL (e.g. https://my-api.fly.dev).
 *   2) A public hosted LeetCode mirror that exposes the same shape
 *      (totalSolved + submissionCalendar). Default fallback is faisalshohag's
 *      public Vercel deployment which mirrors the official LeetCode GraphQL.
 *
 * Both endpoints expose `/{username}` returning, at minimum:
 *   {
 *     totalSolved, easySolved, mediumSolved, hardSolved,
 *     totalQuestions, totalEasy, totalMedium, totalHard,
 *     ranking,
 *     submissionCalendar: { "<unixSeconds>": <count>, ... } | string,
 *     recentSubmissions?: [...]
 *   }
 */

const PUBLIC_FALLBACK = 'https://leetcode-api-faisalshohag.vercel.app';
const BASE = (import.meta.env.VITE_LEETCODE_API || PUBLIC_FALLBACK).replace(/\/$/, '');

export async function fetchLeetCode(username, { signal } = {}) {
  const res = await fetch(`${BASE}/${encodeURIComponent(username)}`, { signal });
  if (!res.ok) {
    throw new Error(`LeetCode API responded ${res.status}`);
  }
  const raw = await res.json();

  // Normalize submissionCalendar — some APIs return it stringified.
  let calendar = raw.submissionCalendar;
  if (typeof calendar === 'string') {
    try { calendar = JSON.parse(calendar); } catch { calendar = {}; }
  }
  if (!calendar || typeof calendar !== 'object') calendar = {};

  return {
    totalSolved:    raw.totalSolved    ?? 0,
    easySolved:     raw.easySolved     ?? 0,
    mediumSolved:   raw.mediumSolved   ?? 0,
    hardSolved:     raw.hardSolved     ?? 0,
    totalQuestions: raw.totalQuestions ?? 0,
    totalEasy:      raw.totalEasy      ?? 0,
    totalMedium:    raw.totalMedium    ?? 0,
    totalHard:      raw.totalHard      ?? 0,
    ranking:        raw.ranking        ?? null,
    submissionCalendar: calendar,
    recentSubmissions:  raw.recentSubmissions || [],
  };
}

/**
 * Build a [{ day, count, isToday, isFuture }] array for a given month.
 * `submissionCalendar` keys are unix seconds (UTC) → submission count.
 *
 * We bucket by local YYYY-M-D for display purposes (matches "today").
 */
export function buildMonthGrid(submissionCalendar, year, monthIdx) {
  const days = new Date(year, monthIdx + 1, 0).getDate();

  const bucket = new Map();
  for (const [k, v] of Object.entries(submissionCalendar)) {
    const ts = parseInt(k, 10);
    if (!ts) continue;
    const d = new Date(ts * 1000);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    bucket.set(key, (bucket.get(key) || 0) + (v || 0));
  }

  const today = new Date();
  return Array.from({ length: days }, (_, i) => {
    const day = i + 1;
    const key = `${year}-${monthIdx}-${day}`;
    const count = bucket.get(key) || 0;
    const isToday =
      today.getFullYear() === year &&
      today.getMonth() === monthIdx &&
      today.getDate() === day;
    const isFuture =
      year > today.getFullYear() ||
      (year === today.getFullYear() && monthIdx > today.getMonth()) ||
      (year === today.getFullYear() && monthIdx === today.getMonth() && day > today.getDate());
    return { day, count, isToday, isFuture };
  });
}

/** Compute a rolling "current streak" ending today (consecutive days with submissions). */
export function computeStreak(submissionCalendar) {
  const bucket = new Map();
  for (const [k, v] of Object.entries(submissionCalendar)) {
    const ts = parseInt(k, 10);
    if (!ts || !v) continue;
    const d = new Date(ts * 1000);
    bucket.set(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`, true);
  }
  let streak = 0;
  const cur = new Date();
  // Allow today OR yesterday as the streak anchor
  if (!bucket.has(`${cur.getFullYear()}-${cur.getMonth()}-${cur.getDate()}`)) {
    cur.setDate(cur.getDate() - 1);
  }
  while (bucket.has(`${cur.getFullYear()}-${cur.getMonth()}-${cur.getDate()}`)) {
    streak += 1;
    cur.setDate(cur.getDate() - 1);
  }
  return streak;
}
