import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../common/Spiner';
import { getProfileByHandle } from '../../actions/profileActions';
import { getPostByHandle } from '../../actions/postActions';
import PostFeed from './PostFeed';
import SideBar from '../timeline/SideBar';
import FollowBar from './FollowBar';

class Profile extends Component {

    componentWillMount(){
        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle);
            this.props.getPostByHandle(this.props.match.params.handle);
        }
    }
    render() {
        const { posts, loading } = this.props.post;
        const { profile, ploading } = this.props.profile;

        let profileContent, postContent, followbar;
        if(profile === null || ploading) {
            profileContent = <Spinner />
        } else {
            profileContent = <SideBar prf={profile} show={false}/>
            followbar = <FollowBar profile={profile} currentuser = { this.props.auth.user._id } totalposts={posts.length}/>
            postContent = <PostFeed posts={posts} handle={profile.handle} />
        }
        return (
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        { profileContent }
                        <div className="col-sm-9">
                            {followbar}
                            <div className="card mt-2">
                                {postContent}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}




Profile.propTypes = {
    getProfileByHandle: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
    post: state.post
})

export default connect(mapStateToProps, { getProfileByHandle, getPostByHandle })(Profile);