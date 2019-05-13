import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PostDetails extends Component{

    render() {
        const { post } = this.props;
        return (
            <div className="card">
                <div className="card-body">
                    <div className="media">
                        <a className="media-left mr-2" href="#fake">
                            <img alt="" className="media-object rounded-circle" src="http://placehold.it/64x64" />
                        </a>
                        <div className="media-body">
                            <h5 className="media-heading">{post.name}</h5>
                            <p>{post.text}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

PostDetails.propTypes = {
    post: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PostDetails);