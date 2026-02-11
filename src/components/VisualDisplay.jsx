import { useMemo, useState, useEffect } from 'react'

function VisualDisplay({ fireIntensity, rainIntensity = 0, windIntensity = 0, nightIntensity = 0, riverIntensity = 0, isMuted = false }) {
    // When muted, all effects are off (except moon and raccoon)
    const effectiveFireIntensity = isMuted ? 0 : fireIntensity
    const effectiveRainIntensity = isMuted ? 0 : rainIntensity
    const effectiveWindIntensity = isMuted ? 0 : windIntensity
    const effectiveNightIntensity = isMuted ? 0 : nightIntensity
    const effectiveRiverIntensity = isMuted ? 0 : riverIntensity

    // Raccoon state - appears when muted, leaves when unmuted
    const [raccoonX, setRaccoonX] = useState(-30)
    const [raccoonDirection, setRaccoonDirection] = useState(1)

    // Raccoon wandering animation
    useEffect(() => {
        if (!isMuted) {
            setRaccoonX(-30)
            return
        }

        const interval = setInterval(() => {
            setRaccoonX(prev => {
                const newX = prev + (raccoonDirection * 2)
                if (newX > 170) {
                    setRaccoonDirection(-1)
                    return 170
                }
                if (newX < 30) {
                    setRaccoonDirection(1)
                    return 30
                }
                return newX
            })
        }, 100)

        if (raccoonX < 30) {
            setRaccoonX(30)
        }

        return () => clearInterval(interval)
    }, [isMuted, raccoonDirection])

    // Calculate glow properties based on fire intensity
    const glowStyles = useMemo(() => {
        const intensity = Math.max(0, Math.min(100, effectiveFireIntensity))
        const baseBlur = 10 + (intensity * 0.5)
        const spreadRadius = 5 + (intensity * 0.3)
        const opacity = intensity > 0 ? 0.3 + (intensity * 0.007) : 0

        return {
            filter: intensity > 0
                ? `drop-shadow(0 0 ${baseBlur}px rgba(255, 107, 53, ${opacity})) 
           drop-shadow(0 0 ${spreadRadius}px rgba(255, 159, 28, ${opacity * 0.8}))`
                : 'none',
            transition: 'filter 0.3s ease-out',
        }
    }, [effectiveFireIntensity])

    // Fire flames scale
    const fireHeight = useMemo(() => {
        const intensity = Math.max(0, Math.min(100, effectiveFireIntensity))
        return intensity * 0.55
    }, [effectiveFireIntensity])

    const fireOpacity = useMemo(() => {
        const intensity = Math.max(0, Math.min(100, effectiveFireIntensity))
        return intensity > 0 ? 0.8 + (intensity * 0.002) : 0
    }, [effectiveFireIntensity])

    const windOffset = useMemo(() => {
        return effectiveWindIntensity > 0 ? effectiveWindIntensity * 0.1 : 0
    }, [effectiveWindIntensity])

    const fireBaseY = 152

    // Generate fireflies
    const fireflies = useMemo(() => {
        const flies = []
        const count = Math.floor(nightIntensity / 10) + 3
        for (let i = 0; i < count; i++) {
            flies.push({
                cx: 20 + Math.random() * 160,
                cy: 30 + Math.random() * 100,
                r: 1 + Math.random() * 1.5,
                delay: Math.random() * 3,
                duration: 1.5 + Math.random() * 2,
            })
        }
        return flies
    }, [nightIntensity > 0 ? Math.floor(nightIntensity / 20) : 0])

    // Generate rain drops
    const rainDrops = useMemo(() => {
        const drops = []
        const count = Math.floor(rainIntensity / 5) + 5
        for (let i = 0; i < count; i++) {
            drops.push({
                x: 10 + Math.random() * 180,
                delay: Math.random() * 1,
                length: 5 + Math.random() * 10,
            })
        }
        return drops
    }, [rainIntensity > 0 ? Math.floor(rainIntensity / 10) : 0])

    return (
        <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
            {/* Background glow layer */}
            <div
                className="absolute inset-0 rounded-full fire-glow"
                style={{
                    background: effectiveFireIntensity > 0
                        ? `radial-gradient(circle at 50% 70%, rgba(255, 107, 53, ${effectiveFireIntensity * 0.004}) 0%, transparent 60%)`
                        : 'transparent',
                    transition: 'background 0.5s ease-out',
                }}
            />

            {/* Main SVG with fire glow */}
            <svg
                viewBox="0 0 200 200"
                className="w-full h-full relative z-10"
                style={glowStyles}
            >
                {/* Rain animation */}
                {effectiveRainIntensity > 0 && (
                    <g style={{ opacity: effectiveRainIntensity / 100 }}>
                        {rainDrops.map((drop, i) => (
                            <line
                                key={`rain-${i}`}
                                x1={drop.x}
                                y1={0}
                                x2={drop.x - 2}
                                y2={drop.length}
                                stroke="rgba(150, 180, 220, 0.6)"
                                strokeWidth="1"
                                className="rain-drop"
                                style={{
                                    animationDelay: `${drop.delay}s`,
                                    animationDuration: `${0.5 + (100 - effectiveRainIntensity) * 0.01}s`
                                }}
                            />
                        ))}

                        {/* Splashes on tent */}
                        <g className="splash-group">
                            <circle cx="60" cy="100" r="2" fill="none" stroke="rgba(150, 180, 220, 0.5)" strokeWidth="0.5" className="splash" />
                            <circle cx="80" cy="85" r="2" fill="none" stroke="rgba(150, 180, 220, 0.4)" strokeWidth="0.5" className="splash" style={{ animationDelay: '0.2s' }} />
                            <circle cx="100" cy="70" r="2" fill="none" stroke="rgba(150, 180, 220, 0.5)" strokeWidth="0.5" className="splash" style={{ animationDelay: '0.4s' }} />
                            <circle cx="120" cy="85" r="2" fill="none" stroke="rgba(150, 180, 220, 0.4)" strokeWidth="0.5" className="splash" style={{ animationDelay: '0.6s' }} />
                            <circle cx="140" cy="100" r="2" fill="none" stroke="rgba(150, 180, 220, 0.5)" strokeWidth="0.5" className="splash" style={{ animationDelay: '0.8s' }} />
                            <circle cx="70" cy="115" r="2" fill="none" stroke="rgba(150, 180, 220, 0.4)" strokeWidth="0.5" className="splash" style={{ animationDelay: '0.3s' }} />
                            <circle cx="130" cy="115" r="2" fill="none" stroke="rgba(150, 180, 220, 0.5)" strokeWidth="0.5" className="splash" style={{ animationDelay: '0.7s' }} />
                        </g>

                        {/* Splashes on ground */}
                        <g className="splash-group">
                            <circle cx="30" cy="168" r="2" fill="none" stroke="rgba(150, 180, 220, 0.4)" strokeWidth="0.5" className="splash" style={{ animationDelay: '0.1s' }} />
                            <circle cx="50" cy="167" r="2" fill="none" stroke="rgba(150, 180, 220, 0.5)" strokeWidth="0.5" className="splash" style={{ animationDelay: '0.3s' }} />
                            <circle cx="150" cy="167" r="2" fill="none" stroke="rgba(150, 180, 220, 0.4)" strokeWidth="0.5" className="splash" style={{ animationDelay: '0.5s' }} />
                            <circle cx="170" cy="168" r="2" fill="none" stroke="rgba(150, 180, 220, 0.5)" strokeWidth="0.5" className="splash" style={{ animationDelay: '0.9s' }} />
                            <circle cx="40" cy="169" r="2" fill="none" stroke="rgba(150, 180, 220, 0.4)" strokeWidth="0.5" className="splash" style={{ animationDelay: '0.4s' }} />
                            <circle cx="160" cy="169" r="2" fill="none" stroke="rgba(150, 180, 220, 0.5)" strokeWidth="0.5" className="splash" style={{ animationDelay: '0.6s' }} />
                        </g>
                    </g>
                )}

                {/* Stars */}
                <g opacity="0.4">
                    <circle cx="30" cy="30" r="1" fill="white" />
                    <circle cx="170" cy="25" r="1.2" fill="white" />
                    <circle cx="50" cy="20" r="0.8" fill="white" />
                    <circle cx="150" cy="40" r="1" fill="white" />
                    <circle cx="20" cy="60" r="0.8" fill="white" />
                    <circle cx="180" cy="70" r="1" fill="white" />
                </g>

                {/* Fireflies */}
                {effectiveNightIntensity > 0 && (
                    <g style={{ opacity: Math.min(1, effectiveNightIntensity / 50) }}>
                        {fireflies.map((fly, i) => (
                            <circle
                                key={`firefly-${i}`}
                                cx={fly.cx}
                                cy={fly.cy}
                                r={fly.r}
                                fill="#98ff98"
                                className="firefly"
                                style={{
                                    animationDelay: `${fly.delay}s`,
                                    animationDuration: `${fly.duration}s`
                                }}
                            />
                        ))}
                    </g>
                )}

                {/* Moon - always visible */}
                <circle cx="160" cy="35" r="12" fill="#e8e8d0" opacity="0.8" />
                <circle cx="165" cy="32" r="10" fill="#051a1a" />

                {/* Ground */}
                <ellipse cx="100" cy="170" rx="80" ry="8" fill="#1a3a3a" />

                {/* Tent */}
                <polygon
                    points="100,50 40,140 160,140"
                    fill="#2d4a4a"
                    stroke="#3d5a5a"
                    strokeWidth="2"
                />
                <polygon
                    points="100,50 70,140 130,140"
                    fill="#234040"
                />
                <polygon
                    points="100,90 85,140 115,140"
                    fill="#0a1a1a"
                />

                {/* Campfire logs */}
                <g>
                    <rect x="75" y="155" width="50" height="6" rx="3" fill="#4a3728" transform="rotate(-10, 100, 158)" />
                    <rect x="75" y="155" width="50" height="6" rx="3" fill="#5a4738" transform="rotate(10, 100, 158)" />
                </g>

                {/* Fire flames */}
                {effectiveFireIntensity > 0 && (
                    <g
                        style={{
                            opacity: fireOpacity,
                            transition: 'opacity 0.3s ease-out',
                        }}
                        className={`${effectiveFireIntensity > 10 ? 'fire-glow' : ''} ${effectiveWindIntensity > 0 ? 'wind-sway' : ''}`}
                    >
                        <path
                            d={`M100,${fireBaseY - fireHeight} Q${85 - fireHeight * 0.1},${fireBaseY - fireHeight * 0.5} 80,${fireBaseY} Q90,${fireBaseY - fireHeight * 0.3} 100,${fireBaseY} Q110,${fireBaseY - fireHeight * 0.3} 120,${fireBaseY} Q${115 + fireHeight * 0.1},${fireBaseY - fireHeight * 0.5} 100,${fireBaseY - fireHeight}`}
                            fill="#ff6b35"
                        />
                        <path
                            d={`M100,${fireBaseY - fireHeight * 0.8} Q${88 - fireHeight * 0.05},${fireBaseY - fireHeight * 0.4} 85,${fireBaseY} Q93,${fireBaseY - fireHeight * 0.2} 100,${fireBaseY} Q107,${fireBaseY - fireHeight * 0.2} 115,${fireBaseY} Q${112 + fireHeight * 0.05},${fireBaseY - fireHeight * 0.4} 100,${fireBaseY - fireHeight * 0.8}`}
                            fill="#ff9f1c"
                        />
                        <path
                            d={`M100,${fireBaseY - fireHeight * 0.5} Q94,${fireBaseY - fireHeight * 0.25} 92,${fireBaseY} Q96,${fireBaseY - fireHeight * 0.1} 100,${fireBaseY} Q104,${fireBaseY - fireHeight * 0.1} 108,${fireBaseY} Q106,${fireBaseY - fireHeight * 0.25} 100,${fireBaseY - fireHeight * 0.5}`}
                            fill="#ffcc00"
                        />
                    </g>
                )}

                {/* Sparks */}
                {effectiveFireIntensity > 30 && (
                    <g style={{ opacity: Math.min(1, (effectiveFireIntensity - 30) * 0.02) }}>
                        <circle cx="95" cy={fireBaseY - fireHeight - 5} r="1.5" fill="#ff9f1c" className="animate-pulse" />
                        <circle cx="105" cy={fireBaseY - fireHeight - 8} r="1" fill="#ffcc00" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
                        <circle cx="92" cy={fireBaseY - fireHeight - 3} r="1" fill="#ff6b35" className="animate-pulse" style={{ animationDelay: '0.6s' }} />
                    </g>
                )}

                {effectiveFireIntensity > 90 && (
                    <g style={{ opacity: 1 }}>
                        <circle cx="97" cy={fireBaseY - fireHeight - 15} r="1.5" fill="#ff9f1c" className="animate-pulse" />
                        <circle cx="103" cy={fireBaseY - fireHeight - 20} r="1.2" fill="#ffcc00" className="animate-pulse" style={{ animationDelay: '0.1s' }} />
                        <circle cx="90" cy={fireBaseY - fireHeight - 12} r="1" fill="#ff6b35" className="animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <circle cx="110" cy={fireBaseY - fireHeight - 18} r="1.3" fill="#ff9f1c" className="animate-pulse" style={{ animationDelay: '0.3s' }} />
                        <circle cx="94" cy={fireBaseY - fireHeight - 25} r="0.8" fill="#ffcc00" className="animate-pulse" style={{ animationDelay: '0.4s' }} />
                        <circle cx="106" cy={fireBaseY - fireHeight - 22} r="1" fill="#ff6b35" className="animate-pulse" style={{ animationDelay: '0.5s' }} />
                        <circle cx="85" cy={fireBaseY - fireHeight - 8} r="1.2" fill="#ff9f1c" className="animate-pulse" style={{ animationDelay: '0.15s' }} />
                        <circle cx="115" cy={fireBaseY - fireHeight - 10} r="1" fill="#ffcc00" className="animate-pulse" style={{ animationDelay: '0.25s' }} />
                        <circle cx="88" cy={fireBaseY - fireHeight - 18} r="0.9" fill="#ff6b35" className="animate-pulse" style={{ animationDelay: '0.35s' }} />
                        <circle cx="112" cy={fireBaseY - fireHeight - 15} r="1.1" fill="#ff9f1c" className="animate-pulse" style={{ animationDelay: '0.45s' }} />
                        <circle cx="100" cy={fireBaseY - fireHeight - 30} r="1" fill="#ffcc00" className="animate-pulse" style={{ animationDelay: '0.55s' }} />
                        <circle cx="96" cy={fireBaseY - fireHeight - 28} r="0.8" fill="#ff9f1c" className="animate-pulse" style={{ animationDelay: '0.65s' }} />
                        <circle cx="104" cy={fireBaseY - fireHeight - 32} r="0.7" fill="#ff6b35" className="animate-pulse" style={{ animationDelay: '0.75s' }} />
                    </g>
                )}

                {/* Raccoon - appears when muted */}
                {isMuted && raccoonX > 0 && (
                    <g
                        style={{
                            transform: `translateX(${raccoonX - 100}px)`,
                            transition: 'transform 0.1s linear'
                        }}
                    >
                        <ellipse cx="100" cy="162" rx="8" ry="5" fill="#6b6b6b" />
                        <circle cx={raccoonDirection > 0 ? 108 : 92} cy="158" r="5" fill="#7a7a7a" />
                        <circle cx={raccoonDirection > 0 ? 105 : 95} cy="154" r="2" fill="#5a5a5a" />
                        <circle cx={raccoonDirection > 0 ? 111 : 89} cy="154" r="2" fill="#5a5a5a" />
                        <ellipse cx={raccoonDirection > 0 ? 108 : 92} cy="158" rx="4" ry="2" fill="#2a2a2a" />
                        <circle cx={raccoonDirection > 0 ? 106 : 94} cy="158" r="1" fill="white" />
                        <circle cx={raccoonDirection > 0 ? 110 : 90} cy="158" r="1" fill="white" />
                        <circle cx={raccoonDirection > 0 ? 106 : 94} cy="158" r="0.5" fill="black" />
                        <circle cx={raccoonDirection > 0 ? 110 : 90} cy="158" r="0.5" fill="black" />
                        <circle cx={raccoonDirection > 0 ? 112 : 88} cy="159" r="1" fill="#2a2a2a" />
                        <ellipse cx={raccoonDirection > 0 ? 90 : 110} cy="160" rx="6" ry="3" fill="#6b6b6b" />
                        <rect x={raccoonDirection > 0 ? 86 : 106} y="158" width="2" height="4" fill="#3a3a3a" />
                        <rect x={raccoonDirection > 0 ? 90 : 110} y="158" width="2" height="4" fill="#3a3a3a" />
                        <rect x="94" y="165" width="3" height="4" rx="1" fill="#5a5a5a" />
                        <rect x="103" y="165" width="3" height="4" rx="1" fill="#5a5a5a" />
                    </g>
                )}
            </svg>
        </div>
    )
}

export default VisualDisplay
