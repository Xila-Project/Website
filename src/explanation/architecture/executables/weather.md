---
layout: doc
docType: explanation
description: Understand the Weather demo guest and its network-dependent data sources.
---

# Weather (executable)

Weather is a WebAssembly demonstration application that queries the Open-Meteo service. It asks for a city, resolves its coordinates, then displays **Current**, **Hourly**, **Daily**, and **Meta** views.

The app uses the Xila HTTPS client device at `/devices/https_client`, rather than directly calling browser JavaScript APIs. Its two public data sources are the Open-Meteo geocoding endpoint (`geocoding-api.open-meteo.com`) and forecast endpoint (`api.open-meteo.com`). When more than one geocoding result matches, the current implementation selects the first result.

Weather requires the HTTPS device and working network access. A browser or host with restricted networking cannot fetch forecasts; the [headless container runner](/reference/container-runtime) explicitly disables networking and is not an alternative for this app.

## References

- <CodeReference path="executables/weather/README.md" />
- <CodeReference path="executables/weather" />
- [Network subsystem](/explanation/architecture/subsystems/network)
