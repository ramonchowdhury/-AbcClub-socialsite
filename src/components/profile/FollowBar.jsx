import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { doFollow, doUnfollow } from '../../actions/profileActions.jsx'; 

class FollowBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            follow: false,
            myprofile: false,
        }
    }
    componentWillMount() {
        const { profile } = this.props;
        const { followers } = profile;
        if(profile.user._id !== this.props.currentuser){
            followers.map(follower => {
                if(follower.user === this.props.currentuser){
                    this.setState({follow: true})
                }
            })
        } else {
            this.setState({myprofile: true})
        }
    }
    
	follow(id){
        this.props.doFollow(id);
        this.setState({follow: true})
    }
    unfollow(id){
        this.props.doUnfollow(id);
        this.setState({follow: false})
    }
    
	render() {
		const { profile, totalposts} = this.props;
		return (
                <div className="card">
                    <div className="card-header">
                        <div className="media">
                            <div className="media-body">
                                <div className="row">
                                    <div className="col-sm-8">
                                      <div className="row">
                                         <div className="col-xs-4 pl-3">
                                                <h6>Posts</h6>
                                                <h6>{totalposts}</h6>
                                              
                                            </div>
                                            <div className="col-xs-4 pl-3">
                                              
                                                <h6>Followers</h6>
                                                <h6>{profile.followers.length}</h6>
                                              
                                            </div>
                                            <div className="col-xs-4 pl-3">
                                              
                                                <h6>Following</h6>
                                                <h6>{profile.following.length}</h6>
                                              
                                            </div>
                                      </div>
                                    </div>

                                    <div className="col-sm-4">
                                    { this.state.myprofile  ? null :  this.state.follow === false ?

                                        <button className="btn btn-info float-right mt-2" onClick={this.follow.bind(this, profile.user._id)}>Follow</button>
                                        :
                                        <button className="btn btn-info float-right mt-2" onClick={this.unfollow.bind(this, profile.user._id)}>Unfollow</button>
                                    }
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
		)
	}
}



FollowBar.propTypes = {
    doFollow: PropTypes.func.isRequired,
    doUnfollow: PropTypes.func.isRequired
}

export default connect(null, { doFollow, doUnfollow })(FollowBar);