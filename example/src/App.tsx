import { useState } from 'react'
import { PolygonConfig } from 'poly-generator'
import Canvas from './components/Canvas'
import Panel from './components/Panel'
import { getInitialConfig, getInitialStyleConfig } from './components/Panel/config'

export default function App() {
  const [polygonConfig, setPolygonConfig] = useState<PolygonConfig>(getInitialConfig())
  const [styleConfig, setStyleConfig] = useState(getInitialStyleConfig())

  return (
    <div className="app">
      <div className="header">
        <span className="name">Polygen</span> Playground</div>
      <div className="main">
        <Canvas polygonConfig={polygonConfig} styleConfig={styleConfig}></Canvas>
        <Panel setPolygonConfig={setPolygonConfig} setStyleConfig={setStyleConfig}></Panel>
      </div>
    </div>
  )
}

