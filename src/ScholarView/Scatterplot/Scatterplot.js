
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import * as d3 from "d3";

import AxisLeft from './AxisLeft'
import AxisBottom from './AxisBottom'
import Tooltip from './Tooltip'
const MARGIN = { top: 60, right: 60, bottom: 60, left: 60 };

export const useDimensions = (targetRef) => {

  const getDimensions = () => {
    if (targetRef.current){
      console.log(targetRef.current.offsetWidth)
    }
    return {
      width: targetRef.current ? targetRef.current.offsetWidth : 0,
      height: targetRef.current ? targetRef.current.offsetHeight : 0
    };
  };

  const [dimensions, setDimensions] = useState(getDimensions);

  const handleResize = () => {
    setDimensions(getDimensions());
    console.log(dimensions);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useLayoutEffect(() => {
    handleResize();
  }, []);

  return dimensions;
}

const Scatterplot = ({data, setSelected, setHovered}) => {
    const svgContainer = useRef(null); // The PARENT of the SVG
    const dimensions = useDimensions(svgContainer)

    const boundsWidth = dimensions.width - MARGIN.right - MARGIN.left;
    const boundsHeight = dimensions.height - MARGIN.top - MARGIN.bottom;

    // Scales
    const yScale = d3.scaleLinear().domain([-110, 110]).range([boundsHeight, 0]);
    const xScale = d3.scaleLinear().domain([-110, 110]).range([0, boundsWidth]);  

    const allShapes = data.map((d, i) => {
      return (
        <circle
          key={i}
          r={4}
          cx={xScale(d.y)}
          cy={yScale(d.x)}
          opacity={1}
          stroke="#cb1dd1"
          fill="#cb1dd1"
          fillOpacity={0.2}
          strokeWidth={1}
          onMouseEnter={() => 
            setHovered({
              title: d.title
            })
          }
          onMouseLeave={() =>
            setHovered(null)
          }
          onClick={() => {
            setSelected({
              title: d.title,
              abstract: d.abstract,
              url: d.url,
              authors : d.authors,
              year : d.year
            })
          }}
        />
      );
    });

    return (
      <>
        <div ref={svgContainer} style={{height:'100%', paddingLeft:0, paddingRight:0}}>
          <svg width={dimensions.width} height={dimensions.height}>
            <g
              width={boundsWidth}
              height={boundsHeight}
              transform={`translate(${[MARGIN.left, MARGIN.top].join(',')})`}
            >
              {/* Y axis */}
              <AxisLeft yScale={yScale} pixelsPerTick={40} width={boundsWidth} />
    
              {/* X axis, use an additional translation to appear at the bottom */}
              <g transform={`translate(0, ${boundsHeight})`}>
                <AxisBottom
                  xScale={xScale}
                  pixelsPerTick={40}
                  height={boundsHeight}
                />
              </g>
    
              {/* Circles */}
              {allShapes}
            </g>
          </svg>
        </div>
      </>
    )
  }

export default Scatterplot