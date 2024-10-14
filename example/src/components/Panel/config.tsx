import { PolygonConfig } from '../../../../src'

export enum PolygonType {
  Polygon = 'polygon',
  Star = 'star'
}

export interface ConfigItem {
  label: string
  value: number
  min: number
  max: number
  filterTypes?: PolygonType[]
}

interface ConfigData {
  [key: string]: ConfigItem
}

const defaultRadius = Math.min(Math.round(document.body.clientWidth / 10), (document.body.clientHeight - 200) / 2)

export const configData: ConfigData = {
  npoints: {
    label: 'Points',
    value: 5,
    min: 3,
    max: 64
  },
  radius: {
    label: 'Outer Radius',
    value: defaultRadius,
    min: 1,
    max: 280
  },
  innerRadius: {
    label: 'Inner Radius',
    value: defaultRadius / 2,
    min: 1,
    max: 280,
    filterTypes: [PolygonType.Star]
  },
  cornerRadius: {
    label: 'Corner Radius',
    value: 0,
    min: 0,
    max: 140
  }
}

export const getInitialConfig = (): PolygonConfig => {
  return getConfig(configData)
}

export const getConfig = (configItems: ConfigData): PolygonConfig => {
  return Object.entries(configItems).reduce((acc, [key, item]) => {
    acc[key] = item.value
    return acc
  }, {} as PolygonConfig)
}
