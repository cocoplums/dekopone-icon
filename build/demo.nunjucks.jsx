// 用在组件文档里，展示所有 Icon
import React, { useState } from 'react';
import {
  Radio,
  Input,
  Affix,
  Space,
  Slider,
  Select,
  InputNumber,
} from '@arco-design/web-react';
import * as icons from '@dekopon/design/icon';

const RadioGroup = Radio.Group;

const svgData = JSON.parse('{{ svgData | safe }}');

const lineCaps = ['butt', 'round', 'square'];
const lineJoins = ['arcs', 'bevel', 'miter', 'miter-clip', 'round'];

const locale = {
  'zh-CN': {
    title: '图标配置',
    line: '线性图标',
    fill: '面性图标',
    color: '多色图标',
    search: '搜索图标，点击可复制图标用法',
    'stroke-width': '线宽：',
    size: '图标大小：',
    lineJoin: '拐角：',
    lineCap: '端点：',
    desc1: '全局配置（将以下的类添加到 css 中）:',
    desc2: (
      <span>
        单个组件的话可以直接将以上样式写到 <code>IconXXX</code> 的 <code>style</code> 中
      </span>
    ),
    add: '添加',
  },
};

export default function ({ lang = 'zh-CN' }) {
  const [type, setType] = useState('outline');
  const [filter, setFilter] = useState('');
  const [strokeWidth, setStrokeWidth] = useState(4);
  const [lineCap, setLineCap] = useState('butt');
  const [lineJoin, setLineJoin] = useState('miter');
  const [fontSize, setFontSize] = useState(32);
  const sliderStyle = { width: 120, marginRight: 20 };
  const inputNumberStyle = { width: 60 };
  const getWidthStyle = (width) => ({ width });
  const iconStyle = { fontSize };
  const spaceStyle = { justifyContent: 'space-between', whiteSpace: 'nowrap' };

  const maps = JSON.parse('{{ maps | safe }}')[lang];

  const t = locale[lang];

  return (
    <div>
      <div className="iconlist-bar">
        <RadioGroup
          size="large"
          type="button"
          mode="fill"
          name="type"
          defaultValue="outline"
          onChange={setType}
        >
          <Radio value="outline">{t.line}</Radio>
          <Radio value="fill">{t.fill}</Radio>
          <Radio value="color">{t.color}</Radio>
        </RadioGroup>
        <Input.Search size="large" onChange={setFilter} placeholder={t.search} />
      </div>
      <Affix offsetTop={60} className="iconlist-affix">
        <Space className="iconlist-operations" style={spaceStyle}>
          <Space>
            {t['stroke-width']}
            <Slider
              defaultValue={4}
              style={sliderStyle}
              showTicks
              min={1}
              max={5}
              onChange={(value) => setStrokeWidth(value)}
            />
            {t.size}
            <InputNumber
              min={14}
              max={80}
              value={fontSize}
              onChange={(value) => setFontSize(value)}
              style={inputNumberStyle}
            />
            {t.lineJoin}
            <Select
              options={lineJoins}
              value={lineJoin}
              onChange={(value) => setLineJoin(value)}
              style={getWidthStyle(100)}
            />
            {t.lineCap}
            <Select
              options={lineCaps}
              value={lineCap}
              onChange={(value) => setLineCap(value)}
              style={getWidthStyle(84)}
            />
          </Space>
        </Space>
      </Affix>
      {Object.keys(svgData).map((key) => {
        const filteredData =
          filter && svgData[key][type]
            ? svgData[key][type].filter((s) => {
                return s.componentName.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
              })
            : svgData[key][type];
        let className = 'iconlist-wrapper';
        if (key === 'out-of-date') {
          className += ' out-of-date';
        }
        return filteredData && filteredData.length ? (
          <div className={className} key={key}>
            <div className="iconlist-title" id={maps[key]}>
              {maps[key]}
            </div>
            <ul className="iconlist">
              {filteredData.map((n) => {
                const Tag = icons[n.componentName];
                return (
                  <li key={n.componentName} className="icon-cell" aria-label={n.componentName}>
                    <div className="icon-show">
                      <Tag
                        strokeWidth={strokeWidth}
                        strokeLinecap={lineCap}
                        strokeLinejoin={lineJoin}
                        style={iconStyle}
                      />
                    </div>
                    <p className="name">{n.componentName}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null;
      })}
    </div>
  );
}
