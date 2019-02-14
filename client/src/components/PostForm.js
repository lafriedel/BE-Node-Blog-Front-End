import React from 'react';

const PostForm = props => {
    function conditionalSubmit(e) {
        e.preventDefault();
        if (props.isUpdating) {
            props.updatePost();
        } else {
            props.addNewPost();
        }
    }

    return (
        <>
            <h2>{props.isUpdating ? "Update Post" : "Add Post"}</h2>
            <p className="error">{props.error && "There was an error. Please fill out all information."}</p>
            <form onSubmit={e => conditionalSubmit(e)}>
                <input type="text" name="title" value={props.title} placeholder="Post title" onChange={e => props.handleChange(e)} />
                <input type="text" name="contents" value={props.contents} placeholder="Post contents" onChange={e => props.handleChange(e)} />
                <button>{props.isUpdating ? "Update Post" : "Add Post"}</button>
            </form>
        </>
    )
}

export default PostForm;