import { poppins } from "@/themes/_muiTheme";
import {
  area,
  axisRight,
  axisTop,
  curveLinear,
  easeLinear,
  line,
  scaleLinear,
  scaleTime,
  select,
  selectAll,
  timeFormat,
  timeSecond,
  xml
} from "d3";

// const behindTenSeconds = () => {
//   const tenSeconds = new Date();
//   tenSeconds.setMilliseconds(0);
//   // tenSeconds.setSeconds(tenSeconds.getSeconds() - 10);
//   tenSeconds.setSeconds(tenSeconds.getSeconds() - 35);
//   return tenSeconds.getTime();
// };

// const forwardTwoSeconds = () => {
//   const elapsedTwoSeconds = new Date();
//   elapsedTwoSeconds.setMilliseconds(0);
//   elapsedTwoSeconds.setSeconds(elapsedTwoSeconds.getSeconds() + 3);
//   return elapsedTwoSeconds;
// };

const updateXAxis = (axis: any) => {
  axis.selectAll("path.domain").attr("stroke", "transparent");
  axis.selectAll("g.tick").select("line").attr("stroke", "transparent");
};

const updateYAxis = (axis: any) => {
  axis.selectAll("g.tick").select("line").attr("stroke", "#6778B126");
  axis
    .selectAll("g.tick")
    .selectAll("text")
    .attr("font-size", "12px")
    .attr("font-weight", "bold")
    .attr("fill", "#8F9BBF");
};

