/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_CLUB_HANDLE: string;
  readonly VITE_SITE_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
