import React, { useState, useEffect, useMemo } from 'react';
import { PolygonConfig } from 'poly-generator'
import { configData, getConfig, PolygonType, ConfigItem } from './config';
import './style.styl';

interface PanelProps {
  setPolygonConfig: (config: PolygonConfig) => void;
}

export default function Panel({ setPolygonConfig }: PanelProps) {
  const [type, setType] = useState(PolygonType.Polygon);
  const [configItems, setConfigItems] = useState<Record<string, ConfigItem>>(configData);

  const filterConfigItems = useMemo(
    () =>
      Object.fromEntries(
        Object.entries(configData).filter(([key]) => {
          const filterTypes = configData[key].filterTypes;
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


  const handleChangeConfig = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, valueAsNumber } = e.target;
    setConfigItems(prevItems => {  
      const newItems = { ...prevItems };  
      newItems[name].value = valueAsNumber;  
      return newItems;  
    })
  }

  const panelItems = Object.keys(configItems).map(key => {
    const configItem = configData[key];
    const value = configData[key].value;
    return (
      <li className="panel-item" key={key}>
        <div className="panel-item-content">
          <span className="panel-item-name">{configItem.label}</span>
          <span className="panel-item-value">{value}</span>
        </div>
        <input
          type="range"
          name={key}
          value={value}
          min={configItem.min}
          max={configItem.max}
          step={1}
          onChange={handleChangeConfig}
        />
      </li>
    );
  });

  return (
    <div className="panel">
      <div className="content">
        <div className="panel-tabs">
          <input
            type="radio"
            name="type"
            id="polygon"
            checked={type === PolygonType.Polygon}
            onChange={() => setType(PolygonType.Polygon)}
          ></input>
          <label htmlFor="polygon" className="tab">
            POLYGON
          </label>

          <input
            type="radio"
            name="type"
            id="star"
            checked={type === PolygonType.Star}
            onChange={() => setType(PolygonType.Star)}
          ></input>
          <label htmlFor="star" className="tab">
            STAR
          </label>
        </div>

        <ul className="panel-list">{panelItems}</ul>
      </div>
    </div>
  );
}