export const realtimeChart = (props: any) => {
  let data: Array<any> = [];
  const n = 60;
  const duration = 1000;
  const futureOffset = 3000;
  const futureCount = 3;

  let fillStyleSolid = "#5D89FF";
  let startingValue = 0;
  let startingTime = 0;
  let endingValue = 0;
  let endingTime = 0;
  let startvalue = 0;
  let currentvalue = 0;
  let currentPhase = "";
  let fillStyle = "url(#areaGradDefault)";
  const _mySave = "0, 0";

  selectAll("svg#chart > *").remove();
  const [width, height] = props.size;
  // const { xDomain } = props;
  const { yDomain } = props;
  const margin = { left: 0, right: 55, bottom: 0, top: 0 };
  let isUp: boolean = true;
  if (props.initalData) {
    data = props.initalData.slice();
  }

  const now = new Date();
  const xScale = scaleTime()
    .domain([
      new Date(now.getTime() - (n - 1) * 1000),
      new Date(now.getTime() + (futureCount + 1) * futureOffset)
    ])
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(yDomain)
    .range([height - margin.bottom, margin.top]);

  const onUpdateXScale = xScale.copy();
  const onUpdateYScale = yScale.copy();

  const xAxis = (g: any, scale = xScale) => {
    const drawAxis = axisTop(scale)
      .ticks(timeSecond.every(5))
      .tickFormat((domainValue: any) => {
        const formatTime = timeFormat("%I:%M:%S");
        return formatTime(domainValue);
      });
    // g.call(drawAxis);
  };

  const yAxis = (g: any, scale = onUpdateYScale) => {
    const drawAxis = axisRight(scale)
      .ticks(6)
      .tickSize(width - margin.right);
    g.call(drawAxis).call((g: any) => g.select(".domain").remove());
  };

  const lineFunc: any = line()
    .curve(curveLinear)
    .x((d: any) => onUpdateXScale(d.time))
    .y((d: any) => onUpdateYScale(Number(d.value)));

  const areaGenerator = area()
    // .curve(curveBasis)
    .x((d: any) => onUpdateXScale(d.time))
    .y0(height - margin.bottom)
    .y1((d: any) => onUpdateYScale(Number(d.value)));

  const svg: any = select("#chart")
    .attr("width", width)
    .attr("height", height - margin.bottom)
    .attr("font-size", "0.625rem")
    .attr("font-family", poppins.style.fontFamily)
    .attr("font-weight", "bold");

  svg.append("g").attr("class", "container");
  const conatiner = svg.selectAll("g.container");
  conatiner.append("defs");

  const realTimeContainer = conatiner
    .append("g")
    .attr("class", "realTimeContainer");
  const chartContainer = conatiner.append("g").attr("class", "chartContainer");

  const statusContainer = conatiner
    .append("g")
    .attr("class", "statusContainer");

  const lineContainer = conatiner.append("g").attr("class", "lineContainer");

  const VContainer = conatiner.append("g").attr("class", "VContainer");

  const axisGroup = conatiner.append("g").attr("class", "axisGroup");

  const xAxisG = axisGroup
    .append("g")
    .attr("class", "xAxis")
    .style("text-anchor", "end")
    .call(xAxis, onUpdateXScale);

  const yAxisG = axisGroup
    .append("g")
    .attr("class", "yAxis")
    .attr("text-anchor", "end")
    .call(yAxis, onUpdateYScale);

  updateXAxis(xAxisG);
  updateYAxis(yAxisG);

  lineContainer
    .append("line")
    .attr("class", "vlineStart")
    .style("stroke-width", 2)
    .style("stroke", "#fff")
    .style("opacity", "0")
    .transition()
    .duration(duration)
    .ease(easeLinear)
    .style("fill", "none")
    .attr("y1", height - margin.bottom)
    .attr("y2", height - margin.bottom)
    .attr("x1", onUpdateXScale(data[data.length - 1].time))
    .attr("x2", onUpdateXScale(data[data.length - 1].time));

  lineContainer
    .append("line")
    .attr("class", "vlineEnd")
    .style("stroke-width", 2)
    .style("stroke", "#fff")
    .style("opacity", "0")
    .style("fill", "none")
    .transition()
    .duration(duration)
    .ease(easeLinear)
    .attr("y1", height - margin.bottom)
    .attr("y2", height - margin.bottom)
    .attr("x1", onUpdateXScale(data[data.length - 1].time))
    .attr("x2", onUpdateXScale(data[data.length - 1].time));

  realTimeContainer
    .append("circle")
    .attr("class", "dotFace")
    .transition()
    .attr("cx", onUpdateXScale(data[data.length - 1].time))
    .attr("cy", onUpdateYScale(data[data.length - 1].value))
    .attr("r", 7)
    .attr("stroke-width", "4px")
    .attr("stroke", isUp ? "#34D16A" : "#FC704E")
    .attr("fill", "#fff")
    .attr(
      "transform",
      `translate(${
        onUpdateXScale(data[0].time) - onUpdateXScale(data[1].time)
      },0)`
    );

  xml("assets/d3/rect1.svg").then((xml: any) => {
    const svgGroup = xml.getElementById("statusRect");
    statusContainer.node().append(svgGroup);
    statusContainer
      .selectAll("path.vlineGameStatusRect")
      .style("transform", "scaleX(1.54)");

    const rocketUP = xml.getElementById("rocketUP");
    statusContainer.node().append(rocketUP);
    statusContainer.selectAll("path.rocketUP").attr("opacity", "0");

    const rocketDown = xml.getElementById("rocketDown");
    statusContainer.node().append(rocketDown);
    statusContainer.selectAll("path.rocketDown").attr("opacity", "0");

    statusContainer
      .append("text")
      .attr("class", "vlineGameStatusRectText")
      .attr("font-size", "10px")
      .attr("font-weight", "bold")
      .style("fill", "#fff")
      .attr("x", 20)
      .attr("y", "16")
      .text(() => "-0.05%");
  });

  // realTimeContainer
  //   .append("rect")
  //   .attr("class", "vlineGameStatusRect")
  //   .attr("rx", 5)
  //   .attr("width", 45)
  //   .attr("height", 20)
  //   .attr("cx", 0)
  //   .attr("cy", 0)
  //   .attr("r", 4)
  //   .attr("fill", "url(#boxGrad)")
  //   .attr("stroke-linejoin", "round")
  //   .attr("stroke-linecap", "round")
  //   .style("stroke", "#fff")
  //   .attr("stroke-width", "1px");

  // AREA GERIDENT 1
  (() => {
    conatiner
      .selectAll("defs")
      .append("linearGradient")
      .attr("id", "areaGradDown")
      .attr("x1", "0")
      .attr("y1", "0")
      .attr("x2", `0`)
      .attr("y2", `${height - margin.bottom}`)
      .attr("gradientUnits", "userSpaceOnUse");

    conatiner
      .select("linearGradient#areaGradDown")
      .append("stop")
      .attr("stop-color", "#F35C53")
      .attr("stop-opacity", "0.22");

    conatiner
      .select("linearGradient#areaGradDown")
      .append("stop")
      .attr("stop-color", "#F45D53")
      .attr("stop-opacity", "0")
      .attr("offset", "1");
  })();
  // AREA GERIDENT 1

  // AREA GERIDENT 2
  (() => {
    conatiner
      .selectAll("defs")
      .append("linearGradient")
      .attr("id", "areaGradUp")
      // .attr("gradientTransform", "rotate(177.55deg)")
      .attr("x1", "0")
      .attr("y1", "0")
      .attr("x2", `0`)
      .attr("y2", `${height - margin.bottom}`)
      .attr("gradientUnits", "userSpaceOnUse");

    conatiner
      .select("linearGradient#areaGradUp")
      .append("stop")
      .attr("stop-color", "#34D16A")
      .attr("stop-opacity", "0.22");

    conatiner
      .select("linearGradient#areaGradUp")
      .append("stop")
      .attr("stop-color", "#34D16A")
      .attr("stop-opacity", "0")
      .attr("offset", "1");
  })();

  // AREA GERIDENT 3
  (() => {
    conatiner
      .selectAll("defs")
      .append("linearGradient")
      .attr("id", "areaGradDefault")
      // .attr("gradientTransform", "rotate(177.55deg)")
      .attr("x1", "0")
      .attr("y1", "0")
      .attr("x2", `0`)
      .attr("y2", `${height - margin.bottom}`)
      .attr("gradientUnits", "userSpaceOnUse");

    conatiner
      .select("linearGradient#areaGradDefault")
      .append("stop")
      .attr("stop-color", "#5D89FF")
      .attr("stop-opacity", "0.23");

    conatiner
      .select("linearGradient#areaGradDefault")
      .append("stop")
      .attr("stop-color", "#5D89FF")
      .attr("stop-opacity", "0")
      .attr("offset", "1");
  })();

  // TOOLTIP GERIDENT
  (() => {
    conatiner
      .selectAll("defs")
      .append("linearGradient")
      .attr("id", "boxGrad")
      // .attr("gradientTransform", "rotate(156.26deg)")
      .attr("x1", "0")
      .attr("y1", "0")
      .attr("x2", "100%")
      .attr("y2", "0")
      .attr("shape-rendering", "crispEdges")
      .attr("gradientUnits", "userSpaceOnUse");

    conatiner
      .select("linearGradient#boxGrad")
      .append("stop")
      .attr("stop-color", "#ECF3FF")
      .attr("stop-opacity", "0.5");

    conatiner
      .select("linearGradient#boxGrad")
      .append("stop")
      .attr("stop-color", "#ECF3FF")
      .attr("stop-opacity", "0")
      .attr("offset", "1");
  })();
  // TOOLTIP GERIDENT

  (() => {
    lineContainer.append("g").attr("class", "flagOut");

    lineContainer
      .selectAll("g.flagOut")
      .append("image")
      .attr("xlink:href", "/assets/images/chartFlagStart.svg")
      .attr("class", "flagOutLineStart")
      .attr("width", 18)
      .attr("height", 22)
      .attr(
        "transform",
        `translate(${onUpdateXScale(data[data.length - 1].time) - 1}, -23)`
      )
      .style("opacity", 0);

    lineContainer
      .selectAll("g.flagOut")
      .append("image")
      .attr("xlink:href", "/assets/images/chartFlagEnd.svg")
      .attr("class", "flagOutLineEnd")
      .attr("width", 18)
      .attr("height", 22)
      .attr(
        "transform",
        `translate(${onUpdateXScale(data[data.length - 1].time) - 1}, -23)`
      )
      .style("opacity", 0);

    VContainer.append("rect")
      .attr("class", "vlineStartRect")
      .attr("rx", 10)

      .attr("width", 100)
      .attr("height", 30)
      .attr("x", onUpdateXScale(data[data.length - 1].value) - 100 / 2)
      .attr("y", onUpdateYScale(data[data.length - 1].time) - 30 / 2)
      .attr("r", 4)
      .attr("fill", "url(#boxGrad)")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .style("stroke", "#fff")
      .attr("stroke-width", "1px")
      .attr("opacity", "0");
    VContainer.append("text")
      .attr("class", "vlineStartText")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .style("fill", "#fff")
      .attr("x", onUpdateXScale(data[data.length - 1].value) - 100 / 2 + +7)
      .attr("y", onUpdateYScale(data[data.length - 1].time) - 30 / 2 + 6)
      .attr("opacity", "0")
      .text(() => "");

    VContainer.append("rect")
      .attr("class", "vlineEndRect")
      .attr("rx", 10)
      .attr("width", 100)
      .attr("height", 30)
      .attr("x", onUpdateXScale(data[data.length - 1].value) - 100 / 2)
      .attr("y", onUpdateYScale(data[data.length - 1].time) - 30 / 2)
      .attr("r", 4)
      .attr("fill", "url(#boxGrad)")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .style("stroke", "#FDDE41")
      .attr("stroke-width", "1px")
      .attr("opacity", "0");

    VContainer.append("text")
      .attr("class", "vlineEndText")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .attr("x", onUpdateXScale(data[data.length - 1].value) - 100 / 2 + +7)
      .attr("y", onUpdateYScale(data[data.length - 1].time) - 30 / 2 + 6)
      .style("fill", "#FDDE41")
      .attr("opacity", "0")
      .text(() => "");

    realTimeContainer
      .append("rect")
      .attr("class", "currentLineRect")
      .attr("rx", 10)
      .attr("width", 100)
      .attr("height", 30)
      .attr("x", `${width - margin.right / 2 - 100}`)
      .attr("y", height / 2)
      .attr("r", 4)
      .attr("fill", "url(#boxGrad)")
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .style("stroke", "#FDDE41")
      .attr("stroke-width", "1px")
      .attr("opacity", "0");

    realTimeContainer
      .append("text")
      .attr("class", "currentLineRectText")
      .attr("x", width - margin.right / 2 - 100 + 7)
      .attr("y", height / 2)
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .style("fill", "#FDDE41")
      .attr("opacity", "0")
      .text(() => "");

    realTimeContainer
      .append("text")
      .attr("class", "currentLineRectLabelText")
      .attr("x", width - margin.right / 2 - 100 + 7)
      .attr("y", height / 2)
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .style("fill", "#FDDE41")
      .attr("opacity", "0")
      .text(() => "Live Price");

    //Filter for the outside glow
    const filter = conatiner
      .selectAll("defs")
      .append("filter")
      .attr("id", "glow");
    filter
      .append("feGaussianBlur")
      .attr("stdDeviation", "8")
      .attr("result", "coloredBlur");
    const feMerge = filter.append("feMerge");
    feMerge.append("feMergeNode").attr("in", "coloredBlur");
    feMerge.append("feMergeNode").attr("in", "SourceGraphic");

    conatiner.append("clipPath").attr("id", "clipPathForStart");
    lineContainer.append("clipPath").attr("id", "clipPathRect");

    lineContainer
      .selectAll("clipPath#clipPathRect")
      .append("rect")
      .attr("class", "clipPathFull")
      .attr("width", width - margin.right + 15)
      .attr("height", height - margin.bottom + 30)
      .attr("x", 0)
      .attr("y", -30);

    lineContainer.attr("clip-path", "url(#clipPathRect)");

    conatiner
      .selectAll("clipPath#clipPathForStart")
      .append("rect")
      .attr("class", "clipPathRectStart")
      .attr("width", 40)
      .attr("height", 0)
      .attr("x", 0)
      .attr("y", 0);
    conatiner
      .selectAll("clipPath#clipPathForStart")
      .append("rect")
      .attr("class", "clipPathRectEnd")
      .attr("width", 40)
      .attr("height", 0)
      .attr("x", 0)
      .attr("y", 0);

    conatiner.append("clipPath").attr("id", "clipPathForEnd");
    conatiner
      .selectAll("clipPath#clipPathForEnd")
      .append("rect")
      .attr("class", "clipPathRectStart")
      .attr("width", 40)
      .attr("height", 0)
      .attr("x", 0)
      .attr("y", 0);
    conatiner
      .selectAll("clipPath#clipPathForEnd")
      .append("rect")
      .attr("class", "clipPathRectEnd")
      .attr("width", 40)
      .attr("height", 0)
      .attr("x", 0)
      .attr("y", 0);

    lineContainer
      .append("line")
      .attr("class", "hlineStart")
      .attr("stroke-dasharray", "5, 3")
      .attr("stroke-width", 1)
      .attr("stroke", "#fff")
      .attr("opacity", "0")
      .attr("fill", "none")
      .attr("x1", onUpdateXScale(data[data.length - 1].time) + 200 / 2)
      .attr("x2", onUpdateXScale(data[data.length - 1].time) + 200 / 2)
      .attr("y1", onUpdateYScale(data[data.length - 1].value))
      .attr("y2", onUpdateYScale(data[data.length - 1].value));

    const t = Number(startingValue).toFixed(2);
    const _width = t.length * 10 + 8;
    const current = data[data.length - 1];

    realTimeContainer
      .append("line")
      .attr("class", "currentHLine")
      .attr("stroke-dasharray", "5, 3")
      .attr("stroke-width", 1)
      .attr("stroke", "#FDDE41")
      .attr("opacity", "1")
      .attr("fill", "none")
      .attr(
        "x1",
        onUpdateXScale(current.time) +
          onUpdateXScale(data[0].time) -
          onUpdateXScale(data[1].time)
      )
      .attr("x2", width - margin.right / 2 - _width)
      .attr("y1", onUpdateYScale(Number(current.value)))
      .attr("y2", onUpdateYScale(Number(current.value)))
      .style("opacity", "0");
  })();

  // LINE

  const renderData = () => {
    // const { data } = props;

    const drawChart = () => {
      chartContainer
        .selectAll("path.line")
        .data([data])
        .enter()
        .append("path")
        .attr("class", "line")
        .attr("d", lineFunc)
        .attr("fill", "none")
        .attr("stroke-width", ".5px")
        .attr("stroke-opacity", ".8")
        .attr("stroke-dasharray", "0, 0")
        .attr("stroke", fillStyleSolid)
        .attr("filter", "url(#glow)");

      chartContainer
        .selectAll("path.line")
        .data([data])
        // .transition()
        // .duration(750)
        .attr("d", lineFunc)
        .attr("stroke", fillStyleSolid);

      const path = chartContainer.selectAll("path.area").data([data]);

      path
        .enter()
        .append("path")
        .attr("class", "area")
        .merge(path)
        .attr("d", areaGenerator)
        .attr("fill", fillStyle);

      chartContainer
        .selectAll("path")
        .attr("transform", null)
        .transition()
        .duration(duration)
        .ease(easeLinear)
        .attr(
          "transform",
          `translate(${
            onUpdateXScale(data[0].time) - onUpdateXScale(data[1].time)
          },0)`
        );
      // .attr(
      //   "transform",
      //   `translate(${
      //     onUpdateXScale(data[data.length - 2].time) -
      //     onUpdateXScale(data[data.length - 2].time)
      //   },0)`
      // );

      svg.selectAll("circle.dotFace").raise();
      svg
        .selectAll("circle.dotFace")
        .attr("r", 7)
        .transition()
        .duration(duration)
        .ease(easeLinear)
        .attr("stroke", fillStyleSolid)
        .attr("cx", onUpdateXScale(data[data.length - 1].time))
        .attr("cy", onUpdateYScale(data[data.length - 1].value))
        .attr(
          "transform",
          `translate(${
            onUpdateXScale(data[0].time) - onUpdateXScale(data[1].time)
          },0)`
        )
        .on("end", renderData);

      // console.log(data.length, "Length1");
    };

    const lastData = data[data.length - 1];
    (() => {
      const ___data = data.slice();
      // .filter(
      //   (item) =>
      //     new Date(item.time) >=
      //     new Date(new Date().setSeconds(new Date().getSeconds() - 35))
      // );

      const min = Math.round(
        Math.min(...___data.map((item: any) => Number(item.value)))
      );
      const max = Math.round(
        Math.max(...___data.map((item: any) => Number(item.value)))
      );
      // const minT = Math.round(
      //   Math.min(...___data.map((item: any) => Number(item.time)))
      // );
      // const xDomain = [Math.max(behindTenSeconds(), minT), forwardTwoSeconds()];
      // const xDomain = [new Date(data[0].time), new Date(forwardTwoSeconds())];

      const yDomain = [min - 5, max + 5];

      // onUpdateXScale.domain(xDomain);
      // const _domain = extent(data, (d: any) => d.time) as Array<number>;
      // onUpdateXScale.domain(_domain);
      const now = new Date();
      onUpdateXScale.domain([
        new Date(now.getTime() - (n - 1) * 1000),
        new Date(now.getTime() + (futureCount + 1) * futureOffset)
      ]);

      onUpdateYScale.domain(yDomain);
      margin.right = yDomain[yDomain.length - 1].toString().length * 8;

      xAxisG.transition().duration(duration).call(xAxis, onUpdateXScale);
      yAxisG.transition().duration(duration).call(yAxis, onUpdateYScale);
      yAxisG.select(".domain").remove();
      xAxisG.select(".domain").remove();
    })();

    // X AXIS TICK/LABEL
    updateXAxis(xAxisG);
    // xAxisG.selectAll("g.tick").select("line").attr("stroke", "transparent");
    // X AXIS TICK/LABEL

    // Y AXIS TICK/LABEL
    updateYAxis(yAxisG);

    // Y AXIS TICK/LABEL

    // dotFace POSITION

    startvalue <= 0 ||
      (currentvalue === startvalue && (fillStyleSolid = "#5D89FF"));
    startvalue > 0 &&
      currentvalue !== startvalue &&
      (isUp ? (fillStyleSolid = "#34D16A") : (fillStyleSolid = "#F45E53"));
    let percentageText = 0;
    startvalue &&
      (percentageText =
        ((Number(data[data.length - 1].value) - startvalue) / startvalue) *
        100);

    percentageText =
      percentageText >= 0 ? Math.abs(percentageText) : percentageText;

    startvalue <= 0 ||
      (currentvalue === startvalue && (fillStyle = "url(#areaGradDefault)"));
    startvalue > 0 &&
      currentvalue !== startvalue &&
      (isUp
        ? (fillStyle = "url(#areaGradUp)")
        : (fillStyle = "url(#areaGradDown)"));

    (() => {
      if (startingValue) {
        // statusContainer.style("opacity", "0");

        statusContainer
          .transition()
          .duration(duration)
          .ease(easeLinear)
          .attr("transform", () => {
            return `translate(${
              onUpdateXScale(lastData.time) -
              35 +
              onUpdateXScale(data[0].time) -
              onUpdateXScale(data[1].time)
            }, ${onUpdateYScale(lastData.value) - 35})`;
          })
          .style("opacity", "1");

        statusContainer
          .selectAll("path.vlineGameStatusRect")
          .transition()
          .duration(duration)
          .ease(easeLinear)
          .attr("fill", isUp ? "url(#_up)" : "url(#_down)");

        isUp
          ? (statusContainer
              .selectAll("path.rocketUP")
              .transition()
              .duration(duration)
              .ease(easeLinear)
              .attr("opacity", "1"),
            statusContainer
              .selectAll("path.rocketDown")
              .transition()
              .duration(duration)
              .ease(easeLinear)
              .attr("opacity", "0"))
          : (statusContainer
              .selectAll("path.rocketUP")
              .transition()
              .duration(duration)
              .ease(easeLinear)
              .attr("opacity", "0"),
            statusContainer
              .selectAll("path.rocketDown")
              .transition()
              .duration(duration)
              .ease(easeLinear)
              .attr("opacity", "1"));

        statusContainer
          .selectAll("text.vlineGameStatusRectText")
          .raise()
          .attr("x", percentageText > 0 ? "25" : "22")
          .text(`${percentageText.toFixed(4)}%`);
      } else {
        statusContainer
          .transition()
          .duration(duration)
          .ease(easeLinear)
          .attr("transform", () => {
            return `translate(${onUpdateXScale(lastData.time) - 35}, ${
              onUpdateYScale(lastData.value) + 100
            })`;
          })
          .style("opacity", "0");
      }
    })();
    // dotFace POSITION

    // CLIPPATH
    // VERTICAL START
    (() => {
      if (startingValue) {
        const t = Number(startingValue).toFixed(2);
        const _width = t.length * 10 + 8;
        const _height = t.length * 4;

        lineContainer
          .selectAll("line.hlineStart")
          .transition()
          .duration(duration)
          .ease(easeLinear)
          .attr("x1", onUpdateXScale(startingTime) + _width / 2)
          .attr("x2", onUpdateXScale(endingTime))
          .attr("y1", onUpdateYScale(Number(startingValue)))
          .attr("y2", onUpdateYScale(Number(startingValue)))
          .attr("opacity", "1");

        const height1 = onUpdateYScale(Number(startingValue)) - _height / 2;
        const height2 = height - onUpdateYScale(Number(startingValue));

        svg
          .selectAll("clipPath#clipPathForStart rect.clipPathRectStart")
          .transition()
          .duration(duration)
          .ease(easeLinear)
          .attr("x", onUpdateXScale(startingTime) - 20)
          .attr("y", 0)
          .attr("height", height1 > 0 ? height1 : 0);

        svg
          .selectAll("clipPath#clipPathForStart rect.clipPathRectEnd")
          .transition()
          .duration(duration)
          .ease(easeLinear)
          .attr("x", onUpdateXScale(startingTime) - 20)
          .attr("y", onUpdateYScale(Number(startingValue)) + _height / 2)
          .attr("height", height2 > 0 ? height2 : 0);

        lineContainer
          .selectAll("line.vlineStart")
          .transition()
          .duration(duration)
          .ease(easeLinear)
          .style("opacity", "1")
          .attr("x1", onUpdateXScale(startingTime))
          .attr("y1", margin.top)
          .attr("x2", onUpdateXScale(startingTime))
          .attr("y2", height - margin.bottom)
          .attr("clip-path", "url(#clipPathForStart)");
        // .attr("marker-start", "url(#flagOutLine)");

        //
        lineContainer
          .selectAll("image.flagOutLineStart")
          .transition()
          .duration(duration)
          .ease(easeLinear)
          .style("opacity", 1)
          .attr(
            "transform",
            `translate(${onUpdateXScale(startingTime) - 1}, -23)`
          );

        VContainer.selectAll("rect.vlineStartRect")
          .transition()
          .duration(duration)
          .ease(easeLinear)
          .attr("width", _width)
          .attr("height", _height)
          .attr("x", onUpdateXScale(startingTime) - _width / 2)
          .attr("y", onUpdateYScale(Number(startingValue)) - _height / 2)
          .attr("opacity", "1");

        VContainer.selectAll("text.vlineStartText")
          .transition()
          .duration(duration)
          .ease(easeLinear)
          .attr("x", onUpdateXScale(startingTime) - _width / 2 + 7)
          .attr("y", onUpdateYScale(Number(startingValue)) + 6)
          .attr("opacity", "1")
          .text(() => {
            return Number(startingValue).toFixed(2);
          });
      } else {
        console.log("ELSE");

        lineContainer.selectAll("line.hlineStart").attr("opacity", "0");
        lineContainer.selectAll("line.vlineStart").attr("opacity", "0");

        VContainer.selectAll("rect.vlineStartRect").attr("opacity", "0");
        VContainer.selectAll("text.vlineStartText").attr("opacity", "0");

        lineContainer.selectAll("image.flagOutLineStart").style("opacity", 0);

        // setTimeout(() => {
        //   VContainer.selectAll("rect.vlineStartRect")
        //     .transition()
        //     .attr("opacity", "0")
        //     .attr("x", -30)
        //     .attr("y", height / 2);
        //   VContainer.selectAll("text.vlineStartText")
        //     .transition()
        //     .attr("opacity", "0")
        //     .attr("x", -80)
        //     .attr("y", height / 2 + 20);
        // }, 5000);
      }
      // VContainer.selectAll("rect.vlineStartRect").raise();
      // VContainer.selectAll("text.vlineStartText").raise();
    })();
    // VERTICAL START

    // VERTICAL END

    (() => {
      if (endingTime) {
        const t = Number(endingValue).toFixed(2);
        const _width = t.length * 10 + 15;
        const _height = t.length * 4 + 15 || 0;

        const height1 = onUpdateYScale(Number(endingValue)) - _height / 2 || 0;
        const height2 = height - onUpdateYScale(Number(endingValue)) || 0;

        endingValue &&
          svg
            .selectAll("clipPath#clipPathForEnd rect.clipPathRectStart")
            .transition()
            .duration(duration)
            .ease(easeLinear)
            .attr("x", onUpdateXScale(endingTime) - 20)
            .attr("y", 0)
            .attr("height", height1 > 0 ? height1 : 0);

        endingValue &&
          svg
            .selectAll("clipPath#clipPathForEnd rect.clipPathRectEnd")
            .transition()
            .duration(duration)
            .ease(easeLinear)
            .attr("x", onUpdateXScale(endingTime) - 20)
            .attr("y", onUpdateYScale(Number(endingValue)) + _height / 2)
            .attr("height", height2 > 0 ? height2 : 0);

        lineContainer
          .selectAll("line.vlineEnd")
          .transition()
          .duration(duration)
          .ease(easeLinear)
          .style("opacity", "1")
          .attr("x1", onUpdateXScale(endingTime))
          .attr("y1", margin.top)
          .attr("x2", onUpdateXScale(endingTime))
          .attr("y2", height - margin.bottom)
          .attr("clip-path", "url(#clipPathForEnd)");

        lineContainer
          .selectAll("image.flagOutLineEnd")
          .transition()
          .duration(duration)
          .ease(easeLinear)
          .attr(
            "transform",
            `translate(${onUpdateXScale(endingTime) - 1}, -23)`
          )
          .style("opacity", "1");

        endingValue &&
          VContainer.selectAll("rect.vlineEndRect")
            .transition()
            .duration(duration)
            .ease(easeLinear)
            .attr("width", _width)
            .attr("height", _height)
            .attr("x", onUpdateXScale(endingTime) - _width / 2)
            .attr("y", onUpdateYScale(Number(endingValue)) - _height / 2)
            .attr("opacity", "1");

        endingValue &&
          VContainer.selectAll("text.vlineEndText")
            .transition()
            .duration(duration)
            .ease(easeLinear)
            .attr("x", onUpdateXScale(endingTime) - _width / 2 + 7)
            .attr("y", onUpdateYScale(Number(endingValue)) + 6)
            .attr("opacity", "1")
            .text(() => {
              return Number(endingValue).toFixed(2);
            });
      } else {
        // setTimeout(() => {
        //   VContainer.selectAll("rect.vlineEndRect")
        //     .transition()
        //     .attr("opacity", "0")
        //     .attr("x", width * 2)
        //     .attr("y", height / 2);
        //   VContainer.selectAll("text.vlineEndRect")
        //     .transition()
        //     .attr("opacity", "0")
        //     .attr("x", width * 2 + 30)
        //     .attr("y", height / 2 + 30);
        // }, 5000);
      }
    })();
    // VERTICAL END

    (() => {
      const current = data[data.length - 1];
      const t = Number(current.value).toFixed(4);
      const _width = t.length * 10 + 15;
      const _height = t.length * 4 + 15 || 0;

      svg
        .selectAll("rect.currentLineRect")

        .attr("width", _width)
        .attr("height", _height)
        .transition()
        .duration(duration)
        .ease(easeLinear)
        .attr("x", `${width - margin.right / 2 - _width}`)
        .attr("y", onUpdateYScale(Number(current.value)) - _height / 2)
        .attr("opacity", "1");

      svg
        .selectAll("text.currentLineRectLabelText")
        .transition()
        .duration(duration)
        .ease(easeLinear)
        .attr("x", width - margin.right / 2 - _width + 7)
        .attr("y", onUpdateYScale(Number(current.value)) - 5)
        .attr("opacity", "1");

      svg
        .selectAll("text.currentLineRectText")
        .transition()
        .duration(duration)
        .ease(easeLinear)
        .attr("x", width - margin.right / 2 - _width + 7)
        .attr("y", onUpdateYScale(Number(current.value)) + 13)
        .attr("opacity", "1")
        .text(() => {
          return Number(current.value).toFixed(4);
        });

      realTimeContainer
        .selectAll("line.currentHLine")
        .transition()
        .duration(duration)
        .ease(easeLinear)
        .style("opacity", "1")
        .attr(
          "x1",
          onUpdateXScale(current.time) +
            onUpdateXScale(data[0].time) -
            onUpdateXScale(data[1].time)
        )
        .attr("x2", width - margin.right / 2 - _width)
        .attr("y1", onUpdateYScale(Number(current.value)))
        .attr("y2", onUpdateYScale(Number(current.value)));
    })();

    // LINE
    drawChart();
    data.shift();
  };

  return (
    renderData(),
    Object.assign(svg, {
      update(props: any) {
        console.log("props", props);

        data.push(props.data);
        currentvalue = Number(data[data.length - 1].value);
        currentPhase = props?.currentPhase;
        if (props.start && props.start.time && props.start.value) {
          startingValue = +props.start.value;

          startingTime = props.start.time;
          startvalue = Number(startingValue);
          isUp = Number(data[data.length - 1].value) > startingValue;
        }

        if (props.isMiningEnd) {
          startvalue = 0;
          startingValue = 0;
          endingValue = 0;
        }
        if (props.end && props.end.time) {
          endingTime = props.end.time;
          isUp = false;
        }
        if (props.end && props.end.value) {
          endingValue = +props.end.value;
        }
      }
    })
  );
};

export default realtimeChart;
