// import styles from "./tooltip.module.css";

// Information needed to build the tooltip
// export type InteractionData = {
//   xPos: number;
//   yPos: number;
//   name: string;
// };


import React, { useState, useEffect } from 'react';

const Tooltip = ({ interactionData }) => {
  // useEffect(() => {
  //   console.log(interactionData)
  // })
  if (!interactionData) {
    return null;
  }

  

  return (
    <div
    //   className={styles.tooltip}
      style={{
        left: interactionData.xPos,
        top: interactionData.yPos,
      }}
    >
      {interactionData.title}
    </div>
  );
};

export default Tooltip