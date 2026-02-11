import { useState } from 'react'

const TIMER_OPTIONS = [
    { value: null, label: 'Off' },
    { value: 15, label: '15 min' },
    { value: 30, label: '30 min' },
    { value: 60, label: '60 min' },
]

function ControlPanel({ isPlaying, isMuted, sleepTimer, onPlayPause, onMuteAll, onSleepTimer }) {
    const [isTimerOpen, setIsTimerOpen] = useState(false)

    const formatTime = (seconds) => {
        if (!seconds) return ''
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            {/* Play/Pause Button */}
            <button
                onClick={onPlayPause}
                className={`
          px-8 py-3 rounded-full font-semibold text-lg
          transition-all duration-300 ease-out
          ${isPlaying
                        ? 'bg-gradient-to-r from-forest-dark to-deep-forest text-ember-glow border-2 border-ember shadow-lg shadow-ember/20'
                        : 'bg-gradient-to-r from-ember to-ember-glow text-deep-forest hover:shadow-lg hover:shadow-ember/40'
                    }
        `}
            >
                {isPlaying ? (
                    <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <rect x="6" y="4" width="4" height="16" rx="1" />
                            <rect x="14" y="4" width="4" height="16" rx="1" />
                        </svg>
                        Pause
                    </span>
                ) : (
                    <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                        Play
                    </span>
                )}
            </button>

            {/* Mute All Button */}
            <button
                onClick={onMuteAll}
                className={`
          px-6 py-3 rounded-full font-medium
          transition-all duration-300
          border-2
          ${isMuted
                        ? 'bg-red-900/30 border-red-500 text-red-400'
                        : 'bg-transparent border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-300'
                    }
        `}
            >
                {isMuted ? (
                    <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                        </svg>
                        Unmute
                    </span>
                ) : (
                    <span className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                        </svg>
                        Mute All
                    </span>
                )}
            </button>

            {/* Sleep Timer Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setIsTimerOpen(!isTimerOpen)}
                    className={`
            px-6 py-3 rounded-full font-medium
            transition-all duration-300
            border-2 flex items-center gap-2
            ${sleepTimer
                            ? 'bg-blue-900/30 border-blue-500 text-blue-400'
                            : 'bg-transparent border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-300'
                        }
          `}
                >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                    </svg>
                    {sleepTimer ? formatTime(sleepTimer) : 'Sleep Timer'}
                </button>

                {isTimerOpen && (
                    <div className="absolute bottom-full left-0 mb-2 bg-forest-dark border border-gray-700 rounded-lg shadow-xl overflow-hidden z-20">
                        {TIMER_OPTIONS.map(option => (
                            <button
                                key={option.label}
                                onClick={() => {
                                    onSleepTimer(option.value)
                                    setIsTimerOpen(false)
                                }}
                                className={`
                  w-full px-6 py-2 text-left text-sm
                  transition-colors duration-200
                  ${sleepTimer === option.value
                                        ? 'bg-ember/20 text-ember-glow'
                                        : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                                    }
                `}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ControlPanel
