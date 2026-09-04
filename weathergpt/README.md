# WeatherGPT — Multilingual Weather Intelligence Frontend

A React + TypeScript frontend for an AI-driven weather platform for India:
a public marketing website, a 6-step signup wizard, and role-based
dashboards — all translated into 10 languages, with the Administrator
dashboard permanently locked to English.

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:5173`).

To type-check and build a production bundle:

```bash
npm run build
npm run preview
```

## Folder structure

Per the brief, the three top-level product areas each have their own folder
under `src/`:

```
src/
  website/     Public pages shown to everyone except inside the dashboard
               (Home, Live Weather, Alerts, Maps, Climate, About) + the
               shared Navbar/Footer/WebsiteLayout.
  signup/      The 6-step signup wizard: Details → Language → Location →
               Role → Alert preferences → Review → Success.
  dashboard/   Role-based dashboards (Sidebar, Topbar, DashboardShell) and
               per-role content driven by roleConfig.ts.
  i18n/        Language definitions, the 10 translation dictionaries, and
               the LanguageContext / AdminEnglishLock that power switching.
  shared/      Cross-cutting types, the session context, and small
               components (Logo, LanguagePicker, StatusPill) used by more
               than one of the three areas above.
```

## Multilingual behaviour

- Ten languages are supported: English, Hindi, Bengali, Telugu, Marathi,
  Tamil, Kannada, Malayalam, Odia, and Urdu (`src/i18n/languages.ts`).
- `LanguageProvider` (in `src/i18n/LanguageContext.tsx`) holds the
  site-wide language choice, persists it to `localStorage`, and every page
  reads its copy from `useLanguage().t`.
- Picking a language on Step 2 of signup (`StepLanguage.tsx`) applies it
  immediately site-wide, so the rest of the wizard and the dashboard that
  follows are already in the chosen language.
- Urdu renders right-to-left automatically (`dir="rtl"`), driven by the
  same context.

### The Administrator dashboard is always English

This is enforced structurally, not with a UI toggle: `DashboardShell.tsx`
wraps the Administrator view in `<AdminEnglishLock>`, a provider that
supplies a fixed English dictionary and a no-op `setLanguage`, shadowing
the site-wide `LanguageProvider` for that entire subtree. No component
inside the Administrator dashboard can read or switch to another language,
regardless of what the rest of the site is set to.

## Roles

Roles selectable by a person signing up live in
`src/shared/types/user.ts` → `SELECTABLE_ROLES`. **Administrator is
deliberately excluded from this list** — system administrator accounts are
provisioned separately by WeatherGPT staff and are never a self-service
signup option. The Administrator dashboard still exists in the product
(reachable from the dashboard's "change dashboard" role switcher, for
staff), it's just not offered on the signup form.

## Design system

See `DESIGN_NOTES.md` for the colour palette, typography, and layout
principles used throughout (deep atmospheric navy + telemetry cyan +
severity-coded amber/red/green, Manrope for UI text, IBM Plex Mono for
data readouts).

## Notes on this build

This project was generated as a complete source tree (not run through
`npm install` in the generating environment, which had no network access).
Run `npm install` locally before `npm run dev` / `npm run build`. Some
content on the secondary dashboard/website pages (station names, sample
readings, audit-log entries) is illustrative placeholder data — wire it up
to your real APIs before shipping.
