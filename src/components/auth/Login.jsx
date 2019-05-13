import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from '../../actions/authActions';
import TextFieldGroup from '../common/TextFieldGroup';


class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: {}
        }
    }
    componentDidMount() {
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/');
        }
    }
    componentWillReceiveProps(nextPorps) {
        if(nextPorps.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        if(nextPorps.error){
            this.setState({error: nextPorps.error})
        }
    }

    handleChange = (e) => {
        
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const newAuth = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(newAuth);

    }
    render() {
        const { error }  = this.state;
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <form onSubmit={this.handleSubmit}>
                                <TextFieldGroup
                                    placeholder="Email Address"
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
                                <input type="submit" className="btn btn-info btn-block mt-4" value="LogIn"/>
                                
                            </form>
                            <Link to="/register" className="btn btn-success btn-block mt-4">Create an Account</Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = { 
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    error: PropTypes.object
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    error: state.error
})

export default connect(mapStateToProps, {loginUser})(Login);