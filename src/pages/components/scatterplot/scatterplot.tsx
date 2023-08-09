"use client"

import * as d3 from "d3";
import { useState, useEffect } from "react";
import styles from "./scatterplot.module.css";
import { Axes } from "./axes";

const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };

type ScatterplotProps = {
  width: number;
  height: number;
  data: { x: number; y: number; size: number }[];
};
type InteractionData = {x: number, y: number, size: number} & {
    xPos: number;
    yPos: number;
}
export const Scatterplot = ({ width, height, data }: ScatterplotProps) => {
    const [interactionData, setInteractionData] = useState<InteractionData>();
    const sortedData = data.sort((a, b) => b.size - a.size);

 // Scales
  const xScale = d3.scaleLinear().domain([0, 5]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 7.88]).range([0,height]);
  const sizeScale = d3.scaleSqrt().domain([0, 10000000]).range([3, 40]);

  // Build the shapes
  const allShapes = data.map((d, i) => {
    const size = sizeScale(d.size);
      const isDimmed = interactionData; 
    const className = isDimmed
      ? styles.scatterplotSquare + " " + styles.dimmed
      : styles.scatterplotSquare;
    const xPos = xScale(d.x) ;
    const yPos = yScale(d.y);
    return (
    <g
        key={i}
        onMouseMove={() =>
          setInteractionData({
            xPos,
            yPos,
            ...d,
          })
        }
        onMouseLeave={() => setInteractionData(undefined)}
      >
      <circle
        key={i}
        r={size}
        cx={xPos}
        cy={yPos}
        opacity={1}
        stroke="#fff"
        fill="#fff"
        fillOpacity={0.4}
        strokeWidth={1}
        className={className}
      />
      </g>
    );
  });

  return (
    <div className="flex flex-col h-full w-full">
        <div className="bg-black w-full h-20"/>
        <div className="w-full h-full flex justify-center">
            <div className="align-middle self-center p-20">
              <svg width={width} height={height}>
                <g>
                  <Axes
                    x={xScale(2.5)}
                    y={yScale(3.94)}
                    width={width}
                    height={height}
                  />
                  {allShapes}
                </g>
              </svg>
            </div>
        </div>
        <div className="bg-black w-full h-20"/>
    </div>
  );
};

