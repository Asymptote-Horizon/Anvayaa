# Audio Files Directory

Place language-specific audio files here for text-to-speech playback.

## Expected structure:
```
audio/
├── en/        # English
├── hi/        # Hindi
├── ta/        # Tamil
└── ...        # Other languages
```

Each folder should contain audio clips for UI prompts and course content.

**Note:** Audio playback is currently a stub. The `playLanguageAudio()` function in `lib/api.ts` logs to console for now.
