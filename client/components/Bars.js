import React from "react";


var arr = ["#d5f4e6", '#80ced6', '#fefbd8', '#618685', "#d5f4e6", '#80ced6', '#fefbd8', '#618685', "#d5f4e6", '#80ced6', '#fefbd8', '#618685'];

class Bars extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let new_props = this.props;
        let data = this.props.plotData;
        data.map(function(d){console.info(d)});
        const bars = (
            data.map(function(d) {
                return(
                    d.map(function(d_sub, i){
                        let height = (new_props.yScale(d_sub[0]) - new_props.yScale(d_sub[1])) > 0 ? (new_props.yScale(d_sub[0]) - new_props.yScale(d_sub[1])) : 0;
                        return(
                            <rect
                                key={d.index + "_" + i}
                                x={new_props.xScale(d_sub.data.year)}
                                y={new_props.yScale(d_sub[1])}
                                height={height}
                                width={new_props.xScale.bandwidth()}
                                fill={arr[Number(d.index)]}
                            />
                        )
                    }))
                }
            )
        );

        return (
            <g>{bars}</g>
        )
    }
}

export default Bars;