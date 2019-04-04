import {ADD_ARTICLE, FOUND_BAD_WORD, DATA_LOADED} from "../constants/action-types";


const initialState = {
    articles: [],
    remoteArticles: []
};

function rootReducer(state = initialState, action) {
    if (action.type === FOUND_BAD_WORD) {
        console.log('bad word');
        return Object.assign({}, state, {
            articles: state.articles
        });
    }

    if (action.type === ADD_ARTICLE) {
        return Object.assign({}, state, {
            articles: state.articles.concat(action.payload)
        });
    }

    if (action.type === DATA_LOADED) {
        return Object.assign({}, state, {
            remoteArticles: state.remoteArticles.concat(action.payload)
        });
    }
    return state;
}

export default rootReducer;