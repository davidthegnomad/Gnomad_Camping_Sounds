import { useRef, useEffect, useCallback } from 'react'

/**
 * Custom hook for managing multiple audio channels with volume mixing
 * @param {Array} channels - Array of channel configs { id, src }
 * @param {Object} volumes - Object mapping channel id to volume (0-100)
 * @param {boolean} isPlaying - Global play state
 * @param {boolean} isMuted - Global mute state
 * @returns {Object} - { setAudioRef, getActiveChannels }
 */
export function useAudioMixer(channels, volumes, isPlaying, isMuted) {
    const audioRefs = useRef({})

    // Set audio element reference
    const setAudioRef = useCallback((id, element) => {
        if (element) {
            audioRefs.current[id] = element
        }
    }, [])

    // Get list of currently playing channels
    const getActiveChannels = useCallback(() => {
        return channels.filter(ch => volumes[ch.id] > 0 && isPlaying && !isMuted)
    }, [channels, volumes, isPlaying, isMuted])

    // Update playback state for all channels
    useEffect(() => {
        channels.forEach(channel => {
            const audio = audioRefs.current[channel.id]
            if (!audio) return

            // Calculate effective volume
            const effectiveVolume = isMuted ? 0 : volumes[channel.id] / 100
            audio.volume = effectiveVolume

            // Determine if this channel should play
            const shouldPlay = isPlaying && volumes[channel.id] > 0 && !isMuted

            if (shouldPlay) {
                if (audio.paused) {
                    const playPromise = audio.play()
                    if (playPromise !== undefined) {
                        playPromise.catch(err => {
                            // Handle autoplay restrictions gracefully
                            console.debug(`Audio playback blocked for ${channel.id}:`, err.message)
                        })
                    }
                }
            } else {
                if (!audio.paused) {
                    audio.pause()
                }
            }
        })
    }, [channels, volumes, isPlaying, isMuted])

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            Object.values(audioRefs.current).forEach(audio => {
                if (audio && !audio.paused) {
                    audio.pause()
                }
            })
        }
    }, [])

    return {
        setAudioRef,
        getActiveChannels,
    }
}

/**
 * Calculate fire glow intensity based on volume levels
 * @param {Object} volumes - Object mapping channel id to volume (0-100)
 * @param {number} fireWeight - Weight of fire channel (0-1), default 0.6
 * @returns {number} - Intensity value 0-100
 */
export function calculateFireIntensity(volumes, fireWeight = 0.6) {
    const totalVolume = Object.values(volumes).reduce((sum, v) => sum + v, 0) / Object.keys(volumes).length
    const fireVolume = volumes.fire || 0
    return fireVolume * fireWeight + totalVolume * (1 - fireWeight)
}

export default useAudioMixer
