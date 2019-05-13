import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile , deleteAccount} from '../../actions/profileActions';
import Spinner from '../common/Spiner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

class About extends Component {
    componentDidMount() {
        this.props.getCurrentProfile();
    }
    handleDelete = (e) => {
        this.props.deleteAccount();
    }
    render() {
        const { user } = this.props.auth;
        const { profile, ploading } = this.props.profile;

        let dashboardContent;
        if (profile === null || ploading) {
            dashboardContent = <Spinner />
        } else {
            if(Object.keys(profile).length > 0){
                dashboardContent = (
                    <div>
                        <ProfileActions />
                        <Experience experience={profile.experience}/>
                        <Education education={profile.education} />
                        <div style={{marginBottom: '60px'}} />
                    </div>

                )
            } else {
                dashboardContent = (
                    <div>
                        <p className="lead text-muted">Welcome { user.name} </p>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to="/create-profile" className="btn btn-log btn-info">Create Profile</Link>
                    </div>
                )
            }
        }
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="col-md-12">
                        {dashboardContent}
                    </div>
                </div>
            </div>
        )
    }
}


About.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}


const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth

})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(About);