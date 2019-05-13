import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { deleteComment } from '../../actions/postActions';

class CommentItem extends  Component {
    handleDelete(postId, commentId){
        this.props.deleteComment(postId, commentId);
    }

    render() {
        const { comment, postId, auth } = this.props;

        return (
              <div className="card-body bb1eef">
                <div className="media">
                  <a className="media-left mr-2" href="#fake">
                    <img alt="" className="media-object rounded-circle" src="http://placehold.it/64x64" />
                  </a>
                  <div className="media-body">
                    <h6 className="media-heading">{comment.name}</h6>
                    <p>{comment.text}</p>
                  </div>
                    <ul className="nav nav-pills nav-pills-custom">
                    {   comment.user === auth.user._id ?  (    
                            <button type="button" onClick={this.handleDelete.bind(this, postId, comment._id)} className="btn btn-danger mr-1">
                                <i className="fas fa-trash" />
                            </button>
                        ) : null  
                    }
                    </ul>
                </div>
              </div>

        )
    }
}

CommentItem.propTypes = {
    deleteComment: PropTypes.func.isRequired,
    comment: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(CommentItem);