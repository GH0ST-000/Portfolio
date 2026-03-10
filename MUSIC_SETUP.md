# Download YouTube Audio for Background Music

## The YouTube video you want:
https://www.youtube.com/watch?v=CvLHKUtcFg4

## How to download and add it:

### Option 1: Online Downloader (Easiest)
1. Go to: https://ytmp3.nu/ or https://y2mate.com/
2. Paste your YouTube URL: https://www.youtube.com/watch?v=CvLHKUtcFg4
3. Select "MP3" format
4. Download the file
5. Rename it to `background-music.mp3`
6. Copy to: `portfolio-app/public/audio/background-music.mp3`

### Option 2: Using yt-dlp (Command Line)
```bash
# Install yt-dlp (if not installed)
brew install yt-dlp

# Download audio
cd /Users/luka/Desktop/portfolio/portfolio-app/public/audio
yt-dlp -x --audio-format mp3 -o "background-music.mp3" "https://www.youtube.com/watch?v=CvLHKUtcFg4"
```

### Option 3: I'll use a similar lofi track
For now, I'll use a similar ambient/lofi track from a free music library until you add your file.

## After downloading:
Just place the file in `portfolio-app/public/audio/background-music.mp3` and the code will use it automatically!
