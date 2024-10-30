import { Point } from '../../types'

const TWO_PI = Math.PI * 2

/**
 * Computes the vertices of a equilateral polygon.
 *
 * @param x - The x-coordinate of the center of the polygon. Defaults to 0.
 * @param y - The y-coordinate of the center of the polygon. Defaults to 0.
 * @param radius - The radius of the polygon.
 * @param npoints - The number of points (vertices) of the polygon.
 * @param rotation - The rotation angle in degrees.
 * @returns An array of points representing the vertices of the polygon.
 */
export function computePolygonVertices(
  x: number = 0,
  y: number = 0,
  radius: number,
  npoints: number,
  rotation: number = 0
): Point[] {
  const points: Point[] = []
  const angle = TWO_PI / npoints
  const startAngle = -Math.PI / 2 + (Math.PI / 180) * rotation
  for (let i = 0; i < npoints; i++) {
    const currentAngle = startAngle + i * angle
    const sx = x + Math.cos(currentAngle) * radius
    const sy = y + Math.sin(currentAngle) * radius
    points.push([sx, sy] as Point)
  }
  return points
}

/**
 * Computes the vertices of a star shape.
 *
 * @param x - The x-coordinate of the center of the star. Defaults to 0.
 * @param y - The y-coordinate of the center of the star. Defaults to 0.
 * @param radius - The outer radius of the star.
 * @param innerRadius - The inner radius of the star.
 * @param npoints - The number of points (or tips) of the star.
 * @param rotation - The rotation angle in degrees.
 * @returns An array of points representing the vertices of the star.
 */
export function computeStarVertices(
  x: number = 0,
  y: number = 0,
  radius: number,
  innerRadius: number,
  npoints: number,
  rotation: number = 0
): Point[] {
  const points: Point[] = []
  const angle = TWO_PI / npoints
  const halfAngle = angle / 2
  const startAngle = -Math.PI / 2 + (Math.PI / 180) * rotation
  for (let i = 0; i < npoints; i++) {
    const currentAngle = startAngle + i * angle
    let sx = x + Math.cos(currentAngle) * radius
    let sy = y + Math.sin(currentAngle) * radius
    points.push([sx, sy] as Point)
    sx = x + Math.cos(currentAngle + halfAngle) * innerRadius
    sy = y + Math.sin(currentAngle + halfAngle) * innerRadius
    points.push([sx, sy] as Point)
  }
  return points
}
// window.computePolygonPoints = computePolygonPoints
// window.computeStarPoints = computeStarPoints
