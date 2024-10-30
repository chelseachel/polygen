import { Point } from '../types';
import { computePolygonVertices, computeStarVertices } from '../src/utils/vertices';

describe('computePolygonVertices', () => {
	it('should compute points for a triangle', () => {
		const points: Point[] = computePolygonVertices(0, 0, 1, 3).map(([x, y]) => [parseFloat(x.toFixed(5)), parseFloat(y.toFixed(5))]);
		expect(points).toEqual([
			[0, -1],
			[0.86603, 0.5],
			[-0.86603, 0.5]
		]);
	});

	it('should compute points for a square', () => {
		const points: Point[] = computePolygonVertices(0, 0, 1, 4).map(([x, y]) => [parseFloat(x.toFixed(5)), parseFloat(y.toFixed(5))]);
		expect(points).toEqual([
			[0, -1],
			[1, 0],
			[0, 1],
			[-1, 0]
		]);
	});

	it('should compute points for a pentagon', () => {
		const points: Point[] = computePolygonVertices(0, 0, 1, 5).map(([x, y]) => [parseFloat(x.toFixed(5)), parseFloat(y.toFixed(5))]);
		expect(points).toEqual([
			[0, -1],
			[0.95106, -0.30902],
			[0.58779, 0.80902],
			[-0.58779, 0.80902],
			[-0.95106, -0.30902]
		]);
	});

	it('should compute points for a hexagon', () => {
		const points: Point[] = computePolygonVertices(0, 0, 1, 6).map(([x, y]) => [parseFloat(x.toFixed(5)), parseFloat(y.toFixed(5))]);
		expect(points).toEqual([
			[0, -1],
			[0.86603, -0.5],
			[0.86603, 0.5],
			[0, 1],
			[-0.86603, 0.5],
			[-0.86603, -0.5]
		]);
	});

	it('should compute points for a polygon with custom center', () => {
		const points: Point[] = computePolygonVertices(1, 1, 1, 4).map(([x, y]) => [parseFloat(x.toFixed(5)), parseFloat(y.toFixed(5))]);
		expect(points).toEqual([
			[1, 0],
			[2, 1],
			[1, 2],
			[0, 1]
		]);
	});
});

describe('computeStarVertices', () => {
	it('should compute points for a 5-pointed star', () => {
		const points: Point[] = computeStarVertices(0, 0, 1, 0.5, 5).map(([x, y]) => [parseFloat(x.toFixed(5)), parseFloat(y.toFixed(5))]);
		expect(points).toEqual([
			[0, -1],
			[0.29389, -0.40451],
			[0.95106, -0.30902],
			[0.47553, 0.15451],
			[0.58779, 0.80902],
			[0, 0.5],
			[-0.58779, 0.80902],
			[-0.47553, 0.15451],
			[-0.95106, -0.30902],
			[-0.29389, -0.40451]
		]);
	});

	it('should compute points for a 6-pointed star', () => {
		const points: Point[] = computeStarVertices(0, 0, 1, 0.5, 6).map(([x, y]) => [parseFloat(x.toFixed(5)), parseFloat(y.toFixed(5))]);
		expect(points).toEqual([
			[0, -1],
			[0.25, -0.43301],
			[0.86603, -0.5],
			[0.5, -0],
			[0.86603, 0.5],
			[0.25, 0.43301],
			[0, 1],
			[-0.25, 0.43301],
			[-0.86603, 0.5],
			[-0.5, 0],
			[-0.86603, -0.5],
			[-0.25, -0.43301]
		]);
	});

	it('should compute points for a star with custom center', () => {
		const points: Point[] = computeStarVertices(1, 1, 1, 0.5, 5).map(([x, y]) => [parseFloat(x.toFixed(5)), parseFloat(y.toFixed(5))]);
		expect(points).toEqual([
			[1, 0],
			[1.29389, 0.59549],
			[1.95106, 0.69098],
			[1.47553, 1.15451],
			[1.58779, 1.80902],
			[1, 1.5],
			[0.41221, 1.80902],
			[0.52447, 1.15451],
			[0.04894, 0.69098],
			[0.70611, 0.59549]
		]);
	});
});

describe('Vertices Generation', () => {
	describe('Rotation Tests', () => {
		test('polygon should rotate 90 degrees correctly', () => {
			const vertices = computePolygonVertices(0, 0, 100, 4, 90)
			expect(Math.round(vertices[0][0])).toBe(100) // x ≈ 100
			expect(Math.round(vertices[0][1])).toBe(0)   // y ≈ 0
		})

		test('star should rotate correctly', () => {
			const vertices = computeStarVertices(0, 0, 100, 50, 5, 72)
			const originalStar = computeStarVertices(0, 0, 100, 50, 5, 0)
			expect(Math.round(vertices[0][0])).toBeCloseTo(Math.round(originalStar[2][0]))
			expect(Math.round(vertices[0][1])).toBeCloseTo(Math.round(originalStar[2][1]))
		})

		test('rotation should not affect radius', () => {
			const angles = [0, 45, 90, 180, 270]
			const radius = 100
			angles.forEach(angle => {
				const vertices = computePolygonVertices(0, 0, radius, 6, angle)
				// 检查所有顶点到中心的距离是否保持不变
				vertices.forEach(point => {
					const distance = Math.sqrt(point[0] * point[0] + point[1] * point[1])
					expect(Math.round(distance)).toBe(radius)
				})
			})
		})
	})
})
