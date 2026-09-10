// Pfade, die sowohl unter einem Unterpfad (GitHub Pages) als auch auf der
// eigenen Domain (ALL-INKL, Base "/") funktionieren.
const base = import.meta.env.BASE_URL;

export function url(path: string): string {
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return base.endsWith('/') ? base + clean : `${base}/${clean}`;
}
