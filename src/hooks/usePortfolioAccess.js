const KEY = 'mitra_bukalapak_access';
const DURATION = 48 * 60 * 60 * 1000;
const PASSWORD = 'nando.works.exclusive';

function checkUnlocked() {
  try {
    const ts = localStorage.getItem(KEY);
    if (!ts) return false;
    return Date.now() - parseInt(ts, 10) < DURATION;
  } catch {
    return false;
  }
}

export function usePortfolioAccess() {
  const isUnlocked = checkUnlocked();

  function unlock(input) {
    if (input !== PASSWORD) return false;
    try {
      localStorage.setItem(KEY, String(Date.now()));
    } catch {}
    return true;
  }

  return { isUnlocked, unlock };
}
