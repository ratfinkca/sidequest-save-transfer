# Side Quest save transfer

Standalone, public rescue page and support link. It contains no game assets and sends no save data to a server.

Serve this directory unchanged at `https://ratfinkca.github.io/sidequest-save-transfer/` to read saves from the old game's `ratfinkca.github.io` origin. A different hostname, browser, or device cannot access those saves. Installed iOS web apps can have separate storage, so recovery through Safari is not guaranteed; do not delete the old installed app while recovering.

`save-format.js` is also imported by the game's backup UI. Backup version 1 includes only the two production profiles, their control preferences and old original-edition best/sound settings. It omits practice profiles, analytics IDs/queues and sharing consent. A profile can include its unfinished run's score ticket; keep the downloaded file private.

The game validates a backup before presenting a replacement confirmation. Restore each edition separately. Existing progress is kept in a previous-backup slot before replacement, and the original file/browser storage is never removed by this helper.
