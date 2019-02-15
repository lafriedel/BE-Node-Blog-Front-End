import React from 'react';
import { Route, Link } from 'react-router-dom';
import UserPosts from './UserPosts';

const User = props => {
    return (
        <>
        <h1>{props.user.name}</h1>
        <button onClick={e => props.getUserPosts(e, props.user.id)}><Link to={`/${props.user.id}`}>View Posts</Link></button>
        <button onClick={e => props.clearUserPosts(e)}>Clear</button>
        <Route path ={`/:id`} render={props => <UserPosts {...props} /> } />
        </>
    )
}

export default User;