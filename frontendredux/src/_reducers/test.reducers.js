import { testConstants } from "../_constants";


const initialState = {
    articles: [],
};

function testReducer(state = initialState, action) {

    switch (action.type) {
        case testConstants.ADD_ARTICLE:
            return Object.assign({}, state, {
                articles: state.articles.concat(action.payload)
            });
        case testConstants.DATA_LOADED:
            return Object.assign({}, state, {
                remoteArticles: state.remoteArticles.concat(action.payload)
            });
        default:
            return state;
    }
}

export { testReducer };