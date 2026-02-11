# Wilderness Mixer (Gnomad Camping Sounds)

A relaxing ambience generator that brings the sounds of the great outdoors to your browser. Adjust the mix of crackling fire, gentle rain, chirping crickets, and more to create your perfect camping atmosphere.

## features

- **Dynamic Audio Mixing:** Control volume levels for multiple sound sources (fire, rain, etc.) independently.
- **Visual Feedback:** Reactive visual elements that respond to your sound settings.
- **Clean Interface:** Designed with a focus on simplicity and relaxation.
- **Built with Modern Tech:** Utilizing React, Vite, and Tailwind CSS for a fast and responsive experience.

## getting started

### prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm or yarn

### installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/wilderness-mixer.git
   cd wilderness-mixer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## build for production

To create an optimized production build:

```bash
npm run build
```

The output will be in the `dist` directory.

## project structure

- `src/components/`: specific UI components (SoundMixer, VisualDisplay, etc.)
- `src/hooks/`: custom React hooks for audio management
- `public/`: static assets

## license

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
