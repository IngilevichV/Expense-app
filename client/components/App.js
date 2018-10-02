import React, { Component } from 'react';
import '../css/App.css';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';

class App extends Component {

    constructor() {
        super();
        this.state = {selectedMonth:'Jan', selectedYear: 2016, data: []};
        this.getData = this.getData.bind(this);
    }
    componentDidMount() {
        this.getData(this, '2016');
    }
    componentWillReceiveProps(nextProps) {
        this.getData(this, '2016');
    }

    //Отображение расходов в компоненте
    getData(ev, year){
        axios.get('/getAll?month=All&year='+year)
            .then(function(response) {
                ev.setState({data: response.data});
                ev.setState({selectedYear: parseInt(year)})
            });
    }

    render() {
        console.info(this.state);
        return (
            <div>
                <Add selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} />
                <table>
                    <thead>
                    <tr>
                        <th/>
                        <th className='desc-col'>Описание</th>
                        <th className='button-col'>Сумма</th>
                        <th className='button-col'>Месяц</th>
                        <th className='button-col'>Год</th>

                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.data.map(function(exp){
                            console.info("lala");
                            console.info(exp);
                            return (
                                <tr>
                                    <td className='counterCell'/>
                                    <td className='desc-col'>{exp.description}</td>
                                    <td className='button-col'>{exp.amount}</td>
                                    <td className='button-col'>{exp.month}</td>
                                    <td className='button-col'>{exp.year}</td>
                                    <Update expense={exp}/>
                                    <Delete id={exp._id} expense={exp}/>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default App;
