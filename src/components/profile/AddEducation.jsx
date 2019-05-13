import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import { addEducation } from '../../actions/profileActions';

class AddEducation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: '',
            degree: '',
            fieldofstudy: '',
            from: '',
            to: '',
            current: false,
            description: '',
            error: {},
            disabled: false
        }
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.error){
            this.setState({
                error: nextProps.error
            })
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    onCheck = (e) => {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const eduData = _.pick(this.state, ['school', 'degree', 'fieldofstudy', 'from', 'to', 'current', 'description']);
        this.props.addEducation(eduData, this.props.history);
    }
    render() {
        const { error } = this.state;
        return (
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto">
                            <Link to="/about" className="btn btn-light">Go Back</Link>
                            <h3 className="text-center mb-5">Add Education</h3>
                            <form onSubmit={this.handleSubmit}>
                                <TextFieldGroup
                                    placeholder="* School"
                                    name="school"
                                    value={this.state.school}
                                    onChange={this.handleChange}
                                    error={error.school}
                                />
                                <TextFieldGroup
                                    placeholder="* Degree"
                                    name="degree"
                                    value={this.state.degree}
                                    onChange={this.handleChange}
                                    error={error.degree}
                                />
                                <TextFieldGroup
                                    placeholder="* Field Of Study"
                                    name="fieldofstudy"
                                    value={this.state.fieldofstudy}
                                    onChange={this.handleChange}
                                    error={error.fieldofstudy}
                                />
                                <h6>From Date</h6>
                                <TextFieldGroup
                                    name="from"
                                    type="date"
                                    value={this.state.from}
                                    onChange={this.handleChange}
                                    error={error.from}
                                />  
                                <h6>To Date</h6>
                                <TextFieldGroup
                                    name="to"
                                    type="date"
                                    value={this.state.to}
                                    onChange={this.handleChange}
                                    error={error.to}
                                    disabled={this.state.disabled ? 'disabled' : ''}
                                /> 
                                <div className="form-check mb-4">
                                    <input name="current" type="checkbox"
                                        value={this.state.current}
                                        checked={this.state.current}
                                        onChange={this.onCheck}
                                        id="current"
                                        className="form-check-input"/>
                                        <label htmlFor="current" className="form-check-label">Current Job</label>
                                </div>
                                <TextAreaFieldGroup
                                    placeholder="Programm Description"
                                    name="description"
                                    type="text"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    error={error.description}
                                /> 
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/> 
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
AddEducation.propTypes = {
    addEducation: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired
  };


const mapStateToProps = (state) => ({
    profile: state.profile,
    error: state.error
})

export default connect(mapStateToProps, { addEducation })(withRouter(AddEducation));