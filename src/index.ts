import { Polygon } from './core/polygon'
import { generateVertices, generatePathsFromVertices, generate, draw } from './core/utils'

const polygen = {
	Polygon,
  generateVertices,
  generatePathsFromVertices,
  generate,
  draw
}
export default polygen

export { Polygon }

export type * from '../types'
