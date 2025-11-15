# Community Snapshot Videosreadme

Every month, a new [Community Snapshot](https://nest.owasp.org/snapshots) is created.
The hackathon project aims to generate YouTube videos to showcase a quick recap of "What's new".

## Authors / Team Members

- [Gopal Lohar](https://github.com/gopal-lohar) : [Email](mailto:gopal.lohar.dev@gmail.com)
- [Rudransh Shrivastava](https://github.com/rudransh-shrivastava) : [Email](mailto:rudransh.shrivastava@owasp.org)

## Sample Video Generation

We generated a video for [October 2025 OWASP Community Snapshot](https://nest.owasp.org/snapshots/2025-11)
<INSERT VIDEO HERE>

## Key Features

- Data fetching using [OWASP Nest API](https://github.com/owasp/nest)
- Transcript and Audio generation using [Google Gemini](https://ai.google.dev/gemini-api/docs/)
- Video processing and encoding using [FFMPEG](https://github.com/ffmpegwasm/ffmpeg.wasm)

## Getting Started

This project depends on these PRs:
Please make sure they are merged in your local environment before you proceed.

- [Extend Nest API chapter and project](https://github.com/OWASP/Nest/pull/2606) - By [Rudransh Shrivastava](https://github.com/rudransh-shrivastava)
- [Extend Chapter and events REST endpoints with filtering and add longitude and latitude to schemes](https://github.com/OWASP/Nest/pull/2584) - By [Ahmed Gouda](https://github.com/ahmedxgouda/)

## Prerequisites

Ensure you have the following:

- [Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

### Setup Environment Variables

Create a `.env` file:

```bash
touch .env
```

Copy contents of `.env.example`:

```bash
cat .env.example > .env
```

*Note*: you must add a valid `GEMINI_API_KEY` and update the Nest API URL.

### Run the project

1. Install node packages.

```bash
pnpm install
```

2. Run the project in Docker

```bash
make run
```

### Steps to generate a video

1. Click on any snapshot shown in the image below:

2. Visit each slide and use "Fetch Data", "Generate Script" and "|>" (at the bottom) to generate the metadata:

3. Use "Generate Video" button in the Nav Bar to generate a video:
   - The slides marked as "done" will be rendered in a video!

4. The video will be downloaded in the browser.

