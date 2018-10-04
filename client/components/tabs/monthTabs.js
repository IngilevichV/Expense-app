import React from "react";
import {Tab, Tabs} from "react-bootstrap";
import MonthTabsRouter from "./monthTabsRouter";

var months = ['All', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

class MonthTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: ""
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            activeTab:this.props.year+'-'+nextProps.monthlyActiveTab
        });
    }

    handleSelect(selectedTab){
        this.setState({
            activeTab: selectedTab,
        });
    }

    render(){
        return (
            <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
                {
                    months.map((month) => {
                        return <Tab eventKey={this.props.year + '-' + month} title={<MonthTabsRouter tabId={month} year={this.props.year}/>}/>
                    })
                }
            </Tabs>
        )
    }
}

export default MonthTabs;