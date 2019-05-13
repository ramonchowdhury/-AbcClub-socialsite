import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { registerUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            error: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/');
        }
    }
    componentWillReceiveProps(nextPorps) {
        if(nextPorps.error){
            this.setState({error: nextPorps.error})
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit(e){
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        }
        this.props.registerUser(newUser, this.props.history);  
    }
    render() {
        const { error }  = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <form onSubmit={this.handleSubmit}>
                                <TextFieldGroup
                                    placeholder="Name"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    error={error.name}
                                />
                                <TextFieldGroup
                                    placeholder="Email"
                                    name="email"
                                    type="email"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    error={error.email}
                                />
                                <TextFieldGroup
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    error={error.password}
                                />
                                <TextFieldGroup
                                    placeholder="Confirm Password"
                                    name="password2"
                                    type="password"
                                    value={this.state.password2}
                                    onChange={this.handleChange}
                                    error={error.password2}
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" value="SignUp"/>
                            </form>
                            <Link to="/login" className="btn btn-success btn-block mt-4">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = { 
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));