# Community Snapshot Videos

Every month, a new [Community Snapshot](https://nest.owasp.org/snapshots) is created.
The hackathon project aims to generate YouTube videos to showcase a quick recap of "What's new".

## [Demonstration Video (YouTube)](https://youtu.be/5VZmHh3boPY)
## Authors / Team Members

- [Gopal Lohar](https://github.com/gopal-lohar) : [Email](mailto:gopal.lohar.dev@gmail.com)
- [Rudransh Shrivastava](https://github.com/rudransh-shrivastava) : [Email](mailto:rudransh.shrivastava@owasp.org)

## Sample Video Generation

We generated a video for [October 2025 OWASP Community Snapshot](https://nest.owasp.org/snapshots/2025-11)

[Alternative YouTube Video Link](https://youtu.be/V1J_2OnYoxA)

https://github.com/user-attachments/assets/ada644b0-de9b-4908-bb5d-ed479f0c186b



## Key Features
<img width="1574" height="996" alt="image" src="https://github.com/user-attachments/assets/461d3964-e9f4-4ae0-ab6e-0763254ded1c" />

- Data fetching using [OWASP Nest API](https://github.com/owasp/nest)
- Transcript and Audio generation using [Google Gemini](https://ai.google.dev/gemini-api/docs/)
- Video processing and encoding using [FFMPEG](https://github.com/ffmpegwasm/ffmpeg.wasm)

## Getting Started

This project depends on these unmerged PRs:
Please ensure they are merged in your local environment before proceeding.

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

_Note_: you must add a valid `GEMINI_API_KEY` and update the Nest API URL.

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
   <img width="1590" height="724" alt="image" src="https://github.com/user-attachments/assets/12054412-861e-4c15-8951-0b6f430dc7d7" />

2. Visit each slide and use "Fetch Data", "Generate Script" and "play audio (|>)" (at the bottom) to generate the metadata:
   <img width="416" height="155" alt="image" src="https://github.com/user-attachments/assets/d6684f53-61d3-4a29-8b1e-5406523c6043" />
   <img width="241" height="178" alt="image" src="https://github.com/user-attachments/assets/0af34032-b191-4fa1-bff1-55dc3fde3994" />

3. Make sure all slides have all green indicators on the left side:
   <img width="238" height="361" alt="image" src="https://github.com/user-attachments/assets/4304f402-7ee8-4a57-a1b6-a9f9354ddbf7" />

4. Use "Generate Video" button in the Nav Bar to generate a video:
   - The slides marked as "done" will be rendered in a video!

5. The video will be downloaded in the browser.

