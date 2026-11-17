# Side Quest save transfer

Standalone, public rescue page and support link. It contains no game assets and sends no save data to a server.

Serve this directory unchanged at `https://ratfinkca.github.io/sidequest-save-transfer/` to read saves from the old game's `ratfinkca.github.io` origin. A different hostname, browser, or device cannot access those saves. Installed iOS web apps have separate storage, so recovery through Safari is not enough; do not delete the old installed app while recovering.

The user-site bridge mirrors these files at the exact original launch paths `/shambhala-side-quest/` and `/shambhala-side-quest/smf/`, with matching manifest IDs and scope. Reopen the old installed icon to load the bridge in its original storage container. This is a recovery path, not a guarantee: deleted site data cannot be recovered, and actual iPhone behavior must be tested. The private game's own Pages site must remain disabled. There is no automatic cross-origin redirect.

After installing the new game, import the backup inside that installed app if it starts fresh; importing in Safari does not transfer localStorage into an installed app. The optional system share button only shares a backup when the player chooses to do so.

References: [GitHub user and project sites](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [Apple's installed-app storage and launch/scope explanation](https://developer.apple.com/videos/play/wwdc2023/10120/), [WebKit's storage-copy behavior](https://webkit.org/blog/14787/webkit-features-in-safari-17-2/). The exact-path recovery approach is an inference from those documented behaviors and requires hosted-path and physical-device verification.

`save-format.js` is also imported by the game's backup UI. Backup version 1 includes only the two production profiles, their control preferences and old original-edition best/sound settings. It omits practice profiles, analytics IDs/queues and sharing consent. A profile can include its unfinished run's score ticket; keep the downloaded file private.

The game validates a backup before presenting a replacement confirmation. Restore each edition separately. Existing progress is kept in a previous-backup slot before replacement, and the original file/browser storage is never removed by this helper.
