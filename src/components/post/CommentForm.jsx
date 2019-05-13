import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addComment } from '../../actions/postActions';

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            text: '',
            error: {}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.error){
            this.setState({error: nextProps.error})
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    hanldeSubmit = (e) => {
        e.preventDefault();
        const { user } = this.props.auth;
        const { postId } = this.props;
        const commentData = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }
        this.props.addComment(postId, commentData);
        this.setState({text: ''})
    }
    render() {
        const { error } = this.state;
        return (
              <div className="card mt-2">
                <div className="card-header">
                  <div className="media">
                    <div className="media-body">
                      <div className="form-group has-feedback">
                        <form onSubmit={this.hanldeSubmit}>
                          <div className="form-group">
                            <TextAreaFieldGroup 
                                placeholder="Comment"
                                name="text"
                                value={this.state.text}
                                onChange={this.handleChange}
                                error={error.text}
                            />
                          </div>
                          <button type="submit" className="btn btn-info float-right">Submit</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        )
    }
}

CommentForm.propTypes = {
    addComment: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    error: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
})

export default connect(mapStateToProps, { addComment })(CommentForm);