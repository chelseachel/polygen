import { PolygonConfig, CanvasDrawingStyle } from '../../../../src'

export enum PolygonType {
  Polygon = 'polygon',
  Star = 'star'
}

interface ConfigFieldRange {
  label: string;
  type: 'range',
  min: number;
  max: number;
  value: number;
  filterTypes?: PolygonType[];
}

interface ConfigFieldColor {
  label: string;
  type: 'color';
  value: string
}

export type ConfigFieldItem = ConfigFieldRange | ConfigFieldColor

export interface BaseConfigFields {
  [key: string]: ConfigFieldRange;
}

const defaultRadius = Math.min(Math.round(document.body.clientWidth / 10), (document.body.clientHeight - 200) / 2)

export const baseFields: BaseConfigFields = {
  npoints: {
    label: 'Points',
    type: 'range',
    value: 5,
    min: 3,
    max: 64
  },
  radius: {
    label: 'Outer Radius',
    type: 'range',
    value: defaultRadius,
    min: 1,
    max: 280
  },
  innerRadius: {
    label: 'Inner Radius',
    type: 'range',
    value: Math.round(defaultRadius / 2),
    min: 1,
    max: 280,
    filterTypes: [PolygonType.Star]
  },
  cornerRadius: {
    label: 'Corner Radius',
    type: 'range',
    value: 0,
    min: 0,
    max: 140
  },
  rotation: {
    label: 'Rotation',
    type: 'range',
    value: 0,
    min: 0,
    max: 360
  }
}

export const styleFields: Record<string, ConfigFieldItem> = {
  strokeWidth: {
    label: 'Stroke Width',
    type: 'range',
    value: 2,
    min: 1,
    max: 20,
  },
  fill: {
    label: 'Fill',
    type: 'color',
    value: '#FFFFFF'
  },
  stroke: {
    label: 'Stroke',
    type: 'color',
    value: '#000000'
  }
};

export const getInitialConfig = (): PolygonConfig => {
  return getConfig(baseFields)
}

export const getInitialStyleConfig = (): Partial<CanvasDrawingStyle> => {
  return getConfig(styleFields)
}

export const getConfig = (configItems: Record<string, ConfigFieldItem>): PolygonConfig => {
  return Object.entries(configItems).reduce((acc, [key, item]) => {
    acc[key] = item.value
    return acc
  }, {} as PolygonConfig)
}
