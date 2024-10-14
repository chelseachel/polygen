export interface PolygonConfig {
  x?: number;
  y?: number;
  npoints: number;
  radius: number;
  innerRadius?: number;
  cornerRadius?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  [key: string]: any;
}

export type Point = [number, number];

export type PathSegment =
  | { type: 'M'; x: number; y: number }
  | { type: 'L'; x: number; y: number }
  | { type: 'AT'; x1: number; y1: number; x2: number; y2: number; r: number };

export interface CanvasDrawingStyle {  
  fill: string | CanvasGradient | CanvasPattern; 
  stroke: string | CanvasGradient | CanvasPattern;  
  strokeWidth: number;  
  lineDash: number[];
  lineDashOffset: number;  
  lineCap: CanvasLineCap;  
  lineJoin: CanvasLineJoin;  
  miterLimit: number; 
  shadowColor: string; 
  shadowBlur: number;
  shadowOffsetX: number;
  shadowOffsetY: number;
}  
