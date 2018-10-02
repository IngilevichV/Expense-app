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
    delete(e){
        axios.get('/delete?id='+e.state.id)
            .then(function(response) {

            });
    }
    render(){
        return (
            <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                <Button bsStyle="danger" bsSize="small" onClick={this.onClick}>
                    <span className="glyphicon glyphicon-remove"></span>
                </Button>
            </Link>
        )
    }
}
export default Delete;