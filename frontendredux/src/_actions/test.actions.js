import { testConstants } from "../_constants";

export const testActions = {
    addArticle,
    getData
};

function addArticle(payload) {
    return {type: testConstants.ADD_ARTICLE, payload}
}

function getData() {
    return function (dispatch) {
        return fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then(json => {
                return {type: "DATA_LOADED", payload: json};
            });
    };
}