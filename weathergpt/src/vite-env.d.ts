/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MAP_API_KEY?: string
  readonly VITE_MAP_API_URL?: string
  readonly VITE_WEATHER_API_KEY?: string
  readonly VITE_WEATHER_API_URL?: string
  readonly VITE_CLIMATE_API_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
