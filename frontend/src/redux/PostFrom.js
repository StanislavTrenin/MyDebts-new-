import React, {Component} from 'react';
import {connect} from "react-redux";

class PostForm extends Component {
    prevId = 0;

    handleSubmit = event => {
        event.preventDefault();
        const title = this.getTitle.value;
        const message = this.getMessage.value;
        const data = {
            id: (this.prevId += 1),
            title,
            message
        };
        this.props.dispatch({
            type: "ADD_POST",
            data
        });

        this.getTitle.value = '';
        this.getMessage.value = '';
    };


    render() {

        return (
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title mb-5 text-center">Создать статью</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                ref={input => this.getTitle = input}
                                required
                                className="form-control"
                                type="text"
                                placeholder="Введите заголовок"
                            />
                        </div>
                        <div className="form-group">
              <textarea
                  ref={input => this.getMessage = input}
                  required
                  rows="4"
                  className="form-control"
                  placeholder="Сообщение"
              />
                        </div>
                        <button className="btn btn-success">ОПУБЛИКОВАТЬ</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default connect()(PostForm);