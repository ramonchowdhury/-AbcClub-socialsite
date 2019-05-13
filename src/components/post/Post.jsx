import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Spinner from '../common/Spiner';
import { getPost } from '../../actions/postActions';
import PostDetails from './PostDetails';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';

class Post extends Component {
    componentDidMount(){
        this.props.getPost(this.props.match.params.id )
    }
    render() {
        const { post, loading } = this.props.post;
        let postContainer;
        if(post === null || loading || Object.keys(post).length === 0){
            postContainer = <Spinner />
        } else {
            postContainer = (
                <div>
                    <PostDetails post={post}/>
                    <CommentForm postId={post._id}/>
                    <div className="card mt-2">
                        <CommentFeed postId={post._id} comments={post.comments} />
                    </div>
                </div>
                )
        }
        return (
            <div className="post">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light mb-3">
                                Go Back
                            </Link>
                        </div>
                    </div>
                    {postContainer}

                </div>
            </div>
        )
    }
}

Post.propTypes ={
    getPost: PropTypes.func.isRequired
}

const mapStateToProps =  (state) => ({
    post: state.post
})

export default connect(mapStateToProps, { getPost })(Post);