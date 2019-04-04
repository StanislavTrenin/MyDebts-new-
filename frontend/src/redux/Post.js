import React, { Component } from 'react';

class Post extends Component {
    render() {
        return (
            <div>
                <h3>{this.props.post.title}</h3>
                <h6>{this.props.post.message}</h6>
                <hr />
            </div>
        );
    }
}

export default Post;