let session = null;

function readPersistedSession() {
  if (session) return session;
  if (typeof localStorage === "undefined") return null;

  try {
    session = JSON.parse(localStorage.getItem("auth-session"));
  } catch {
    session = null;
  }
  return session;
}

export function getAuthSession() {
  return readPersistedSession();
}

export function setAuthSession(nextSession) {
  session = nextSession;
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("auth-session", JSON.stringify(nextSession));
  }
}

export function clearAuthSession() {
  session = null;
  if (typeof localStorage !== "undefined") localStorage.removeItem("auth-session");
}

export function getUserIdFromToken(token) {
  try {
    const payload = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(globalThis.atob(payload));
    return decoded.userId ?? decoded.id ?? decoded.sub ?? null;
  } catch {
    return null;
  }
}
