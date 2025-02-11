import React, { useState, useEffect, useMemo } from 'react';
import { PolygonConfig, CanvasDrawingStyle } from 'poly-generator';
import {
  baseFields,
  getConfig,
  PolygonType,
  ConfigFieldItem,
  BaseConfigFields,
  styleFields
} from './config';
import PanelItem from './PanelItem';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './style.styl';

interface PanelProps {
  setPolygonConfig: (config: PolygonConfig) => void;
  setStyleConfig: (config: Partial<CanvasDrawingStyle>) => void;
}

export default function Panel({
  setPolygonConfig,
  setStyleConfig
}: PanelProps) {
  const [type, setType] = useState(PolygonType.Polygon);
  const [configItems, setConfigItems] = useState<BaseConfigFields>(baseFields);
  const [styleConfigItems, setStyleConfigItems] =
    useState<Record<string, ConfigFieldItem>>(styleFields);
  const [isCodeMode, setIsCodeMode] = useState(false);

  const filterConfigItems = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(baseFields).filter(([key]) => {
          const filterTypes = baseFields[key].filterTypes;
          return !filterTypes || filterTypes.includes(type);
        })
      ),
    [type]
  );

  useEffect(() => {
    setConfigItems(filterConfigItems);
  }, [filterConfigItems]);

  useEffect(() => {
    setPolygonConfig(getConfig(configItems));
  }, [configItems]);

  useEffect(() => {
    setStyleConfig(getConfig(styleConfigItems));
  }, [styleConfigItems]);

  const handleChangeConfig = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, valueAsNumber } = e.target;
    setConfigItems(prevItems => {
      const newItems = { ...prevItems };
      newItems[name].value = valueAsNumber;
      return newItems;
    });
  };

  const handleChangeStyleConfig = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value, type } = e.target;
    setStyleConfigItems(prevItems => {
      const newItems = { ...prevItems };
      if (newItems[name]) {
        newItems[name].value = type === 'color' ? value.toUpperCase() : value;
      }
      return newItems;
    });
  };

  const togglePanelMode = () => {
    setIsCodeMode(prev => !prev);
  };

  const generateConfigCode = () => {
    const config = getConfig(configItems);
    const style = getConfig(styleConfigItems);
    
    return `const paths = polygen.generate({
  npoints: ${config.npoints},
  radius: ${config.radius},${type === PolygonType.Star ? `
  innerRadius: ${config.innerRadius},` : ''}
  cornerRadius: ${config.cornerRadius},
  rotation: ${config.rotation}
});

polygen.draw(paths, ctx, {
  strokeWidth: ${style.strokeWidth},
  fill: '${style.fill}',
  stroke: '${style.stroke}'
});`;
  };

  return (
    <div className="panel-area">
      <div className="panel">
        <div className="panel-tabs">
          <input
            type="radio"
            name="type"
            id="polygon"
            checked={type === PolygonType.Polygon}
            onChange={() => setType(PolygonType.Polygon)}
          />
          <label htmlFor="polygon" className="tab">
            POLYGON
          </label>

          <input
            type="radio"
            name="type"
            id="star"
            checked={type === PolygonType.Star}
            onChange={() => setType(PolygonType.Star)}
          />
          <label htmlFor="star" className="tab">
            STAR
          </label>
        </div>

        {!isCodeMode ? (
          <div className="section-settings">
            <ul className={`panel-list ${type}`}>
              {Object.keys(configItems).map(key => {
                const field = configItems[key];
                return (
                  <PanelItem
                    key={key}
                    name={key}
                    field={field}
                    onChange={handleChangeConfig}
                  />
                );
              })}
              {Object.keys(styleConfigItems).map(key => {
                const field = styleConfigItems[key];
                return (
                  <PanelItem
                    key={key}
                    name={key}
                    field={field}
                    onChange={handleChangeStyleConfig}
                  />
                );
              })}
            </ul>
          </div>
        ) : (
          <div className="section-code">
            <pre className="code-block">
              <code>{generateConfigCode()}</code>
            </pre>
          </div>
        )}
      </div>
      <div 
        className={`mode-button fa-solid fa-code ${isCodeMode ? 'active' : ''}`} 
        onClick={togglePanelMode}
      >
      </div>
    </div>
  );
}
