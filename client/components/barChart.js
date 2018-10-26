import React, {Component} from "react";
import * as d3 from "d3";
import {XAxis, YAxis, YGrid} from "./chartComponent.js";
import Bars from "./Bars";

class BarChart extends Component {
    constructor(props) {
        super();
    }

    updateScale(props) {
        const data = props.data;
        const xScale = d3.scaleBand();
        const yScale = d3.scaleLinear();
        const xDomain = data.map(d => d.year);

        let keys = [];
        data.map(function(obj) {
            Object.keys(obj).map(function(k) {
                if (k!=="year" && !keys.includes(k)){
                    keys.push(k);
                }
            })
        });
        let series = d3.stack()
            .keys(keys)
            .offset(d3.stackOffsetDiverging)
            (data);
        series.forEach(function(arr) {
            arr.forEach(function(elem) {
                elem.forEach(function(e, i) {
                    if (!e) {
                        elem[i] = 0;
                    }
                })
            })
        });

        const yDomain = [d3.min(series, function(s) {
            return d3.min(s, function(d) { return d[0]; });
        }), d3.max(series, function(s) {
            return d3.max(s, function(d) { return d[1]; });
        })];

        xScale
            .domain(xDomain)
            .rangeRound([props.margin.left, props.width - props.margin.right])
            .paddingInner(props.paddingInner)
            .paddingOuter(props.paddingOuter);

        yScale
            .domain(yDomain)
            .rangeRound([props.height - props.margin.bottom, props.margin.top]);

        return {xScale, yScale};
    }

    static updatePlotSize(props) {
        const plotWidth =
            props.width - (props.margin.left + props.margin.right);
        const plotHeight =
            props.height - (props.margin.top + props.margin.bottom);
        return {plotWidth, plotHeight}
    }


    render() {
        const {xScale, yScale} = this.updateScale(this.props);

        const {plotWidth, plotHeight} = BarChart.updatePlotSize(this.props);

        const metaData = {
            xScale: xScale,
            yScale: yScale,
            plotWidth: plotWidth,
            plotHeight: plotHeight
        };
        let keys = [];
        this.props.data.map(function(obj) {
            Object.keys(obj).map(function(k) {
                if (k!=="year" && !keys.includes(k)){
                    keys.push(k);
                }
            })
        });

        let series = d3.stack()
            .keys(keys)
            .offset(d3.stackOffsetDiverging)
            (this.props.data);

        series.forEach(function(arr) {
            arr.forEach(function(elem) {
                elem.forEach(function(e, i) {
                    if (!e) {
                        elem[i] = 0;
                    }
                })
            })
        });


        const plotData = {
            plotData: series
        };
        console.info("metaData", metaData);
        console.info("plotData", plotData);
        return (
            <svg width={this.props.width} height={this.props.height}>
                <g
                    className="axisLayer"
                    width={plotWidth}
                    height={plotHeight}
                    transform={`translate(${this.props.margin.left}, ${0})`}
                >
                    <YGrid {...metaData} />
                    <XAxis {...metaData} transform={`translate(0,${plotHeight+this.props.margin.top})`}/>
                    <YAxis {...metaData} />
                </g>
                <g
                    className="plotLayer"
                    width={plotWidth}
                    height={plotHeight}
                    transform={`translate(${this.props.margin.left}, ${0})`}
                >
                    <Bars {...metaData} {...plotData}
                    />
                </g>
            </svg>
        );
    }
}

export default BarChart;