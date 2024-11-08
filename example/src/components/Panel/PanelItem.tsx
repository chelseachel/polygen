import React from 'react';
import { ConfigFieldItem } from './config';

interface PanelItemProps {
  field: ConfigFieldItem;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PanelItem: React.FC<PanelItemProps> = ({ field, name, onChange }) => {
  const colorOptions = [
    '#FFD056',
    '#D0F0E6',
    '#6E66FF',
    '#FF7F6E',
		'#FFFFFF',
    '#D4D4D7',
		'#000000'
  ];

  const handleColorClick = (color: string) => {
    const event = {
      target: {
        name: name,
        value: color,
      },
    } as React.ChangeEvent<HTMLInputElement>;
    onChange(event);
  };

  return (
    <li className="panel-item">
      <div className="panel-item-header">
        <span className="panel-item-name">{field.label}</span>
        <i className="panel-item-value">{field.value}</i>
      </div>
      {field.type === 'range' ? (
        <input
          type="range"
          name={name}
          value={field.value}
          min={field.min}
          max={field.max}
          step={1}
          onChange={onChange}
        />
      ) : (
        <div className="color-info">
          <div className="color-swatches">
            {colorOptions.map((color, index) => (
              <div
                key={index}
                className="color-swatch"
                style={{ backgroundColor: color }}
                onClick={() => handleColorClick(color)}
              />
            ))}
          </div>
          <div className="color-display">
            <input
              type="color"
              name={name}
              value={field.value}
              onChange={onChange}
            />
            <div
              className="color-value"
              style={{ backgroundColor: field.value as string }}
            />
          </div>
        </div>
      )}
    </li>
  );
};

export default PanelItem;
