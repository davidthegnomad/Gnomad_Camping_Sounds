import { useState, useRef, useEffect, useCallback } from 'react'
import VisualDisplay from './components/VisualDisplay'
import SoundMixer from './components/SoundMixer'
import ControlPanel from './components/ControlPanel'

function App() {
    const [volumes, setVolumes] = useState({
        fire: 0,
        night: 0,
        river: 0,
        rain: 0,
        wind: 0,
    })
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [sleepTimer, setSleepTimer] = useState(null) // remaining seconds
    const timerRef = useRef(null)

    // Calculate total volume for glow effect (weighted towards fire)
    const totalVolume = Object.values(volumes).reduce((sum, v) => sum + v, 0) / 5
    const fireIntensity = volumes.fire * 0.6 + totalVolume * 0.4

    const handleVolumeChange = useCallback((channel, value) => {
        setVolumes(prev => ({ ...prev, [channel]: value }))
    }, [])

    const handlePlayPause = useCallback(() => {
        setIsPlaying(prev => !prev)
    }, [])

    const handleMuteAll = useCallback(() => {
        setIsMuted(prev => !prev)
    }, [])

    const handleSleepTimer = useCallback((minutes) => {
        if (timerRef.current) {
            clearInterval(timerRef.current)
        }

        if (minutes === null) {
            setSleepTimer(null)
            return
        }

        const totalSeconds = minutes * 60
        setSleepTimer(totalSeconds)

        timerRef.current = setInterval(() => {
            setSleepTimer(prev => {
                if (prev <= 1) {
                    clearInterval(timerRef.current)
                    setIsPlaying(false)
                    return null
                }
                return prev - 1
            })
        }, 1000)
    }, [])

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [])

    return (
        <div className="min-h-screen bg-deep-forest flex flex-col items-center justify-center p-4 md:p-8">
            {/* Header */}
            <header className="text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-ember to-ember-glow bg-clip-text text-transparent mb-2">
                    Wilderness Mixer
                </h1>
                <p className="text-gray-400 text-sm md:text-base">Create your perfect campfire atmosphere</p>
            </header>

            {/* Main Content */}
            <main className="w-full max-w-4xl flex flex-col items-center gap-8">
                {/* Visual Display - Tent with Campfire */}
                <VisualDisplay
                    fireIntensity={fireIntensity}
                    rainIntensity={volumes.rain}
                    windIntensity={volumes.wind}
                    nightIntensity={volumes.night}
                    riverIntensity={volumes.river}
                    isMuted={isMuted}
                />

                {/* Sound Mixer */}
                <SoundMixer
                    volumes={volumes}
                    onVolumeChange={handleVolumeChange}
                    isPlaying={isPlaying}
                    isMuted={isMuted}
                />

                {/* Control Panel */}
                <ControlPanel
                    isPlaying={isPlaying}
                    isMuted={isMuted}
                    sleepTimer={sleepTimer}
                    onPlayPause={handlePlayPause}
                    onMuteAll={handleMuteAll}
                    onSleepTimer={handleSleepTimer}
                />
            </main>

            {/* Footer */}
            <footer className="mt-12 text-gray-500 text-xs text-center">
                <p>🏕️ Relax and unwind with nature sounds</p>
                <p className="mt-2">© 2026 David the Gnomad Inc.</p>
            </footer>
        </div>
    )
}

export default App
