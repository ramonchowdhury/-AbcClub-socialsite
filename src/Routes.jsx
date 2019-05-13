import React from'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/common/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import TimeLine from './components/timeline/TimeLine';
import About from './components/profile/About';
import CreateProfile from './components/profile/CreateProfile';
import EditProfile from './components/profile/EditProfile';
import AddExperience from './components/profile/AddExperience';
import AddEducation from './components/profile/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';

import Post from './components/post/Post';

const BaseRouter = () => (
    <Switch>
        <Route path="/register" component = {Register} />
        <Route path="/login" component = {Login} />
        <PrivateRoute exact path='/' component={TimeLine} />
        <PrivateRoute path='/about' component={About} />
        <PrivateRoute path='/create-profile' component={CreateProfile} />
        <PrivateRoute path='/edit-profile' component={EditProfile} />
        <PrivateRoute path='/add-experience' component={AddExperience} />
        <PrivateRoute path="/add-education" component={AddEducation} />
        <PrivateRoute path='/post/:id' component={Post} />
        <PrivateRoute path="/profiles" component = {Profiles} />
        <PrivateRoute path="/profile/:handle" component = {Profile} />
    </Switch>
);
export default BaseRouter;