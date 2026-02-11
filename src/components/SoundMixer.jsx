import { useRef, useEffect } from 'react'
import VolumeSlider from './VolumeSlider'

const CHANNELS = [
    { id: 'fire', label: 'Fire', icon: '🔥', src: '/sounds/fire.mp3' },
    { id: 'night', label: 'Night', icon: '🦗', src: '/sounds/night.mp3' },
    { id: 'river', label: 'River', icon: '🌊', src: '/sounds/river.mp3' },
    { id: 'rain', label: 'Rain', icon: '🌧️', src: '/sounds/rain.mp3' },
    { id: 'wind', label: 'Wind', icon: '🌬️', src: '/sounds/wind.mp3' },
]

function SoundMixer({ volumes, onVolumeChange, isPlaying, isMuted }) {
    const fireRef = useRef(null)
    const nightRef = useRef(null)
    const riverRef = useRef(null)
    const rainRef = useRef(null)
    const windRef = useRef(null)

    // Sync fire audio
    useEffect(() => {
        const audio = fireRef.current
        if (!audio) return
        audio.volume = isMuted ? 0 : volumes.fire / 100
        const shouldPlay = isPlaying && volumes.fire > 0 && !isMuted
        if (shouldPlay && audio.paused) {
            audio.play().catch(() => { })
        } else if (!shouldPlay && !audio.paused) {
            audio.pause()
        }
    }, [volumes.fire, isPlaying, isMuted])

    // Sync night audio
    useEffect(() => {
        const audio = nightRef.current
        if (!audio) return
        audio.volume = isMuted ? 0 : volumes.night / 100
        const shouldPlay = isPlaying && volumes.night > 0 && !isMuted
        if (shouldPlay && audio.paused) {
            audio.play().catch(() => { })
        } else if (!shouldPlay && !audio.paused) {
            audio.pause()
        }
    }, [volumes.night, isPlaying, isMuted])

    // Sync river audio
    useEffect(() => {
        const audio = riverRef.current
        if (!audio) return
        audio.volume = isMuted ? 0 : volumes.river / 100
        const shouldPlay = isPlaying && volumes.river > 0 && !isMuted
        if (shouldPlay && audio.paused) {
            audio.play().catch(() => { })
        } else if (!shouldPlay && !audio.paused) {
            audio.pause()
        }
    }, [volumes.river, isPlaying, isMuted])

    // Sync rain audio
    useEffect(() => {
        const audio = rainRef.current
        if (!audio) return
        audio.volume = isMuted ? 0 : volumes.rain / 100
        const shouldPlay = isPlaying && volumes.rain > 0 && !isMuted
        if (shouldPlay && audio.paused) {
            audio.play().catch(() => { })
        } else if (!shouldPlay && !audio.paused) {
            audio.pause()
        }
    }, [volumes.rain, isPlaying, isMuted])

    // Sync wind audio
    useEffect(() => {
        const audio = windRef.current
        if (!audio) return
        audio.volume = isMuted ? 0 : volumes.wind / 100
        const shouldPlay = isPlaying && volumes.wind > 0 && !isMuted
        if (shouldPlay && audio.paused) {
            audio.play().catch(() => { })
        } else if (!shouldPlay && !audio.paused) {
            audio.pause()
        }
    }, [volumes.wind, isPlaying, isMuted])

    return (
        <div className="w-full">
            {/* Audio elements */}
            <audio ref={fireRef} src="/sounds/fire.mp3" loop preload="auto" style={{ display: 'none' }} />
            <audio ref={nightRef} src="/sounds/night.mp3" loop preload="auto" style={{ display: 'none' }} />
            <audio ref={riverRef} src="/sounds/river.mp3" loop preload="auto" style={{ display: 'none' }} />
            <audio ref={rainRef} src="/sounds/rain.mp3" loop preload="auto" style={{ display: 'none' }} />
            <audio ref={windRef} src="/sounds/wind.mp3" loop preload="auto" style={{ display: 'none' }} />

            {/* Volume sliders */}
            <div className="flex justify-center gap-6 md:gap-10 flex-wrap">
                {CHANNELS.map(channel => (
                    <VolumeSlider
                        key={channel.id}
                        icon={channel.icon}
                        label={channel.label}
                        value={volumes[channel.id]}
                        onChange={(value) => onVolumeChange(channel.id, value)}
                        isActive={volumes[channel.id] > 0 && isPlaying && !isMuted}
                    />
                ))}
            </div>
        </div>
    )
}

export default SoundMixer
