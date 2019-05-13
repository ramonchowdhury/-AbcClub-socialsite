import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentProfile } from '../../actions/profileActions';

class Navbar extends Component {
    handleLogOut = (e) => {
        e.preventDefault();
        this.props.clearCurrentProfile();
        this.props.logoutUser();
        this.props.history.push('/login')
    }
    render() {
        const { user } = this.props.auth;
        return (
            <nav className="navbar navbar-expand-sm navbar-light bg-light mb-4 b1eee">
                <div className="container">
                    <Link to="/" className="navbar-brand font-weight-bold"><i className="fas fa-home text-info mr-1"></i></Link>
                    
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2 pb-1 pt-1 mt-1" type="search" placeholder="Search" aria-label="Search"/>
                    </form>
                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item"> 
                                <Link to="/profiles" className="navbar-brand">
                                    <i className="fas fa-user-friends text-info mr-1"></i>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <img className="rounded-circle w35 navbar-brand mt-1" src="https://i.pinimg.com/236x/41/a3/e3/41a3e39833fcc23d5eb19dada40add0f.jpg"
                                    alt=""/>
                            </li>
                            <li className="nav-item">
                                 <Link to="/login" onClick={this.handleLogOut} className="navbar-brand ml-1">Logout</Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
            

        )
    }
    
}



Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile

})


export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(withRouter(Navbar));