/**
 * GitHub profile fetcher — uses the public REST API directly (no auth).
 * Unauthenticated rate limit is 60 requests / hr / IP, which is plenty for
 * a portfolio visitor. We fetch in parallel and degrade gracefully.
 */

const BASE = 'https://api.github.com';

const headers = {
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

export async function fetchGitHub(username, { signal } = {}) {
  const u = encodeURIComponent(username);
  const [userRes, reposRes, eventsRes] = await Promise.all([
    fetch(`${BASE}/users/${u}`, { headers, signal }),
    fetch(`${BASE}/users/${u}/repos?per_page=100&sort=updated`, { headers, signal }),
    fetch(`${BASE}/users/${u}/events/public?per_page=100`, { headers, signal }),
  ]);

  if (!userRes.ok) throw new Error(`GitHub user API ${userRes.status}`);

  const user   = await userRes.json();
  const repos  = reposRes.ok  ? await reposRes.json()  : [];
  const events = eventsRes.ok ? await eventsRes.json() : [];

  const stars = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0);
  const forks = repos.reduce((s, r) => s + (r.forks_count || 0), 0);

  // Build last-30-days commit counts from PushEvents
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = 30;
  const map = new Map();
  for (const ev of events) {
    if (ev.type !== 'PushEvent') continue;
    const d = new Date(ev.created_at);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    const count = ev.payload?.commits?.length || 0;
    map.set(key, (map.get(key) || 0) + count);
  }
  const heat = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    heat.push({ date: d, count: map.get(key) || 0 });
  }
  const commits30 = heat.reduce((s, h) => s + h.count, 0);

  // Streak: consecutive days ending today (or yesterday) with ≥1 commit
  let streak = 0;
  for (let i = heat.length - 1; i >= 0; i--) {
    if (heat[i].count > 0) streak += 1;
    else if (i === heat.length - 1 && streak === 0) continue; // allow no commit today
    else break;
  }

  // Top repos by stars (for display elsewhere if needed)
  const topRepos = [...repos]
    .filter(r => !r.fork)
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 5)
    .map(r => ({
      name: r.name,
      stars: r.stargazers_count,
      lang: r.language,
      url: r.html_url,
      desc: r.description,
    }));

  return {
    user: {
      login: user.login,
      name: user.name,
      avatar: user.avatar_url,
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      bio: user.bio,
      htmlUrl: user.html_url,
    },
    stars,
    forks,
    commits30,
    streak,
    heat,
    topRepos,
    repoCount: user.public_repos ?? repos.length,
  };
}
