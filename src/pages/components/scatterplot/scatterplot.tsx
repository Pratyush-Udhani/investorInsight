import * as d3 from "d3";
import { useState, useEffect, useContext } from "react";
import styles from "./scatterplot.module.css";
import { Axes } from "./axes";
import { App, AppContext, Genre } from "~/pages/context/context";
import { getMathLog } from "~/utils/helpers";
import Tooltip from "./tooltip";
import { Types } from "~/pages/context/reducers";

type ScatterplotProps = {
    width: number;
    height: number;
    className: string
};

type InteractionData = App & {
    xPos: number;
    yPos: number;
}

export const Scatterplot = ({ width, height, className }: ScatterplotProps) => {
    const [interactionData, setInteractionData] = useState<InteractionData>();
    const { state, dispatch } = useContext(AppContext)
    const data = state.categoryData
    let apps: App[] = []
 // Scales
    const xScale = d3.scaleLinear().domain([2.5, 5]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 7.88]).range([height, 0]);
    const sizeScale = d3.scaleSqrt().domain([0, 10000000]).range([5, 20]);

  // Build the shapes
    data.genres.map((genre) => { 
        apps.push(...genre.apps)

    })
    const allShapes = apps.map((d, i) => {
            //console.log(d.price.replaceAll('$', ''))
            const color = +d.price.replaceAll('$','') === 0
                ? "#E9AF3F"
                : "#D34747"
            const isDimmed = state.interactionData;
            const className = isDimmed
              ? styles.scatterplotSquare + " " + styles.dimmed
              : styles.scatterplotSquare;
            const xPos = xScale(d.rating) ;
            const yPos = yScale(getMathLog(d.reviews_number));
            const size = sizeScale(+(d.installs.replaceAll(',', '')))
            
            return (
                <g
                    key={i}
                    onMouseMove={() =>
                        dispatch({
                            type: Types.SetInteractionData, 
                            payload: {
                                interactionData: {
                                    xPos: xPos, 
                                    yPos: yPos,
                                    app: d
                                }
                            }
                        })
                    }
                    onMouseLeave={() => 
                        dispatch({
                            type: Types.SetInteractionData,
                            payload: { interactionData: undefined }
                        })
                    }
                  >
                  <circle
                    key={i}
                    r={size}
                    cx={xPos}
                    cy={yPos}
                    opacity={0.5}
                    stroke={color}
                    fill={color}
                    fillOpacity={0.7}
                    strokeWidth={1}
                    className={className}
                  />
                  </g>
                );
        })

  return (
    <div className={`flex flex-row ${className}`}>
        <div className="basis-4/6 h-full flex flex-col">
            <div className="align-middle self-center">
              <svg width={800} height={650} viewBox="-50 150 650 200">
                <g>
                  <Axes
                    x={width / 2}
                    y={yScale(3.94)}
                    width={width}
                    height={height}
                  />
                  {allShapes}
                </g>
              </svg>
            </div>
            <div className="flex flex-row w-full justify-start">
                <div id="inner" className="flex flex-row items-start pr-9 mr-3">
                    <div className="rounded-full bg-yellow opacity-50 h-full aspect-square"/>
                    <p className="text-text_white h-fit ml-2 text-sm w-fit">Free</p>
                </div>
                <div id="inner" className="flex flex-row items-start pr-9 mr-3">
                    <div className="rounded-full bg-red opacity-50 h-full aspect-square"/>
                    <p className="text-text_white h-fit ml-2 text-sm w-fit">Paid</p>
                </div>
            </div>
        </div>
        <div className="basis-2/6 py-5"> 
            <Tooltip className="w-full h-full"/>
        </div>
    </div>
  );
};













