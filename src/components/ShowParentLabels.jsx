import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import data from "../data.json";

function ShowParentLabels() {
  const [option, setOption] = useState({});
  useEffect(() => {
    const diskData = data;
    console.log("<<<diskData>>>", diskData);
    const getLevelOption = () => {
      return [
        {
          itemStyle: {
            borderColor: "#777",
            borderWidth: 0,
            gapWidth: 1,
          },
          upperLabel: {
            show: false,
          },
        },
        {
          itemStyle: {
            borderColor: "#555",
            borderWidth: 5,
            gapWidth: 1,
          },
          emphasis: {
            itemStyle: {
              borderColor: "#ddd",
            },
          },
        },
        {
          colorSaturation: [0.35, 0.5],
          itemStyle: {
            borderWidth: 5,
            gapWidth: 1,
            borderColorSaturation: 0.6,
          },
        },
      ];
    };

    const options = {
      title: {
        text: "Disk Usage",
        left: "center",
      },
      tooltip: {
        formatter: function (info) {
          const value = info.value;
          const treePathInfo = info.treePathInfo;
          const treePath = [];
          for (let i = 1; i < treePathInfo.length; i++) {
            treePath.push(treePathInfo[i].name);
          }

          return [
            '<div class="tooltip-title">' + treePath.join("/") + "</div>",
            "Disk Usage: " + value.toLocaleString() + " KB",
          ].join("");
        },
      },
      series: [
        {
          name: "Disk Usage",
          type: "treemap",
          visibleMin: 300,
          label: {
            show: true,
            formatter: "{b}",
          },
          upperLabel: {
            show: true,
            height: 30,
          },
          itemStyle: {
            borderColor: "#fff",
          },
          levels: getLevelOption(),
          data: diskData,
        },
      ],
    };

    setOption(options);
  }, []);

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <ReactECharts option={option} style={{ height: "100%" }} />
    </div>
  );
}

export default ShowParentLabels;
