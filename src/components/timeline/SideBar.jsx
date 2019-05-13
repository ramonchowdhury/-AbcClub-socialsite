import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideBar extends Component {

	render() {
		const { prf, show } = this.props;
		const customeStyle = {
			fontSize: "20px", 
			padding: "0 10px 10px 10px", 
			textDecoration: "none", 
			color: "#343a40"
		}
		return (
			<div className="col-sm-3">
				<div className="card">
					<div className="card-body m-auto">
						<Link to={`/profile/${prf.handle}`} className="d-block text-center">
							<img className="rounded-circle" style={{width: "150px", height: "150px"}} alt="" src="https://i.pinimg.com/236x/41/a3/e3/41a3e39833fcc23d5eb19dada40add0f.jpg"/>
						</Link>
						{ show &&
						<div className="row mt-3">
							<div className="col-xs-6 pl-3">
								<small className="f16">Followers <span className="font-weight-bold">{prf.followers.length}</span></small>
							</div>
							<div className="col-xs-6 pl-3">
								<small className="f16">Following <span className="font-weight-bold">{prf.following.length}</span></small>
							</div>
						</div>
						}
					</div>

					<Link to={`/profile/${prf.handle}`} className="text-center font-weight-bold" style={customeStyle}>{prf.user.name}
						<span style={{fontSize: "14px"}}>@{prf.handle}</span>
					</Link>
				</div>
				<div className="card mt-3">
					<div className="card-header">
						<h5 className="card-title">Intro</h5>
					</div>

					<div className="card-body">
						<ul className="list-unstyled">
						{
							prf.education.length > 0 ? (
								<li><i className="fas fa-graduation-cap text-info mr-1"></i><span>{prf.education[0].school} </span></li>
							): null
						}
						{
							prf.experience.length > 0 ? (
								<li><i className="fas fa-briefcase text-info mr-1"></i>{prf.experience[0].title} at <span style={{fontWeight: "bold"}}>{prf.experience[0].company}</span></li>
							): null
						}	<li><i className="fas fa-home text-info mr-1"></i> {prf.location}</li>	
						{	show &&
							<li><Link to="/about" className="btn btn-info mt-3">Edit</Link></li>
						}
						</ul>
					</div>
				</div>
			</div>
		)
	}
}

export default SideBar;
