import { useState } from 'react'
import { PolygonConfig } from 'poly-generator'
import Canvas from './components/Canvas'
import Panel from './components/Panel'
import { getInitialConfig } from './components/Panel/config'

export default function App() {
  const [polygonConfig, setPolygonConfig] = useState<PolygonConfig>(getInitialConfig())

  return (
    <div className="app">
      <div className="header">
        <span className="name">Polygon Generator</span> Playground</div>
      <div className="main">
        <Canvas polygonConfig={polygonConfig}></Canvas>
        <Panel setPolygonConfig={setPolygonConfig} ></Panel>
      </div>
    </div>
  )
}

