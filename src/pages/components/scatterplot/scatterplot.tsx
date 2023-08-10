import * as d3 from "d3";
import { useState, useEffect } from "react";
import styles from "./scatterplot.module.css";
import { Axes } from "./axes";
import { App, Genre } from "~/pages/context/context";
import { getMathLog } from "~/utils/helpers";

const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };

type ScatterplotProps = {
    width: number;
    height: number;
    data: Genre[]
};

type InteractionData = App & {
    xPos: number;
    yPos: number;
}
export const Scatterplot = ({ width, height, data }: ScatterplotProps) => {
    const [interactionData, setInteractionData] = useState<InteractionData>();
    let apps: App[] = []
 // Scales
    const xScale = d3.scaleLinear().domain([0, 5]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 7.88]).range([0,height]);
    const sizeScale = d3.scaleSqrt().domain([0, 10000000]).range([3, 40]);

  // Build the shapes
    data.map((genre) => { 
        apps.push(...genre.apps)
    })
    const allShapes = apps.map((d, i) => {
            const isDimmed = interactionData; 
            const className = isDimmed
              ? styles.scatterplotSquare + " " + styles.dimmed
              : styles.scatterplotSquare;
            const xPos = xScale(d.rating) ;
            const yPos = yScale(getMathLog(d.reviews_number));
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
                    r={1}
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
        })
    console.log(apps)

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

