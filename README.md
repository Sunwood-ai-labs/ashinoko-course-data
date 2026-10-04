# Ashinoko GT · Course Data

[English](README.md) · [日本語](README.ja.md)

The independently maintained course pack for [KUROTORA DRIVE](https://github.com/Sunwood-ai-labs/ashinoko-kurotora-drive): approximately 25.03 km of route data, scenery, vegetation, schemas, provenance and a renderer-independent data contract. The car, controls, physics and playable site belong to the game repository.

![Blender course production preview](docs/assets/blender-course-preview.png)

*Blender production preview, not a screenshot of the running browser game. Browser materials and level of detail differ. 3D browser rendering and frame rates remain unverified.*

## 📦 Repositories and versions

- Course source: [ashinoko-course-data](https://github.com/Sunwood-ai-labs/ashinoko-course-data), pack 4.0.0, schema 1
- Game runtime: [ashinoko-kurotora-drive](https://github.com/Sunwood-ai-labs/ashinoko-kurotora-drive)
- Play: [GitHub Pages game](https://sunwood-ai-labs.github.io/ashinoko-kurotora-drive/)
- The game vendors a reviewed snapshot with every file pinned by SHA-256. Changes here do not silently update the live game

## 🚀 Validate and export

Node.js 22 or newer is sufficient. No npm packages or network requests are needed for validation.

```sh
git clone https://github.com/Sunwood-ai-labs/ashinoko-course-data.git
cd ashinoko-course-data
npm test
npm run release:export -- ../ashinoko-course-export
```

Choose a new empty export directory. The complete export contains 32 pinned resources plus `course-release.json`, about 98.3 MB before transfer compression. It includes the contract, schemas and rights/provenance, but no vehicle or renderer. Export repackages this snapshot; it does not regenerate Blender geometry.

## 🔁 Import into the game

Clone both repositories side by side. From the game repository:

```sh
npm run course:import -- --source ../ashinoko-course-data
npm test
```

The default command accepts only the already-pinned release. For a deliberately reviewed update, use `npm run course:import -- --source ../ashinoko-course-data --accept-update`, then `npm run checksums` and `npm test`. Commit the resulting game snapshot and lock together. The importer reads local files, rejects tampering and unsafe paths, and does not run imported code. See the [maintenance guide](docs/MAINTENANCE.md).

## 🧭 Data contract

The 10,016 route samples form a closed 25,031.460 m route. There are 209,834 vegetation placements and 24 manifest-linked assets. Units are metres; route/placement coordinates are local Z-up, geometry is glTF Y-up, with `[x, z, -y]` rendering conversion. Course assets are self-contained GLBs, including Meshopt-compressed geometry.

- [Architecture and ownership](docs/ARCHITECTURE.md)
- [Source data, precision and rights](docs/DATA.md)
- [Validation, updates and rollback](docs/MAINTENANCE.md)
- [Verification limits](docs/VERIFICATION.md)
- [Repository maintenance record](docs/REPOSITORY_POLISH.md)

The guides above are in Japanese. Both README entry points cover the same usage and limitations.

## ✅ Verification and limitations

`npm test` checks the data contract, asset checksums, release inventory and local documentation links. CI tests Node 22 and 24 and exports an inspectable artifact. These checks do not prove rendering quality, mobile performance or playable browser controls.

The source project history remains in the original game repository. [PROVENANCE.json](PROVENANCE.json) records the exact source commit. Original Blender files and the complete original map/DEM workset are not included; some acquisition metadata is unknown. This artistic reconstruction is unsuitable for navigation, surveying or safety decisions.

## 📄 Rights and contributing

Map-derived material retains © OpenStreetMap contributors / ODbL and Geospatial Information Authority of Japan attribution. No new blanket license is granted for original code or visual assets. Read [LICENSE.md](LICENSE.md), [contribution guidance](CONTRIBUTING.md) and [security guidance](SECURITY.md) before reuse or changes.
