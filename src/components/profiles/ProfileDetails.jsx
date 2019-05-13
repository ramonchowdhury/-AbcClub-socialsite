import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash'
import { doFollow, doUnfollow } from '../../actions/profileActions.jsx'; 

class ProfileDetails extends Component {

    state = {
        follow: false,
    }

    componentWillMount() {
        const { profile } = this.props;
        const { followers } = profile;

        followers.map(follower => {
            if(follower.user === this.props.currentuser){
                return this.setState({follow: true})
            }
        })
    }

    follow(id){
        this.props.doFollow(id);
        this.setState({follow: true})
    }
    unfollow(id){
        this.props.doUnfollow(id);
        console.log(id);
        this.setState({follow: false})
    }

    render() {
        const { profile } = this.props;
        if(this.props.currentuser === profile.user._id){
            return null;
        }
        return (
            <div className="card mt-2">
                <div className="card-body bb1eef">
                  <div className="media">
                    <a className="media-left mr-2" href="#fake">
                      <img alt="" className="media-object rounded-circle" src="http://placehold.it/64x64" />
                    </a>
                    <div className="media-body">
                        <div className="row">
                            <div className="col-md-6">
                                <Link to={`/profile/${profile.handle}`} className="mt-2 mr-2 f20" style={{textDecoration: "none", color: "#343a40"}}>{profile.user.name}
                                    <span className="f16">@{profile.handle}</span>
                                </Link>
                                <p>{_.isEmpty(profile.location) ? null : <span>{profile.location}</span>}</p>
                            </div>
                            { this.state.follow === false ?
                                <div className="col-md-6"><button className="btn btn-info float-right" onClick={this.follow.bind(this, profile.user._id)}>Follow</button></div>
                                :
                                <div className="col-md-6"><button className="btn btn-info float-right" onClick={this.unfollow.bind(this, profile.user._id)}>Unfollow</button></div>
                            }
                            
                        </div>
                    </div>
                  </div>
                </div>
             </div>
        )
    }
}

ProfileDetails.propTypes = {
    doFollow: PropTypes.func.isRequired,
    doUnfollow: PropTypes.func.isRequired
}

export default connect(null, { doFollow, doUnfollow })(ProfileDetails);