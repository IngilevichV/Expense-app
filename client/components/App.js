import React, { Component } from 'react';
import '../css/App.css';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import YearTabsRouter from './tabs/yearTabsRouter';
import { Tab, Tabs } from 'react-bootstrap';
import MonthTabs from './tabs/monthTabs';
// import BarChart_old from './barChart';
import BarChart from './barChart';


class App extends Component {

    constructor() {
        super();
        this.state = {
            selectedMonth:'All',
            selectedYear: 2016,
            data: [],
            activeTab: 2016,
            barChartData: [],
            body_width: document.body.clientWidth/2.5
        };
        this.getData = this.getData.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.checkChart = this.checkChart.bind(this);
        this.getDataForBarChart = this.getDataForBarChart.bind(this);
    }
    componentDidMount() {
        this.getData(this, 2016, 'All');

    }

    componentWillMount() {
        this.getDataForBarChart(this, 2016, 'All')
    }


    componentWillReceiveProps(nextProps) {
        if(nextProps.history.location.search){
            var search = nextProps.history.location.search;
            search = search.substring(1);
            var searchObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
            this.setState({activeTab: parseInt(searchObj.year)});
            this.setState({selectedYear: searchObj.year});
            this.setState({selectedMonth: searchObj.month});
            this.getData(this, searchObj.year, searchObj.month);
            this.getDataForBarChart(this, 2016, 'All');
        }else{
            this.getData(this, 2016, 'All');
        }
    }

    //Отображение расходов в компоненте
    getData(ev, year, month){
        axios.get('/getAll?month='+month+'&year='+year)
            .then(function(response) {
                ev.setState({data: response.data});
                ev.setState({selectedYear: parseInt(year)});
                ev.setState({selectedMonth: month});
            });
    }


    getDataForBarChart(ev, year, month){

        axios.get('/getAll?month='+month+'&year='+year)
            .then(function(response) {
                let data = []
                response.data.map((obj) => {
                    data.push({title: obj.description, value: obj.amount})
                });
                ev.setState({barChartData: data});
            });
    }

    handleSelect(selectedTab){
        // console.info(this.state.selectedYear);
        this.setState({
            activeTab: selectedTab,
            selectedYear: parseInt(selectedTab)
        });
    }
    checkChart() {
        alert(this.state.data);
    }

    render() {
        return (

            <div>
                <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
                    <Tab eventKey={2016} title={<YearTabsRouter year='2016'/>}><MonthTabs year='2016' monthlyActiveTab={this.state.selectedMonth}/></Tab>
                    <Tab eventKey={2017} title={<YearTabsRouter year='2017'/>}><MonthTabs year='2017' monthlyActiveTab={this.state.selectedMonth}/></Tab>
                    <Tab eventKey={2018} title={<YearTabsRouter year='2018'/>}><MonthTabs year='2018' monthlyActiveTab={this.state.selectedMonth}/></Tab>
                    <Tab eventKey={2019} title={<YearTabsRouter year='2019'/>}><MonthTabs year='2019' monthlyActiveTab={this.state.selectedMonth}/></Tab>
                    <Tab eventKey={2020} title={<YearTabsRouter year='2020'/>}><MonthTabs year='2020' monthlyActiveTab={this.state.selectedMonth}/></Tab>
                </Tabs>
                <Add selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} func={() => this.getDataForBarChart(this, 2016, 'All')}/>
                <table>
                    <thead>
                    <tr>
                        <th></th>
                        <th className='desc-col'>Description</th>
                        <th className='button-col'>Amount</th>
                        <th className='button-col'>Month</th>
                        <th className='button-col'>Year</th>
                        <th className='button-col'>Update</th>
                        <th className='button-col'>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.map((exp) => {
                            return  <tr>
                                <td className='counterCell'/>
                                <td className='desc-col'>{exp.description}</td>
                                <td className='button-col'>{exp.amount}</td>
                                <td className='button-col'>{exp.month}</td>
                                <td className='button-col'>{exp.year}</td>
                                <td className='button-col'><Update expense={exp} func={() => this.getDataForBarChart(this, 2016, 'All')}/></td>
                                <td className='button-col'><Delete expense={exp} func={() => this.getDataForBarChart(this, 2016, 'All')}/></td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
                {/*<BarChart_old data={this.state.barChartData}/>*/}
                <BarChart
                    className="barChartComponet"
                    data={this.state.barChartData}
                    width={this.state.body_width}
                    height={430}
                    xFn={d => d.title}
                    yFn={d => d.value}
                    margin={{ top: 60, left: 40, bottom: 20, right: 20 }}
                    paddingInner={0.1}
                    paddingOuter={0.1}
                />
            </div>
        );
    }
}

export default App;
