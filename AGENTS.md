# Working on Ashinoko Course Data

- Read both the data contract and docs/MAINTENANCE.md before changes.
- This repository is the course source of truth. Vehicle, input, physics and rendering belong to https://github.com/Sunwood-ai-labs/ashinoko-kurotora-drive.
- Preserve coordinates, road-height conventions, source attribution and original rights. Do not invent source acquisition dates or add a blanket license.
- Review data changes before regenerating course-checksums.json and course-release.json. Run npm test and inspect the complete exported pack.
- Update manifest, package version and provenance together. Contract-breaking changes need a schema change and game compatibility verification.
- Do not commit original Blender files, internal logs, credentials, dependency directories or unnecessary archives. Inspect payload sizes; runtime data is intentional, source working files are not.
- Preserve the source history link. Do not rewrite the original game's history or imply this extraction contains its complete production environment.
- Keep English and Japanese README structure parallel. Structural validation does not establish browser rendering, input or FPS results.
