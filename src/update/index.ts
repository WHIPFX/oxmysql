import fetch from 'node-fetch';

// WHIPFX's fork has its own releases (v2.14.3-whip.1, ...). Checking overextended's would tell a server running the fork
// to "update" to a build without the fork's fixes, and never mention the fork's own next release.
const RELEASES = 'https://api.github.com/repos/WHIPFX/oxmysql/releases/latest';
// major.minor.patch, then the fork's own -whip.N (read as 0 when a version has none)
const VERSION = /(\d+)\.(\d+)\.(\d+)(?:-whip\.(\d+))?/;

(() => {
  if (GetConvarInt('mysql_versioncheck', 1) === 0) return;

  const resourceName = GetCurrentResourceName();
  const currentVersion = GetResourceMetadata(resourceName, 'version', 0)?.match(VERSION);

  if (!currentVersion) return;

  setTimeout(async () => {
    const response = await fetch(RELEASES).catch((err) => {
      console.warn(`Failed to retrieve latest version of oxmysql (${err.code}).`);
    });

    if (response?.status !== 200) return;

    const release = (await response.json()) as any;
    if (release.prerelease) return;

    const latestVersion = release.tag_name.match(VERSION);
    if (!latestVersion || latestVersion[0] === currentVersion[0]) return;

    for (let i = 1; i < currentVersion.length; i++) {
      const current = parseInt(currentVersion[i] ?? '0');
      const latest = parseInt(latestVersion[i] ?? '0');

      if (current !== latest) {
        if (current < latest)
          return console.log(
            `^3An update is available for ${resourceName} (current version: ${currentVersion[0]})\r\n${release.html_url}^0`,
          );
        else break;
      }
    }
  }, 1000);
})();
