import React from "react";
import ReactECharts from "echarts-for-react";

const BasicTreemap = () => {
  const option = {
    series: [
      {
        type: "treemap",
        data: [
          {
            name: "nodeA",
            value: 10,
            children: [
              {
                name: "nodeAa",
                value: 4,
              },
              {
                name: "nodeAb",
                value: 6,
              },
            ],
          },
          {
            name: "nodeB",
            value: 20,
            children: [
              {
                name: "nodeBa",
                value: 20,
                children: [
                  {
                    name: "nodeBa1",
                    value: 20,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ReactECharts option={option} style={{ height: "100%" }} />
    </div>
  );
};

export default BasicTreemap;
