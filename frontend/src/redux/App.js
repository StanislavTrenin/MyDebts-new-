import React, {Component} from 'react';
import PostForm from './PostFrom';
import AllPosts from './AllPosts';
import NavBar from '../NavBar/NavBar';

class App extends Component {
    render() {
        return (
            <div className="container" style={{ marginTop: '150px' }}>
                <NavBar/>
                {/*<div className="row">
                    <div className="col-lg-6">
                        <PostForm />
                    </div>
                    <div className="col-lg-6">
                        <AllPosts />
                    </div>
                </div>*/}
            </div>
        );
    }
}

export default App;