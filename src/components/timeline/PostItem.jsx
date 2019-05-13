import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions'; 

class PostItem extends Component{
    handleDelete(id) {
        this.props.deletePost(id);
    }
    handleLike(id){
        this.props.addLike(id);
    }
    handleUnlike(id){   
        this.props.removeLike(id);
    }
    findUserLike(likes) {
        const { auth } = this.props;

        if(likes.filter(like => like.user === auth.user._id).length > 0){
            return true;
        } else {
            return false;
        }
    }
    render() {
        const { post, auth } = this.props;
        return (
            <div className="card-body bb1eef">
                <div className="media">
                    <a className="media-left mr-2" href="#fake">
                        <img alt="" className="media-object rounded-circle" src="http://placehold.it/64x64" />
                    </a>
                    <div className="media-body">
                        <h5 className="media-heading">{post.name}</h5>
                        <p>{post.text}</p>
                        <ul className="nav nav-pills nav-pills-custom">
                            {
                                this.findUserLike(post.likes) === true ?  (
                                    <button type="button" onClick={this.handleUnlike.bind(this, post._id)} className="btn btn-light mr-1">
                                        <i className={classnames('text-secondary fas fa-thumbs-up', {'text-info': this.findUserLike(post.likes)})}></i>
                                        <span className="badge badge-light">{post.likes.length}</span>
                                    </button>
                                ) :
                                (
                                    <button type="button" onClick={this.handleLike.bind(this, post._id)} className="btn btn-light mr-1">
                                        <i className='text-secondary fas fa-thumbs-up'></i>
                                        <span className="badge badge-light">{post.likes.length}</span>
                                    </button>
                                )
                            }

                            <Link to={`/post/${post._id}`} className="btn btn-light mr-1">
                                <i className="text-secondary fas fa-comment"></i>
                                <span className="badge">{post.comments.length}</span>
                            </Link>
                            {post.user === auth.user._id ?  (
                                <button type="button" onClick={this.handleDelete.bind(this, post._id)} className="btn btn-light mr-1">
                                    <i className="text-danger fas fa-trash"></i>
                                </button>
                            ): null }
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}

PostItem.propTypes = {
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);