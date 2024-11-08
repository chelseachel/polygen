import { CanvasDrawingStyle } from '../../types'

const defaultDrawingStyle: CanvasDrawingStyle = {
	fill: 'white',
  stroke: 'black',
  strokeWidth: 2,
  lineDash: [],
  lineDashOffset: 0,
  lineCap: 'butt',
  lineJoin: 'miter',
  miterLimit: 10,
  shadowColor: 'transparent',
  shadowBlur: 0,
  shadowOffsetX: 0,
  shadowOffsetY: 0,
}

export function applyDrawingStyle(ctx: CanvasRenderingContext2D, drawingStyle: Partial<CanvasDrawingStyle> = {}): void {
	const allStyle = { ...defaultDrawingStyle, ...drawingStyle }
	const { fill, stroke, strokeWidth, lineDash, ...style  } = allStyle

	ctx.fillStyle = fill
	ctx.strokeStyle = stroke
	ctx.lineWidth = strokeWidth	
	ctx.setLineDash(lineDash)
	ctx.lineDashOffset = style.lineDashOffset
	ctx.lineCap = style.lineCap
	ctx.lineJoin = style.lineJoin
	ctx.miterLimit = Math.min(style.miterLimit, strokeWidth * 2)
	ctx.shadowOffsetX = style.shadowOffsetX;  
	ctx.shadowOffsetY = style.shadowOffsetY;  
	ctx.shadowBlur = style.shadowBlur;  
	ctx.shadowColor = style.shadowColor;  
}  
