import { Polygon } from '../src/core/polygon';
import { generateVertices, generatePathsFromVertices, generate, draw } from '../src/core/utils';
import { computePolygonVertices, computeStarVertices } from '../src/utils/vertices';
import { PolygonConfig, Point, PathSegment } from '../types';

jest.mock('../src/utils/vertices');

const points: Point[] = [[100, 100], [150, 150], [200, 100]];
(computePolygonVertices as jest.Mock).mockReturnValue(points);
(computeStarVertices as jest.Mock).mockReturnValue(points);

describe('Polygon', () => {
  let mockConfig: PolygonConfig;

  beforeEach(() => {
    mockConfig = {
      x: 0,
      y: 0,
      radius: 100,
      npoints: 3,
      corner: 0,
      rotation: 0
    };
  });

  describe('Polygon Utilities', () => {

    beforeEach(() => {
      (computePolygonVertices as jest.Mock).mockClear();
      (computeStarVertices as jest.Mock).mockClear();
    });

    it('should compute points correctly for a polygon', () => {
      const result = generateVertices(mockConfig);
      expect(result).toEqual(points);
      expect(computePolygonVertices).toHaveBeenCalledWith(0, 0, 100, 3, 0);
    });
  
    it('should compute points correctly for a star', () => {
      const starConfig = { ...mockConfig, innerRadius: 50 };
      const result = generateVertices(starConfig);
      expect(result).toEqual(points);
      expect(computeStarVertices).toHaveBeenCalledWith(0, 0, 100, 50, 3, 0);
    });
  
    it('should generate paths from points correctly', () => {
      const points: Point[] = [[100, 100], [150, 150], [200, 100]];
      const paths: PathSegment[] = [
        { type: 'M', x: 100, y: 100 },
        { type: 'L', x: 150, y: 150 },
        { type: 'L', x: 200, y: 100 }
      ];
  
      const result = generatePathsFromVertices(points);
      expect(result).toEqual(paths);
    });
  
    it('should generate paths with rounded corner radius correctly', () => {
      const points: Point[] = [[100, 100], [150, 150], [200, 100]];
      const paths: PathSegment[] = [
        { type: 'M', x: 112.07106781186548, y: 100 },
        { type: 'AT', x1: 100, y1: 100, x2: 108.53553390593274, y2: 108.53553390593274, r: 5 },
        { type: 'L', x: 146.46446609406726, y: 146.46446609406726 },
        { type: 'AT', x1: 150, y1: 150, x2: 153.53553390593274, y2: 146.46446609406726, r: 5 },
        { type: 'L', x: 191.46446609406726, y: 108.53553390593274 },
        { type: 'AT', x1: 200, y1: 100, x2: 187.92893218813452, y2: 100, r: 5 }
      ];
  
      const result = generatePathsFromVertices(points, 5);
      expect(result).toEqual(paths);
    });

    it('should generate correct paths from configuration', () => {
      const paths: PathSegment[] = [
        { type: 'M', x: 100, y: 100 },
        { type: 'L', x: 150, y: 150 },
        { type: 'L', x: 200, y: 100 }
      ];
      const result = generate(mockConfig);
      expect(result).toEqual(paths);
    });

    it('should draw polygon paths to context', () => {
      const paths: PathSegment[] = [
      { type: 'M', x: 0, y: 0 },
      { type: 'L', x: 100, y: 0 },
      { type: 'L', x: 100, y: 100 },
      { type: 'L', x: 0, y: 100 }
      ];
      const ctx = {
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      arcTo: jest.fn(),
      closePath: jest.fn(),
      stroke: jest.fn(),
      fill: jest.fn(),
      setLineDash: jest.fn(),
      fillStyle: '',
      strokeStyle: '',
      lineWidth: 0,
      miterLimit: 0
      };
      const drawingStyle = {
      fill: 'red',
      stroke: 'blue',
      strokeWidth: 5
      };
      draw(paths, ctx as unknown as CanvasRenderingContext2D, drawingStyle);
      expect(ctx.beginPath).toHaveBeenCalled();
      expect(ctx.moveTo).toHaveBeenCalledWith(0, 0);
      expect(ctx.lineTo).toHaveBeenCalledWith(100, 0);
      expect(ctx.lineTo).toHaveBeenCalledWith(100, 100);
      expect(ctx.lineTo).toHaveBeenCalledWith(0, 100);
      expect(ctx.closePath).toHaveBeenCalled();
      expect(ctx.stroke).toHaveBeenCalled();
      expect(ctx.fill).toHaveBeenCalled();
      expect(ctx.fillStyle).toBe('red');
      expect(ctx.strokeStyle).toBe('blue');
      expect(ctx.lineWidth).toBe(5);
    });
  });

  describe('Polygon Class', () => {
    it('should generate correct geometry', () => {
      const polygon = new Polygon(mockConfig);

      const expectedPoints = computePolygonVertices(0, 0, 100, 3);
      const expectedPaths = generatePathsFromVertices(expectedPoints, 0);

      expect(polygon.points).toEqual(expectedPoints);
      expect(polygon.paths).toEqual(expectedPaths);
    });

    it('should draw polygon correctly', () => {
      const ctx = {
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        arcTo: jest.fn(),
        closePath: jest.fn(),
        stroke: jest.fn(),
        fill: jest.fn(),
        setLineDash: jest.fn(),
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 0,
        miterLimit: 0
      };
      const polygon = new Polygon(mockConfig);
      polygon.draw(ctx as unknown as CanvasRenderingContext2D);
      expect(ctx.beginPath).toHaveBeenCalled();
      expect(ctx.moveTo).toHaveBeenCalled();
      expect(ctx.lineTo).toHaveBeenCalled();
      expect(ctx.closePath).toHaveBeenCalled();
      expect(ctx.stroke).toHaveBeenCalled();
      expect(ctx.fill).toHaveBeenCalled();
    });

    it('should draw polygon with correct drawing style', () => {
      const ctx = {
        beginPath: jest.fn(),
        moveTo: jest.fn(),
        lineTo: jest.fn(),
        arcTo: jest.fn(),
        closePath: jest.fn(),
        stroke: jest.fn(),
        fill: jest.fn(),
        setLineDash: jest.fn(),
        fillStyle: '',
        strokeStyle: '',
        lineWidth: 0,
        miterLimit: 0
      };
      const drawingStyle = {
        fill: 'red',
        stroke: 'blue',
        strokeWidth: 5
      };
      const polygon = new Polygon(mockConfig);
      polygon.draw(ctx as unknown as CanvasRenderingContext2D, drawingStyle);
      expect(ctx.fillStyle).toBe('red');
      expect(ctx.strokeStyle).toBe('blue');
      expect(ctx.lineWidth).toBe(5);
    });
  });
});
