import React, { Component } from 'react';
import '../css/App.css';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import YearTabsRouter from './tabs/yearTabsRouter';
import { Tab, Tabs } from 'react-bootstrap';
import MonthTabs from './tabs/monthTabs';
import BarChart from './barChart';
import Legend from './Legend';
// import RadioButton from './RadioButton';




class App extends Component {

    constructor() {
        super();
        this.state = {
            selectedMonth:'All',
            selectedYear: 2016,
            data: [],
            activeTab: 2016,
            barChartData: [],
            body_width: document.body.clientWidth/2.2,
            keys:[],
            availableYears:[2016, 2017, 2018, 2019, 2020],
            barChartType: 'month'
        };
        this.getData = this.getData.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.getDataForBarChart = this.getDataForBarChart.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    updateDimensions() {
        this.setState({ body_width: document.body.clientWidth/2.2});
    }

    componentDidMount() {
        this.getData(this, 2016, 'All');
        this.getDataForBarChart(this, 'All', 'All');
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions.bind(this));
    }
    // componentDidUpdate() {
    //     this.getDataForBarChart(this, 'All', 'All');
    // }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions.bind(this));
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.history.location.search) {
            let search = nextProps.history.location.search;
            search = search.substring(1);
            let searchObj = JSON.parse(`{"${decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
            this.setState({activeTab: parseInt(searchObj.year)});
            this.setState({selectedYear: searchObj.year});
            this.setState({selectedMonth: searchObj.month});
            this.getData(this, searchObj.year, searchObj.month);
            this.getDataForBarChart(this, 'All', 'All');
        } else {
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

                console.info("response", response.data);

                let data_for_stacked = response.data;
                let stackedData = [];
                let yearsData = {};
                data_for_stacked.map(function(d){
                    if (Object.keys(yearsData).includes(String(d.year))) {
                        if (Object.keys(yearsData[d.year]).includes(d.category)) {
                            yearsData[d.year][d[ev.state.barChartType]] += d.amount;
                        } else {
                            yearsData[d.year][d[ev.state.barChartType]] = d.amount;
                        }
                    } else {
                        yearsData[d.year] = {};
                        yearsData[d.year][d[ev.state.barChartType]] = d.amount;
                    }
                });

                for (let key in yearsData) {
                    // noinspection JSUnfilteredForInLoop
                    const tempObj = yearsData[key];
                    tempObj["year"] = key;
                    stackedData.push(tempObj);
                }
                console.info("stacked_data", stackedData);
                let keys = [];
                stackedData.map(function(obj) {
                    Object.keys(obj).map(function(k) {
                        if (k!=="year" && !keys.includes(k)){
                            keys.push(k);
                        }
                    })
                });
                ev.setState({keys: keys});
                console.info("data for BC");
                console.info(stackedData);
                return stackedData;

            })
            .then(function(stackedData) {ev.setState({barChartData: stackedData});});
    }

    handleSelect(selectedTab){
        this.setState({
            activeTab: selectedTab,
            selectedYear: parseInt(selectedTab)
        });
    }

    handleRadioChange(event) {
        // this.setState({
        //    barChartType: event.target.value
        // });
        this.setState({ barChartType: event.target.value });
        this.getDataForBarChart(this, 'All', 'All')
        console.log(event);
    }

    render() {
        console.info("render");
        // console.info(this.state.availableYears);
        let tabYears = this.state.availableYears;
        let selectedMonth = this.state.selectedMonth;
        const tabsElems = (
            tabYears.map((yearOfTab) =>
                <Tab eventKey={yearOfTab} title={<YearTabsRouter year={String(yearOfTab)}/>}><MonthTabs year={String(yearOfTab)} monthlyActiveTab={selectedMonth}/></Tab>
            )
        );
        return (

            <div>
                <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
                    {tabsElems}
                </Tabs>
                <Add selectedMonth={selectedMonth} selectedYear={this.state.selectedYear} func={() => this.getDataForBarChart(this, 'All', 'All')}/>
                <table>
                    <thead>
                    <tr>
                        <th/>
                        <th className='desc-col'>Category</th>
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
                                <td className='desc-col'>{exp.category}</td>
                                <td className='button-col'>{exp.amount}</td>
                                <td className='button-col'>{exp.month}</td>
                                <td className='button-col'>{exp.year}</td>
                                <td className='button-col'><Update expense={exp} func={() => this.getDataForBarChart(this, 'All', 'All')}/></td>
                                <td className='button-col'><Delete expense={exp} func={() => this.getDataForBarChart(this, 'All', 'All')}/></td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
                {/*<div onChange={this.setTypeOfBarchart.bind(this)}>*/}
                    {/*<input type="radio" value="month" name="month"  defaultChecked={true}/> По месяцам*/}
                    {/*<input type="radio" value="category" name="category" /> По категориям*/}
                {/*</div>*/}

                <div className="radio-row">
                    <input
                        type="radio"
                        name="month"
                        value="month"
                        checked={this.state.barChartType === 'month'}
                        onChange={(e) => this.handleRadioChange(e)}
                    />По месяцам
                    {/*<label htmlFor="month">По месяцам</label>*/}
                    <input
                        type="radio"
                        name="category"
                        value="category"
                        checked={this.state.barChartType === 'category'}
                        onChange={(e) => this.handleRadioChange(e)}
                    />По категориям
                    {/*<label htmlFor="category">По категориям</label>*/}
                </div>


                <BarChart
                    className="barChartComponet"
                    data={this.state.barChartData}
                    width={this.state.body_width}
                    height={430}
                    xFn={d => d.title}
                    yFn={d => d.value}
                    margin={{ top: 60, left: 50, bottom: 20, right: 20 }}
                    paddingInner={0.1}
                    paddingOuter={0.1}
                />
                <Legend
                    width={300}
                    height={430}
                    data={this.state.keys}
                />


            </div>
        );
    }
}

export default App;
