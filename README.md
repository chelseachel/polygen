# polygen
A versatile library for generating equilateral polygons and stars.

## Installation

```bash
npm install poly-generator
```

## Usage

Polygen provides two ways to use: utility functions and the Polygon class.

### Method 1: Using Utility Functions

Suitable for simple drawing scenarios, directly generate paths and draw:

```javascript
import polygen from 'poly-generator';

// Generate paths
const paths = polygen.generate({
  npoints: 5,      // Number of points
  radius: 100,     // Radius
  cornerRadius: 0, // Corner radius
  rotation: 0      // Rotation angle
});

// Draw on Canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

polygen.draw(paths, ctx, {
  strokeWidth: 2,
  fill: '#FFFFFF',
  stroke: '#000000'
});
```

You can also use it step by step:

```javascript
// 1. Generate vertices
const vertices = polygen.generateVertices({
  npoints: 6,
  radius: 100,
  rotation: 30
});

// 2. Generate paths from vertices
const paths = polygen.generatePathsFromVertices(vertices, 10); // With corner radius 10

// 3. Draw
polygen.draw(paths, ctx, {
  fill: '#FFD056',
  stroke: '#6E66FF'
});
```

### Method 2: Using Polygon Class

Suitable for scenarios where you need to maintain polygon state:

```javascript
import { Polygon } from 'poly-generator';

const polygon = new Polygon({
  npoints: 6,
  radius: 100,
  cornerRadius: 10,
  rotation: 30
});

// Access polygon properties
console.log(polygon.points);  // Get vertices
console.log(polygon.paths);   // Get path segments

// Draw with custom styles
polygon.draw(ctx, {
  fill: '#FFD056',
  stroke: '#6E66FF',
  strokeWidth: 2
});
```

### Generating Stars

Both methods support generating stars by adding the `innerRadius` parameter:

```javascript
// Using utility function
const starPaths = polygen.generate({
  npoints: 5,        // Number of points
  radius: 100,       // Outer radius
  innerRadius: 50,   // Inner radius
  cornerRadius: 0,   // Corner radius
  rotation: 0        // Rotation angle
});

// Or using Polygon class
const star = new Polygon({
  npoints: 5,
  radius: 100,
  innerRadius: 50,
  cornerRadius: 10
});
```

## API Documentation

### PolygonConfig Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| npoints | number | - | Number of vertices |
| radius | number | - | Outer radius |
| innerRadius | number | - | Inner radius (for stars only) |
| cornerRadius | number | 0 | Corner radius |
| rotation | number | 0 | Rotation angle (0-360) |
| x | number | 0 | Center x coordinate |
| y | number | 0 | Center y coordinate |

### Drawing Style Options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| fill | string | 'white' | Fill color |
| stroke | string | 'black' | Stroke color |
| strokeWidth | number | 2 | Stroke width |
| lineDash | number[] | [] | Line dash pattern |
| shadowColor | string | 'transparent' | Shadow color |
| shadowBlur | number | 0 | Shadow blur |
| shadowOffsetX | number | 0 | Shadow X offset |
| shadowOffsetY | number | 0 | Shadow Y offset |

## Live Demo

Visit [Polygen Playground]() to try it online. <!-- TODO: Demo URL -->

## License

[MIT](LICENSE)
