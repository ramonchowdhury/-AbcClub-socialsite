import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './Form';
import Spinner from '../common/Spiner';
import PostFeed from './PostFeed';
import { getPosts } from '../../actions/postActions';
import { getCurrentProfile } from '../../actions/profileActions.jsx';
import SideBar from './SideBar';

class TimeLine extends Component {

    componentWillMount(){
        this.props.getCurrentProfile();
        this.props.getPosts();
    }

    render() {
        const { posts, loading } = this.props.post;
        const { profile, ploading } = this.props.profile;

        let postContent, profileContent, postform;
        if(posts === null || loading || profile === null || ploading) {
            postContent = <Spinner />
        } else {
            if(Object.keys(profile).length > 0){
            	profileContent = <SideBar prf={profile} show={true}/>
                postform = <PostForm />
                postContent = <PostFeed posts={posts} />
            } else {
                this.props.history.push("/about");
            }
        }

        return (
			<div className="dashboard">
				<div className="container">
					<div className="row">
						{ profileContent }
						<div className="col-sm-9">
							{ postform }
							<div className="card mt-2">
								{ postContent }
							</div>
						</div>
					</div>
				</div>
			</div>

        )
    }
}



TimeLine.propTypes = {
    getPosts: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    post: state.post,
    profile: state.profile
})

export default connect(mapStateToProps, { getPosts, getCurrentProfile })(TimeLine);