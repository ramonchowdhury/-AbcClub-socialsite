import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PostItem from './PostItem';
import Spinner from '../common/Spiner';
class PostFeed extends Component {
    
    render() {
        const { posts, handle } = this.props;
        
        if(posts === undefined){
        	return <Spinner />
        } else {
        	return posts.map(post => <PostItem key={post._id} post={post} handle={handle} />)
    	}
    }
}
PostFeed.porpTypes = {
    posts: PropTypes.array.isRequired
}

export default PostFeed;