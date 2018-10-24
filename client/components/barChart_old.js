import React from "react";
import * as d3 from "d3";
import Axes from "./Axes";
import Bars from "./Bars";
import axios from "axios/index";

class BarChart_old extends React.Component {
    constructor(props) {
        super(props);
        this.xScale = d3.scaleBand()
        this.yScale = d3.scaleLinear()
        // this.getData = this.getData.bind(this);
    }


    render() {
        const margins = { top: 50, right: 20, bottom: 100, left: 60 };
        const svgDimensions = { width: 800, height: 500 };
        const maxValue = Math.max(...this.props.data.map(d => d.value));

        // scaleBand type
        const xScale = this.xScale
            .padding(0.5)
            // scaleBand domain should be an array of specific values
            // in our case, we want to use movie titles
            .domain(this.props.data.map(d => d.title))
            .range([margins.left, svgDimensions.width - margins.right])

        // scaleLinear type
        const yScale = this.yScale
        // scaleLinear domain required at least two values, min and max
            .domain([0, maxValue])
            .range([svgDimensions.height - margins.bottom, margins.top])

        return (
            <svg width={svgDimensions.width} height={svgDimensions.height}>
                <Axes
                    scales={{ xScale, yScale }}
                    margins={margins}
                    svgDimensions={svgDimensions}
                />
                <Bars
                    scales={{ xScale, yScale }}
                    margins={margins}
                    data={this.props.data}
                    svgDimensions={svgDimensions}
                    maxValue = {maxValue}
                />
            </svg>
        )
    }
}

export default BarChart_old;