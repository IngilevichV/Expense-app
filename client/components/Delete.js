import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class Delete extends React.Component {
    constructor(){
        super();
        this.state={id:''};
        this.onClick = this.onClick.bind(this);
        this.delete = this.delete.bind(this);
    }
    componentDidMount() {
        this.setState({
            id: this.props.expense._id
        })
    }
    onClick(e){
        this.delete(this);
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            id: nextProps.expense._id,
            month:nextProps.expense.month,
            year:nextProps.expense.year
        })
    }

    delete(e){
        axios.get('/delete?id='+e.state.id)
            .then(function(response) {
                alert("success");
            });
    }
    render(){
        return (
            <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                <Button bsStyle="danger" bsSize="small" onClick={this.onClick}>
                    <span className="glyphicon glyphicon-remove"/>
                </Button>
            </Link>
        )
    }
}
export default Delete;