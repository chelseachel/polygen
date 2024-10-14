import { PolygonConfig, Point, PathSegment, CanvasDrawingStyle } from '../../types'
import { applyDrawingStyle } from '../utils/drawingStyle';
import { generateVertices, generatePathsFromVertices } from './utils';

export class Polygon {
  public config: PolygonConfig;
  public drawingStyle: Partial<CanvasDrawingStyle> = {};
  public points: Point[] = [];
  public paths: PathSegment[] = [];

  /**
   * This constructor initializes a Polygon object with the provided configuration
   * and generates its vertices and paths based on that configuration.
   * @param config - The configuration object for the polygon. 
   *                 This object defines the properties of the polygon, including its
   *                 position, size, number of sides, and optional styling attributes.
	 * @param drawingStyle - Optional drawing style object for the polygon.
   */
  constructor(config: PolygonConfig, drawingStyle?: Partial<CanvasDrawingStyle>) {
    this.config = config;
    this.drawingStyle = drawingStyle || {};
    this.generate(config);
  }

  /**
   * Generates the vertices and paths of the polygon based on the given configuration.
   * @param config - The configuration object for the polygon.
   */
  private generate(config: PolygonConfig): void {
    this.points = generateVertices(config);
    this.paths = generatePathsFromVertices(this.points, config.cornerRadius);
  }

  /**
   * Draws the polygon on the given canvas rendering context.
   * @param ctx - The canvas rendering context.
   */
  public draw(ctx: CanvasRenderingContext2D | null): void {
    if (!ctx) return;
    applyDrawingStyle(ctx, this.drawingStyle);
    ctx.beginPath();
    this.paths.forEach((item) => {
      switch (item.type) {
        case 'M':
          ctx.moveTo(item.x, item.y);
          break;
        case 'L':
          ctx.lineTo(item.x, item.y);
          break;
        case 'AT':
          ctx.arcTo(item.x1, item.y1, item.x2, item.y2, item.r);
          break;
        default:
          break;
      }
    });
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
}
