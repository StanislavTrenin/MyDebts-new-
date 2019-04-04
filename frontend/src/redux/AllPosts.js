import React, {Component} from 'react';
import {connect} from "react-redux";

import Post from './Post';

class AllPost extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-header">
                    <h3 className="text-center">Все статьи</h3>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        {this.props.posts.map(post => (
                            <Post key={post.id} post={post} />
                        ))}
                    </li>
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        posts: state
    }
};

export default connect(mapStateToProps)(AllPost);