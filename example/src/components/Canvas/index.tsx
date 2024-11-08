import { useRef, useState, useEffect, useCallback } from 'react'
import { Polygon, PolygonConfig, CanvasDrawingStyle } from 'poly-generator'
import './style.styl'

interface CanvasSize {
  width: number | undefined
  height: number | undefined
}

interface CanvasProps {
  polygonConfig: PolygonConfig
  styleConfig: Partial<CanvasDrawingStyle>
}

export default function Canvas ({ polygonConfig, styleConfig }: CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    width: undefined,
    height: undefined
  })

  const handleHighResolutionCanvas = useCallback(() => {
    const canvas = canvasRef.current as HTMLCanvasElement
    const context = canvas.getContext('2d') as CanvasRenderingContext2D
    const ratio = window.devicePixelRatio
    const { offsetWidth, offsetHeight } = canvas
    canvas.width = offsetWidth * ratio
    canvas.height = offsetHeight * ratio
    context.scale(ratio, ratio)
  }, [])

  const handleDraw = () => {
    if (polygonConfig === undefined) return
    const canvas = canvasRef.current as HTMLCanvasElement
    const { offsetWidth, offsetHeight } = canvas
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D

    ctx?.clearRect(0, 0, offsetWidth, offsetHeight)

    const config: PolygonConfig = {
      x: offsetWidth / 2,
      y: offsetHeight / 2,
      ...polygonConfig
    }
    const polygon = new Polygon(config, styleConfig)
    polygon.draw(ctx)
  }

  useEffect(() => {  
    const handleResize = () => {  
      const container = containerRef.current as HTMLDivElement  
      const { width, height } = container.getBoundingClientRect()  
      setCanvasSize({ width, height })  
      handleHighResolutionCanvas()
    }  
    window.addEventListener('resize', handleResize)  
    handleResize()
    return () => {  
      window.removeEventListener('resize', handleResize)  
    }  
  }, [])

  useEffect(() => {
    handleDraw()
  }, [polygonConfig, styleConfig, canvasSize])

  return (
    <div className="canvas-container" ref={containerRef}>
      <canvas id="polygon-canvas" ref={canvasRef}></canvas>
    </div>
  )
}
