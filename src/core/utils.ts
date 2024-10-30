import { PolygonConfig, Point, PathSegment, CanvasDrawingStyle } from '../../types'
import { applyDrawingStyle } from '../utils/drawingStyle';
import { computePolygonVertices, computeStarVertices } from '../utils/vertices'

/**
   * Generates the vertices of the polygon based on the given configuration.
   * @param config - The configuration object for the polygon.
   * @returns An array of points defining the vertices of the polygon.
   */
export function generateVertices(config: PolygonConfig): Point[] {
	const { x, y, radius, innerRadius, npoints, rotation } = config;
	if (innerRadius) {
		return computeStarVertices(x, y, radius, innerRadius, npoints, rotation);
	} else {
		return computePolygonVertices(x, y, radius, npoints, rotation);
	}
}

/**
 * Generates path segments from the given points, optionally with rounded corners.
 * @param points - The points defining the vertices of the polygon.
 * @param cornerRadius - The radius of the rounded corners.
 * @returns An array of path segments defining the edges of the polygon.
 */
export function generatePathsFromVertices(vertices: Point[], cornerRadius: number = 0): PathSegment[] {
	const paths: PathSegment[] = [];
	vertices.forEach((point, idx, arr) => {
		if (cornerRadius > 0) {
			const nextPoint = arr[(idx + 1) % arr.length];
			const prevPoint = arr[(idx - 1 + arr.length) % arr.length];
			const [x1, y1] = point;
			const [x0, y0] = prevPoint;
			const [x2, y2] = nextPoint;

			// Calculate direction vectors
			const vx1 = x0 - x1;
			const vy1 = y0 - y1;
			const vx2 = x2 - x1;
			const vy2 = y2 - y1;

			// Calculate lengths of adjacent edges
			const len1 = Math.hypot(vx1, vy1);
			const len2 = Math.hypot(vx2, vy2);

			// Calculate angle between edges
			let angle = Math.atan2(vy2, vx2) - Math.atan2(vy1, vx1);
			if (angle < 0) {
				angle += 2 * Math.PI;
			}
			if (angle > Math.PI) {
				angle = 2 * Math.PI - angle;
			}

			const maxCorner = Math.min(len1, len2) / 2 * Math.tan(angle / 2);

			// Limit corner radius
			const r = Math.min(cornerRadius, maxCorner);

			// Distance from vertex to arc tangent points
			const offset1 = Math.min(r / Math.tan(angle / 2), len1 / 2);
			const offset2 = Math.min(r / Math.tan(angle / 2), len2 / 2);

			// Calculate arc tangent points
			let startX = x1 + (vx1 / len1) * offset1;
			let startY = y1 + (vy1 / len1) * offset1;
			let endX = x1 + (vx2 / len2) * offset2;
			let endY = y1 + (vy2 / len2) * offset2;

			if (idx === 0) {
				paths.push({ type: 'M', x: startX, y: startY });
			} else {
				paths.push({ type: 'L', x: startX, y: startY });
			}
			paths.push({ type: 'AT', x1, y1, x2: endX, y2: endY, r });
		} else {
			paths.push({ type: idx === 0 ? 'M' : 'L', x: point[0], y: point[1] });
		}
	});
	return paths;
}

/**
 * Generates the path segments for the polygon based on the given configuration.
 * @param config - The configuration object for the polygon.
 * @returns An array of path segments defining the edges of the polygon.
 */
export function generate(config: PolygonConfig): PathSegment[] {
	const vertices = generateVertices(config);
	const paths: PathSegment[] = generatePathsFromVertices(vertices, config.cornerRadius);
	return paths;
}

/**
 * Draws the polygon on the given canvas rendering context.
 *
 * @param paths - An array of path segments defining the edges of the polygon. 
 * @param ctx - The canvas rendering context.
 * @param drawingStyle - Optional drawing style object for the polygon.
 */
export function draw(paths: PathSegment[], ctx: CanvasRenderingContext2D | null, drawingStyle?: Partial<CanvasDrawingStyle>): void {
	if (!ctx) return;
	applyDrawingStyle(ctx, drawingStyle);
	ctx.beginPath();
	paths.forEach((item) => {
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
