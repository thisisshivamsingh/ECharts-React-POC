import React, { useEffect } from "react";
import * as echarts from "echarts";
import echartsoption from "../echartsoption.json";

function EchartsOptionQuery() {
  useEffect(() => {
    const chartDom = document.getElementById("main");
    const myChart = echarts.init(chartDom);
    let option;

    myChart.showLoading();

    myChart.hideLoading();

    function convert(source, target, basePath) {
      for (let key in source) {
        let path = basePath ? basePath + "." + key : key;
        if (!key.match(/^\$/)) {
          target.children = target.children || [];
          const child = {
            name: path,
          };
          target.children.push(child);
          convert(source[key], child, path);
        }
      }
      if (!target.children) {
        target.value = source.$count || 1;
      } else {
        target.children.push({
          name: basePath,
          value: source.$count,
        });
      }
    }
    const data = {
      children: [],
    };
    convert(echartsoption, data, "");

    option = {
      title: {
        text: "ECharts Options",
        subtext: "2016/04",
        left: "leafDepth",
      },
      tooltip: {},
      series: [
        {
          name: "option",
          type: "treemap",
          visibleMin: 300,
          data: data.children,
          leafDepth: 2,
          levels: [
            {
              itemStyle: {
                borderColor: "#555",
                borderWidth: 4,
                gapWidth: 4,
              },
            },
            {
              colorSaturation: [0.3, 0.6],
              itemStyle: {
                borderColorSaturation: 0.7,
                gapWidth: 2,
                borderWidth: 2,
              },
            },
            {
              colorSaturation: [0.3, 0.5],
              itemStyle: {
                borderColorSaturation: 0.6,
                gapWidth: 1,
              },
            },
            {
              colorSaturation: [0.3, 0.5],
            },
          ],
        },
      ],
    };

    myChart.setOption(option);

    // Clean up the chart when the component unmounts
    return () => {
      myChart.dispose();
    };
  }, []);

  return <div id="main" style={{ width: "100%", height: "500px" }} />;
}

export default EchartsOptionQuery;
