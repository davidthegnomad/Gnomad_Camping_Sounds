import { useMemo } from 'react'

function VolumeSlider({ icon, label, value, onChange, isActive }) {
    const sliderBackground = useMemo(() => {
        const percentage = value
        return `linear-gradient(to top, 
      rgba(255, 107, 53, 0.6) 0%, 
      rgba(255, 159, 28, 0.4) ${percentage}%, 
      rgba(255, 255, 255, 0.1) ${percentage}%, 
      rgba(255, 255, 255, 0.05) 100%)`
    }, [value])

    return (
        <div className="flex flex-col items-center gap-3">
            {/* Icon */}
            <div
                className={`text-3xl transition-all duration-300 ${isActive ? 'scale-110 drop-shadow-lg' : 'opacity-60'
                    }`}
                style={{
                    filter: isActive ? 'drop-shadow(0 0 8px rgba(255, 159, 28, 0.5))' : 'none'
                }}
            >
                {icon}
            </div>

            {/* Slider Container */}
            <div
                className="relative h-40 w-3 rounded-full overflow-hidden"
                style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    boxShadow: isActive ? '0 0 15px rgba(255, 107, 53, 0.3)' : 'none',
                    transition: 'box-shadow 0.3s ease-out',
                }}
            >
                {/* Fill indicator */}
                <div
                    className="absolute bottom-0 left-0 right-0 rounded-full transition-all duration-150"
                    style={{
                        height: `${value}%`,
                        background: 'linear-gradient(to top, #ff6b35, #ff9f1c)',
                        boxShadow: isActive ? '0 0 10px rgba(255, 107, 53, 0.5)' : 'none',
                    }}
                />

                {/* Invisible range input overlay */}
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value, 10))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    style={{
                        writingMode: 'vertical-lr',
                        direction: 'rtl',
                    }}
                    aria-label={`${label} volume`}
                />
            </div>

            {/* Label */}
            <span className={`text-xs font-medium transition-colors duration-300 ${isActive ? 'text-ember-glow' : 'text-gray-500'
                }`}>
                {label}
            </span>

            {/* Volume percentage */}
            <span className="text-xs text-gray-600">
                {value}%
            </span>
        </div>
    )
}

export default VolumeSlider
