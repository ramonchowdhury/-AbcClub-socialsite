import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from'react-router-dom';
import PropTypes from 'prop-types';
import _ from 'lodash';

import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';


import { createProfile, getCurrentProfile } from '../../actions/profileActions';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            location: '',
            bio: '',
            error: {}
        }

    }
    componentDidMount() {
        this.props.getCurrentProfile()  ;
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.error){
            this.setState({
                error: nextProps.error
            })
        }
        if(nextProps.profile.profile){
            let profile = _.pick(nextProps.profile.profile, ['handle', 'location', 'bio'])
            this.setState(profile);
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const profileData = _.pick(this.state, ['handle', 'location', 'bio']);
        this.props.createProfile(profileData, this.props.history);
    }
    render () {
        const { error} = this.state;
        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto">
                            <Link to="/about" className="btn btn-light">Go Back</Link>
                            <h3 className="text-center mb-5">Edit Your profile</h3>
                            <form onSubmit={this.handleSubmit}>
                                <TextFieldGroup
                                    placeholder="* Profile Handle"
                                    name="handle"
                                    value={this.state.handle}
                                    onChange={this.handleChange}
                                    error={error.handle}
                                />
                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    onChange={this.handleChange}
                                    error={error.location}
                                />
                                <TextAreaFieldGroup
                                    placeholder="Bio"
                                    name="bio"
                                    value={this.state.bio}
                                    onChange={this.handleChange}
                                    error={error.bio}
                                />   
                       
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    profile: state.profile,
    error: state.error
  });
  
  export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(EditProfile));
  