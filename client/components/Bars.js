import React from "react";
import {scaleLinear} from "d3-scale";
import {interpolateLab} from "d3-interpolate";

class Bars extends React.Component {
    constructor(props) {
        super(props);

        this.colorScale = scaleLinear()
            .domain([0, this.props.maxValue])
            .range(['#F3E5F5', '#7B1FA2'])
            .interpolate(interpolateLab)
    }

    render() {
        const { scales, margins, data, svgDimensions } = this.props;
        const { xScale, yScale } = scales;
        const { height } = svgDimensions;

        console.info(data);
        const bars = (
            data.map(datum =>
                <rect
                    key={datum.index}
                    x={xScale(datum.index)}
                    y={yScale(datum[1])}
                    height={height - margins.bottom - scales.yScale(datum[1])}
                    width={xScale.bandwidth()}
                    fill={this.colorScale(datum.index)}
                />,
            )
        );

        return (
            <g>{bars}</g>
        )
    }
}

export default Bars;