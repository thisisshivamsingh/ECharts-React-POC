import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import data from "../demo.json";

function Demo() {
  const [option, setOption] = useState({});

  useEffect(() => {
    const diskData = data;

    const formattedData = diskData.map((item) => ({
      name: item.psntl,
      value: item.employee_count,
      color: item.compliance_percentage,
      cost_center_id: item.cost_center_id,
    }));

    formattedData.forEach((item) => {
      const color = `rgb(${Math.floor(255 * (1 - item.color))}, 0, ${Math.floor(
        255 * item.color
      )})`;

      item.itemStyle = {
        color: color,
      };
    });

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
        text: "Lorem Ipsum",
        left: "center",
      },
      tooltip: {
        formatter: function (info) {
          console.log("<<<info>>>", info);
          const value = info.value;
          const treePathInfo = info.treePathInfo;
          const treePath = [];
          for (let i = 1; i < treePathInfo.length; i++) {
            treePath.push(treePathInfo[i].name);
          }

          return [
            '<div class="tooltip-title">' + treePath.join("/") + "</div>",
            "Lorem Ipsum: " + value.toLocaleString() + " Employee Count",
          ].join("");
        },
      },
      series: [
        {
          name: "Lorem Ipsum",
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
          data: formattedData,
          color: ["red", "green"],
          colorMappingBy: "range",
          visualMap: {
            type: "continuous",
            min: 0.75,
            max: 1.0,
            inRange: {
              color: ["red", "green"],
            },
          },
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

export default Demo;
