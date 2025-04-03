/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TMDB_KEY: string; // Added VITE_TMDB_KEY
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
