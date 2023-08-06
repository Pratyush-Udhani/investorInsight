"use client"

import * as d3 from "d3";
import { useState, useEffect } from "react";
import { Axes } from "./axes";

const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };

type ScatterplotProps = {
  width: number;
  height: number;
  data: { x: number; y: number }[];
};

export const Scatterplot = ({ width, height, data }: ScatterplotProps) => {
    const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
    useEffect(() => {
      const handleResize = () => {
        setContainerSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      // Add the event listener for window resize
      window.addEventListener("resize", handleResize);

      // Call the handleResize function to set the initial size
      handleResize();

      // Remove the event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  // Layout. The div size is set by the given props.
  // The bounds (=area inside the axis) is calculated by substracting the margins
  const boundsWidth = containerSize.width - MARGIN.right - MARGIN.left;
  const boundsHeight = containerSize.height - MARGIN.top - MARGIN.bottom;

  // Scales
  const xScale = d3.scaleLinear().domain([0, 5]).range([0, width]);
  const yScale = d3.scaleLinear().domain([0, 7.88]).range([0,height]);
  // Build the shapes
  const allShapes = data.map((d, i) => {
    const xPos = xScale(d.x) ;
    const yPos = yScale(d.y);
    return (
      <circle
        key={i}
        r={13}
        cx={xPos}
        cy={yPos}
        opacity={1}
        stroke="#fff"
        fill="#fff"
        fillOpacity={0.4}
        strokeWidth={1}
      />
    );
  });

  return (
    <div className="flex flex-col h-full w-full">
        <div className="bg-black w-full h-20"/>
        <div className="w-full h-full flex justify-center">
            <div className="align-middle self-center w-fit h-fit">
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

