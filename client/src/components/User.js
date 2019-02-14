import React from 'react';
import { Route, Link } from 'react-router-dom';
import UserPosts from './UserPosts';

const User = props => {
    return (
        <>
        <h1>{props.user.name}</h1>
        <Route path ={`/${props.user.id}`} render={props => <UserPosts {...props} /> } />
        <Link to={`/${props.user.id}`}><button onClick={e => props.getUserPosts(e, props.user.id)}>View Posts</button></Link>
        <button onClick={e => props.clearUserPosts(e)}>Clear</button>
        </>
    )
}

export default User;