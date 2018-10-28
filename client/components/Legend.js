import React from "react";


var arr = ["#d5f4e6", '#80ced6', '#fefbd8', '#618685', "#d5f4e6", '#80ced6', '#fefbd8', '#618685', "#d5f4e6", '#80ced6', '#fefbd8', '#618685'];

class Legend extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const legendElements = (
            this.props.data.map(
                function(d, i) {
                    return (
                        <g
                            key={i}
                            transform={"translate(0,"+ i*40+")"}
                        >
                            <rect
                                x={0}
                                y={0}
                                height={30}
                                width={50}
                                fill={arr[i]}>
                            </rect>
                            <text
                                x={60}
                                y={20}>{d}
                            </text>
                        </g>
                    )
                }
            )
        );

        return (
            <svg width={this.props.width} height={this.props.height} className={"Legend"}>
                <g
                transform={"translate(50, 60)"}>
                    {legendElements}
                </g>
            </svg>
        )
    }
}

export default Legend;