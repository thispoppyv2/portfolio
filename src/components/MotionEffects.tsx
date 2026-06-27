import React, { useEffect, useRef } from "react"

interface MotionEffectsProps {
  children: React.ReactNode
  // Middle page scroll config
  blurStrength?: number
  splitStrength?: number
  trailStrength?: number
  maxBlur?: number
  maxSplit?: number
  // Edge lens config
  edgeBlurStrength?: number
  edgeSplitStrength?: number
  edgeTrailStrength?: number
  minEdgeBlur?: number
  minEdgeSplit?: number
}

export function MotionEffects({
  children,
  blurStrength = 0.08,
  splitStrength = 0.12,
  trailStrength = 0.8,
  maxBlur = 15,
  maxSplit = 20,
  edgeBlurStrength = 0.15,
  edgeSplitStrength = 0.2,
  edgeTrailStrength = 0.8,
  minEdgeBlur = 3.5, // These values determine the always-on baseline
  minEdgeSplit = 4.0, // These values determine the always-on baseline
}: MotionEffectsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const topOverlayRef = useRef<HTMLDivElement>(null)
  const bottomOverlayRef = useRef<HTMLDivElement>(null)

  // Refs for middle page filter
  const redOffsetRef = useRef<SVGFeOffsetElement>(null)
  const blueOffsetRef = useRef<SVGFeOffsetElement>(null)
  const blurRef = useRef<SVGFeGaussianBlurElement>(null)
  const trailOffsetRef = useRef<SVGFeOffsetElement>(null)
  const noiseRef = useRef<SVGFeTurbulenceElement>(null)

  // Refs for edge page filter
  const edgeRedOffsetRef = useRef<SVGFeOffsetElement>(null)
  const edgeBlueOffsetRef = useRef<SVGFeOffsetElement>(null)
  const edgeBlurRef = useRef<SVGFeGaussianBlurElement>(null)
  const edgeTrailOffsetRef = useRef<SVGFeOffsetElement>(null)
  const edgeNoiseRef = useRef<SVGFeTurbulenceElement>(null)

  // Track purely vertical scroll
  const lastScrollY = useRef(0)
  const lastScrollTime = useRef(Date.now())

  // Motion physics (Y-axis only)
  const targetVy = useRef(0)
  const currentVy = useRef(0)

  useEffect(() => {
    if (typeof window === "undefined") return

    lastScrollY.current = window.scrollY
    lastScrollTime.current = Date.now()

    const handleScroll = () => {
      const now = Date.now()
      const dt = Math.max(1, now - lastScrollTime.current)
      const currentScrollY = window.scrollY
      const dy = currentScrollY - lastScrollY.current

      const scale = 3.5
      targetVy.current += (dy / dt) * scale

      lastScrollY.current = currentScrollY
      lastScrollTime.current = now
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    let animId = 0
    const update = () => {
      const dampening = 0.08
      currentVy.current += (targetVy.current - currentVy.current) * dampening
      targetVy.current *= 0.90

      const vy = currentVy.current
      const speed = Math.abs(vy)

      if (noiseRef.current) noiseRef.current.setAttribute("seed", `${Math.random() * 1000}`)
      if (edgeNoiseRef.current) edgeNoiseRef.current.setAttribute("seed", `${Math.random() * 1000}`)

      // 1. UPDATE VIEWPORT EDGES (Persistent Horizontal Effect)
      // These calculations always have a baseline value of minEdge...
      const ebx = minEdgeBlur + speed * edgeBlurStrength
      const esx = minEdgeSplit + speed * edgeSplitStrength
      const etx = -(vy >= 0 ? 1 : -1) * speed * edgeTrailStrength

      if (edgeBlurRef.current) {
        // Blur horizontally, 0 vertically, using dynamic ebx value
        edgeBlurRef.current.setAttribute("stdDeviation", String(`${ebx} 0`))
      }
      if (edgeRedOffsetRef.current) {
        edgeRedOffsetRef.current.setAttribute("dx", String(-esx))
        edgeRedOffsetRef.current.setAttribute("dy", "0")
      }
      if (edgeBlueOffsetRef.current) {
        edgeBlueOffsetRef.current.setAttribute("dx", String(esx))
        edgeBlueOffsetRef.current.setAttribute("dy", "0")
      }
      if (edgeTrailOffsetRef.current) {
        edgeTrailOffsetRef.current.setAttribute("dx", String(etx))
        edgeTrailOffsetRef.current.setAttribute("dy", "0")
      }

      const edgeFilterVal = "url(#edge-lens-filter)"

      // Always apply the filter to the overlays. Speed no longer triggers presence.
      if (topOverlayRef.current) {
        topOverlayRef.current.style.backdropFilter = edgeFilterVal
        topOverlayRef.current.style.webkitBackdropFilter = edgeFilterVal
      }
      if (bottomOverlayRef.current) {
        bottomOverlayRef.current.style.backdropFilter = edgeFilterVal
        bottomOverlayRef.current.style.webkitBackdropFilter = edgeFilterVal
      }

      // 2. UPDATE MIDDLE PAGE CONTENT (Vertical Scroll Effect, speed-dependent)
      if (speed > 0.05) {
        const by = Math.min(maxBlur, speed * blurStrength)
        const sy = Math.min(maxSplit, vy * splitStrength)
        const ty = -vy * trailStrength

        if (blurRef.current) blurRef.current.setAttribute("stdDeviation", String(`0 ${by}`))
        if (redOffsetRef.current) {
          redOffsetRef.current.setAttribute("dx", "0")
          redOffsetRef.current.setAttribute("dy", String(-sy))
        }
        if (blueOffsetRef.current) {
          blueOffsetRef.current.setAttribute("dx", "0")
          blueOffsetRef.current.setAttribute("dy", String(sy))
        }
        if (trailOffsetRef.current) {
          trailOffsetRef.current.setAttribute("dx", "0")
          trailOffsetRef.current.setAttribute("dy", String(ty))
        }

        const motionFilterVal = "url(#scroll-motion-filter)"
        if (containerRef.current && containerRef.current.style.filter !== motionFilterVal) {
          containerRef.current.style.filter = motionFilterVal
        }
      } else {
        if (containerRef.current && containerRef.current.style.filter !== "none") {
          containerRef.current.style.filter = "none"
        }
      }

      animId = requestAnimationFrame(update)
    }

    animId = requestAnimationFrame(update)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      cancelAnimationFrame(animId)
    }
  }, [
    blurStrength, splitStrength, trailStrength, maxBlur, maxSplit,
    edgeBlurStrength, edgeSplitStrength, edgeTrailStrength, minEdgeBlur, minEdgeSplit,
  ])

  return (
    <>
      <svg style={{ position: "absolute", width: 0, height: 0, pointerEvents: "none" }} aria-hidden="true">
        <defs>
          {/* Middle Filter - Vertical Movement */}
          <filter id="scroll-motion-filter" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" in="SourceGraphic" result="red" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" in="SourceGraphic" result="green" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" in="SourceGraphic" result="blue" />

            <feOffset ref={redOffsetRef} dx="0" dy="0" in="red" result="redShifted" />
            <feOffset ref={blueOffsetRef} dx="0" dy="0" in="blue" result="blueShifted" />

            <feComposite operator="arithmetic" k2="1" k3="1" in="redShifted" in2="green" result="rg" />
            <feComposite operator="arithmetic" k2="1" k3="1" in="rg" in2="blueShifted" result="rgb" />

            <feGaussianBlur ref={blurRef} stdDeviation="0 0" in="rgb" result="blurred" />
            <feOffset ref={trailOffsetRef} dx="0" dy="0" in="blurred" result="trail" />

            <feMerge result="mergedContent">
              <feMergeNode in="trail" />
              <feMergeNode in="rgb" />
            </feMerge>

            <feTurbulence ref={noiseRef} type="fractalNoise" baseFrequency="0.85" numOctaves="3" result="rawNoise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.05 0" in="rawNoise" result="subtleNoise" />
            <feBlend mode="overlay" in="subtleNoise" in2="mergedContent" />
          </filter>

          {/* Edge Filter - Horizontal Movement */}
          <filter id="edge-lens-filter" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" in="SourceGraphic" result="ered" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" in="SourceGraphic" result="egreen" />
            <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" in="SourceGraphic" result="eblue" />

            <feOffset ref={edgeRedOffsetRef} dx="0" dy="0" in="ered" result="eredShifted" />
            <feOffset ref={edgeBlueOffsetRef} dx="0" dy="0" in="eblue" result="eblueShifted" />

            <feComposite operator="arithmetic" k2="1" k3="1" in="eredShifted" in2="egreen" result="erg" />
            <feComposite operator="arithmetic" k2="1" k3="1" in="erg" in2="eblueShifted" result="ergb" />

            <feGaussianBlur ref={edgeBlurRef} stdDeviation="0 0" in="ergb" result="eblurred" />
            <feOffset ref={edgeTrailOffsetRef} dx="0" dy="0" in="eblurred" result="etrail" />

            <feMerge result="edgeMergedContent">
              <feMergeNode in="etrail" />
              <feMergeNode in="ergb" />
            </feMerge>

            <feTurbulence ref={edgeNoiseRef} type="fractalNoise" baseFrequency="0.85" numOctaves="3" result="rawEdgeNoise" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.05 0" in="rawEdgeNoise" result="subtleEdgeNoise" />
            <feBlend mode="overlay" in="subtleEdgeNoise" in2="edgeMergedContent" />
          </filter>
        </defs>
      </svg>

      {/* Main Content */}
      <div
        ref={containerRef}
        style={{
          transition: "filter 0.05s ease-out",
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          willChange: "filter",
        }}
      >
        {children}
      </div>

      {/* Top Edge Lens Overlay */}
      <div
        ref={topOverlayRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "25vh",
          pointerEvents: "none",
          zIndex: 9999,
          // Fixed: set default opacity to 1 so the persistent baseline is visible
          transition: "opacity 0.2s ease-out",
          opacity: 1,
          maskImage: "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.8) 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, rgba(0,0,0,0.8) 40%, transparent 100%)",
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          willChange: "backdrop-filter",
        }}
      />

      {/* Bottom Edge Lens Overlay */}
      <div
        ref={bottomOverlayRef}
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "25vh",
          pointerEvents: "none",
          zIndex: 9999,
          // Fixed: set default opacity to 1 so the persistent baseline is visible
          transition: "opacity 0.2s ease-out",
          opacity: 1,
          maskImage: "linear-gradient(to top, black 0%, rgba(0,0,0,0.8) 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, rgba(0,0,0,0.8) 40%, transparent 100%)",
          transform: "translate3d(0, 0, 0)",
          WebkitTransform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          willChange: "backdrop-filter",
        }}
      />
    </>
  )
}