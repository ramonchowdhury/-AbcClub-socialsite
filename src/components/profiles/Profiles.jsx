import  React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spiner';
import { getProfiles } from '../../actions/profileActions';
import ProfileDetails from './ProfileDetails';

class Profiles extends Component {
    componentDidMount() {
        this.props.getProfiles();
    }
    render() {
        const { profiles, loading } = this.props.profile;

        let profileItems;
        if(profiles === null || loading){
            profileItems = <Spinner />
        } else {
            if(profiles.length > 0) {
                profileItems = profiles.map(profile => (
                    <ProfileDetails key={profile._id} profile={profile} currentuser = { this.props.auth.user._id }/>
                ))
            } else{
                profileItems = <h4>No Profiles Found..</h4>
            }
        }
        return (
            <div className="profiles">
                <div className="container">
                    {profileItems}
                </div>
            </div>
        )
    }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps, { getProfiles })(Profiles);