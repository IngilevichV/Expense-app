import * as d3 from "d3";
import React, { Component } from "react";

export default function D3blackbox(d3render) {
    return class Blackbox extends Component {
        componentDidMount() {
            d3render.call(this);
        }
        componentDidUpdate() {
            d3render.call(this);
        }

        render() {
            const transform = this.props.transform || "";
            return <g transform={transform} ref="anchor" />;
        }
    };
}

export const XAxis = D3blackbox(function() {
    const axis = d3.axisBottom()
        // .tickFormat(d => d)
        .scale(this.props.xScale);

    d3.select(this.refs.anchor)
        .classed("xAxis", true)
        .transition()
        .call(axis);
});

export const YAxis = D3blackbox(function() {
    const axis = d3
        .axisLeft()
        // .tickFormat(d => d)
        .scale(this.props.yScale);

    d3.select(this.refs.anchor)
        .classed("yAxis", true)
        .transition()
        .call(axis);
});

export const YGrid = D3blackbox(function() {
    const axis = d3
        .axisRight()
        .tickFormat(d => null)
        .scale(this.props.yScale)
        .tickSizeOuter(0)
        .tickSizeInner(this.props.plotWidth);

    d3.select(this.refs.anchor)
        .classed("yGrid", true)
        .call(axis);
});

// export const Bars = D3blackbox(function() {
//     console.info("bars, props");
//     console.info(this.props.plotData);
//     console.info(d3.select(this.refs.anchor));
//     const parent = d3.select(this.refs.anchor).selectAll("g").data(this.props.plotData)
//         .selectAll("rect")
//         .data(function(d) {console.info("d"); console.info(d); return d; });
//     console.info("parent");
//     console.info(parent);
//
//     // const current = parent.append("g").selectAll("rect").data(function(d) {
//     //     console.info("d1");
//     //     console.info(d);
//     //     return d;
//     // });
//
//     current.interrupt(); //.selectAll("*");
//     //
//     // current.transition().attr("fill", "green");
//     //
//     // const enter = current.enter().append("g").classed("bar", true);
//     // enter.attr("fill", "blue");
//     //
//     // enter
//     //     .append("rect")
//     //     .attr("height", 0)
//     //     .attr("transform", function(d) {
//     //         console.info("d");
//     //         console.info(d);
//     //         return "translate(" + d[0].x  + "," + d[0].height + ")";
//     //     });
//     //
//     // const exit = current.exit().classed("bar", false);
//     // exit
//     //     .attr("fill", "red")
//     //     .attr("opacity", 1)
//     //     .transition()
//     //     .attr("opacity", 0)
//     //     .remove();
//     //
//     // const rect = current
//     //     .merge(enter)
//     //     .select("rect")
//     //     .attr("width", d => d.width)
//     //     .transition()
//     //     .duration(1000)
//     //     .attr("transform", d => `translate(${d[0].x}, ${d[0].y})`)
//     //     .attr("height", d => d.height);
// });

