> **This is WHIPFX's fork of [oxmysql](https://github.com/overextended/oxmysql), installed by
> [WHIP](https://github.com/WHIPFX/txAdmin-recipe).**
>
> It's oxmysql 2.14.3 with one fix. When no database connection is available (the database is down or restarting),
> every query call (`query`, `single`, `scalar`, `insert`, `update`, `prepare`, `rawExecute`, `transaction` and
> `startTransaction`) answers its caller with an error at once. In upstream oxmysql the error is lost and the caller
> waits forever. Everything else is upstream's.
>
> - **Download:** `oxmysql.zip` from release [v2.14.3-whip.1](https://github.com/WHIPFX/oxmysql/releases/tag/v2.14.3-whip.1).
>   Unzip it into your resources folder (WHIP's recipe uses `resources/[ox]`) and ensure it before `whip_core`. The
>   download links further down are upstream's build, without the fix.
> - **With WHIP:** stock oxmysql works too, but whip_core gives up on a stuck query after 65 seconds. WHIP's setup
>   report (`whipsetup` in the server console) says which one your server runs.
> - **License:** upstream's, unchanged: LGPL-3.0-or-later. See [LICENSE](./LICENSE) and [NOTICE.md](./NOTICE.md).
>
> The rest of this README is upstream's.

<div align="center">

# oxmysql

A FiveM resource to communicate with a MySQL database using [node-mysql2](https://github.com/sidorares/node-mysql2).

[![](https://img.shields.io/github/downloads/overextended/oxmysql/total?style=for-the-badge&logo=github)](https://github.com/overextended/oxmysql/releases/latest/download/oxmysql.zip)
[![](https://img.shields.io/github/downloads/overextended/oxmysql/latest/total?style=for-the-badge&logo=github)](https://github.com/overextended/oxmysql/releases/latest/download/oxmysql.zip)
[![](https://img.shields.io/github/v/release/overextended/oxmysql?style=for-the-badge&logo=github)](https://github.com/overextended/oxmysql/releases/latest/)\
[![](https://badges.5metrics.dev/oxmysql/serverRank.svg?style=for-the-badge)](https://5metrics.dev/resource/oxmysql)
[![](https://badges.5metrics.dev/oxmysql/servers.svg?style=for-the-badge)](https://5metrics.dev/resource/oxmysql)
[![](https://badges.5metrics.dev/oxmysql/players.svg?style=for-the-badge)](https://5metrics.dev/resource/oxmysql)

Refer to [CONTRIBUTING.md](./CONTRIBUTING.md) for contribution guidelines and to see our Contributor License Agreement.\
Refer to [NOTICE.md](./NOTICE.md) for additional information and legal notices.

</div>

## 🔗 Links

- 💾 [Download](https://github.com/overextended/oxmysql/releases/latest/download/oxmysql.zip)
  - Download the latest release directly.
- 📚 [Documentation](https://overextended.dev/oxmysql)
  - For installation, setup, and everything else.
- 📦 [npm](https://www.npmjs.com/package/@overextended/oxmysql)
  - Use our npm package for enhanced functionality and TypeScript support.

## ✨ Features

- Support for mysql-async and ghmattimysql syntax.
- Promises / async query handling allowing for non-blocking and awaitable responses.
- Improved performance and stability compared to other options.
- Support for named and unnamed placeholders, improving performance and security.
- Support for URI connection strings and semicolon separated values.
- Improved parameter checking and error handling.

## 🧾 Logging

We have included a module for submitting error logs to [Fivemanage](https://refer.fivemanage.com/overextended), a cloud management service tailored for game servers. Additional logging options and support for other services will be available in the future.

## Lua Language Server

- Install [Lua Language Server](https://marketplace.visualstudio.com/items?itemName=sumneko.lua) to ease development with annotations, type checking, diagnostics, and more.
- See [ox_types](https://github.com/overextended/ox_types) for our Lua type definitions.
