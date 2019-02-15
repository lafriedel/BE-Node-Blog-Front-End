import React, { Component } from "react";
import axios from "axios";

import User from "./components/User";
import PostForm from "./components/PostForm";
import "./App.css";

class App extends Component {
  state = {
    posts: [],
    post: {
      title: "",
      contents: ""
    },
    users: [],
    userPosts: [],
    error: false,
    isUpdating: false
  };

  componentDidMount() {
    // axios.get("https://leigh-node-blog.herokuapp.com/api/posts")
    //   .then(res => {
    //     this.setState({
    //       posts: res.data.reverse()
    //     });
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   })

    axios
      .get("https://leigh-node-blog.herokuapp.com/api/users")
      .then(res => {
        this.setState({
          users: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getUserPosts = (e, id) => {
    e.preventDefault();
    axios
      .get(`https://leigh-node-blog.herokuapp.com/api/users/${id}/posts`)
      .then(res => {
        this.setState({
          userPosts: res.data
        });
      });
  };

  clearUserPosts = e => {
    e.preventDefault();
    this.setState({
      userPosts: []
    });
  };

  handleChange = e => {
    this.setState({
      ...this.state,
      post: {
        ...this.state.post,
        [e.target.name]: e.target.value
      }
    });
  };

  addNewPost = () => {
    axios
      .post("https://leigh-node-blog.herokuapp.com/api/posts", this.state.post)
      .then(res => {
        axios
          .get("https://leigh-node-blog.herokuapp.com/api/posts")
          .then(res => {
            this.setState({
              posts: res.data.reverse(),
              post: {
                title: "",
                contents: ""
              },
              error: false
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          ...this.state,
          error: true
        });
      });
  };

  populateForm = (e, id) => {
    e.preventDefault();
    this.setState({
      isUpdating: true,
      post: this.state.posts.find(post => post.id === id)
    });
  };

  updatePost = () => {
    axios
      .put(
        `https://leigh-node-blog.herokuapp.com/api/posts/${this.state.post.id}`,
        this.state.post
      )
      .then(res => {
        axios
          .get("https://leigh-node-blog.herokuapp.com/api/posts")
          .then(res => {
            this.setState({
              posts: res.data.reverse(),
              post: {
                title: "",
                contents: ""
              },
              error: false,
              isUpdating: false
            });
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          ...this.state,
          error: true
        });
      });
  };

  render() {
    return (
      <div className="App">
        <PostForm
          isUpdating={this.state.isUpdating}
          error={this.state.error}
          addNewPost={this.addNewPost}
          updatePost={this.updatePost}
          handleChange={this.handleChange}
          title={this.state.post.title}
          contents={this.state.post.contents}
        />
        {this.state.users.map(user => (
          <User
            populateForm={this.populateForm}
            getUserPosts={this.getUserPosts}
            clearUserPosts={this.clearUserPosts}
            userPosts={this.state.userPosts}
            users={this.state.users}
            user={user}
            key={user.id}
            match={this.props.match}
          />
        ))}
      </div>
    );
  }
}

export default App;
