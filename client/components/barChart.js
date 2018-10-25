import React, {Component} from "react";
import * as d3 from "d3";
import {XAxis, YAxis, YGrid, Bars} from "./chartComponent.js";

class BarChart extends Component {
    constructor(props) {
        super();
    }

    componentDidMount() {

    }

    updateScale(props) {
        console.info("props")
        console.info(props);
        // const data = props.data;

        const xScale = d3.scaleBand();
        const yScale = d3.scaleLinear().nice();


        // const xDomain = data.map(props.xFn);
        // const xDomain = [2016,2017,2018,2019,2020]
        const xDomain = d3.range(12);
        // const yDomain = [0, d3.max(data, d => props.yFn(d))];
        const yDomain = [0, 50000];

        xScale
            .domain(xDomain)
            .range([0, props.width - (props.margin.left + props.margin.right)])
            .paddingInner(props.paddingInner)
            .paddingOuter(props.paddingOuter);

        yScale
            .domain(yDomain)
            .range([props.height - (props.margin.top + props.margin.bottom), 0]);

        return {xScale, yScale};
    }

    updatePlotSize(props) {
        const plotWidth =
            props.width - (props.margin.left + props.margin.right);
        const plotHeight =
            props.height - (props.margin.top + props.margin.bottom);

        return {plotWidth, plotHeight}
    }


    render() {
        const {xScale, yScale} = this.updateScale(this.props);

        const {plotWidth, plotHeight} = this.updatePlotSize(this.props);

        const metaData = {
            xScale: xScale,
            yScale: yScale,
            plotWidth: plotWidth,
            plotHeight: plotHeight
        };
        const plotData = {
            plotData: this.props.data.map((d, i) => {
                return (
                    d.map((new_d) => {
                        return {
                            id: i,
                            data: d,
                            x: xScale(i),
                            y: yScale(new_d[1]),
                            width: xScale.bandwidth() - 5,
                            height: plotHeight - yScale(new_d[0]) - yScale(new_d[1])
                        }
                }))

                // console.info(d);
                // return {
                //     id: i,
                //     data: d,
                //     x: xScale(i),
                //     y: yScale(d[1]),
                //     width: xScale.bandwidth() - 5,
                //     height: d.map((new_d) => {
                //         return plotHeight - yScale(new_d[0]) - yScale(new_d[1])
                //     })
                // };
            })
        };
        console.info("metaData", metaData);
        console.info("plotData", plotData);
        return (
            <svg width={this.props.width} height={this.props.height}>
                <g
                    className="axisLaeyr"
                    width={plotWidth}
                    height={plotHeight}
                    transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`}
                >
                    <YGrid {...metaData} />
                    <XAxis {...metaData} transform={`translate(0,${plotHeight})`}/>
                    <YAxis {...metaData} />
                </g>
                <g
                    className="plotLayer"
                    width={plotWidth}
                    height={plotHeight}
                    transform={`translate(${this.props.margin.left}, ${this.props.margin.top})`}
                >
                    <Bars {...metaData} {...plotData} />
                </g>
            </svg>
        );
    }
}

export default BarChart;