# WeatherGPT — Design Notes

## Subject
AI-driven atmospheric intelligence platform for India. Serves the public (citizens,
farmers, fishers, students) and officials (district authorities, disaster response,
weather operations, system administrators) with hyper-local forecasts, multilingual
early-warning broadcasts, and role-specific instrument panels. Tone: government-grade
trust + live telemetry, not a consumer weather app.

## Color
- `--ink: #0B1220` — deep atmospheric navy, primary dark background
- `--ink-2: #101A2C` — panel/sidebar navy, one step lighter than ink
- `--paper: #F5F7FA` — cloud white, light-section background
- `--cyan: #2DA8D8` — telemetry / data / informational accent
- `--amber: #F2A93B` — advisory / watch severity
- `--red: #D64550` — critical / warning severity
- `--green: #3FA66A` — healthy / safe status
- `--slate: #5B6B7E` — secondary text, muted labels

## Type
- **Manrope** — UI text and headlines. A geometric sans with more character than
  Inter/system defaults, keeps the interface legible at instrument-panel density.
- **IBM Plex Mono** — telemetry readouts only: coordinates, timestamps, sensor IDs,
  counters. Reinforces "live sensor feed" without turning the whole UI into a
  monospace dashboard cliché.

## Layout
- Marketing site: top nav, hero with a live data strip under the headline (mirrors
  "742 Observatories Online" ticker), asymmetric two-column feature rows — no
  identical card grids.
- Dashboards: fixed left icon+label sidebar, top bar with role badge + search,
  instrument panels with a left accent bar keyed to severity color instead of
  uniform drop-shadow cards.
- Signup: single-column wizard, persistent step rail, no modal dialogs.

## Principles
- Data is the hero — real numbers, coordinates, and timestamps stay visible, not
  hidden behind decoration.
- Severity color (amber/red/green) is the one expressive device; everything else
  stays quiet and disciplined.
- Hairline dividers instead of card shadows/gradients.
- Administrator dashboard is always rendered in English, regardless of the
  site-wide language setting — enforced in code via a language override, not a
  UI toggle the admin can defeat.
