# smol 🌸

[![License](https://img.shields.io/github/license/smolneko-team/smolneko?color=%235f2eea)](https://github.com/smolneko-team/smol/blob/main/LICENSE) ![Website](https://img.shields.io/website?down_message=maintenance&up_message=up&url=http%3A%2F%2Fsmolneko.moe) ![GitHub package.json version](https://img.shields.io/github/package-json/v/smolneko-team/smol?color=%235f2eea) ![GitHub issues](https://img.shields.io/github/issues-raw/smolneko-team/smol?color=%235f2eea) ![GitHub repo size](https://img.shields.io/github/repo-size/smolneko-team/smol?color=%235f2eea) ![Lines of code](https://img.shields.io/tokei/lines/github/smolneko-team/smol?color=%235f2eea)

**[smolneko](https://smolneko.moe)** is a fully open source project about anime figures. This is the **web app**.

The application is built with the [Nuxt 3](https://nuxt.com/) and [Tailwind CSS](https://tailwindcss.com/). API (backend) can be found [here](https://github.com/smolneko-team/smolneko).

smolneko is in active development, sometimes there may be bugs and errors. If you find a bug or an error, please [create a new issue](https://github.com/smolneko-team/smol/issues/new). Any help would be helpful and appreciated.

## Roadmap

- About features and libraries
- Add terms and privacy policy
- Custom styles (extending the default tailwind theme)
- Characters pages
- Filters
- Infinite scroll on pages with pagination
- Search bar (global and full text)
- Auth for users
- Users pages
- Blogs
- Comments system

## Setup

Make sure to install the dependencies:

```bash
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on [http://localhost:3000](http://localhost:3000):

```bash
pnpm run dev
```

### Styles

[Tailwind Viewer](https://tailwindcss.nuxt.dev/tailwind/viewer) will be available after start at [http://localhost:3000/_tailwind/](http://localhost:3000/_tailwind/).

### Custom font compression (any .tff to .woff2)

#### Build library

```bash
git clone --recursive https://github.com/google/woff2.git
cd woff2
make clean all
```

#### Run compression

```bash
./woff2_compress ~/path_to_file/variable-font.ttf
```

More about the [build process](https://github.com/google/woff2).

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```

Visualize and analyze production bundle size:

```bash
pnpm run analyze
```

## License

© smolneko 2022
Licensed under the [MIT License](https://github.com/smolneko-team/smol/blob/main/LICENSE).
