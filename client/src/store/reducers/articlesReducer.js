import * as actionTypes from '../actions/actionTypes';

const initialState = {
    articles: [],
    article: {},
    myArticles: {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GOT_ALL_ARTICLES:
            return {
                ...state,
                articles: action.articles,
            }
        case actionTypes.GET_MY_ARTICLES:
            // console.log(action.myArticles)
            return {
                ...state,
                myArticles: action.myArticles
            }
        case actionTypes.GOT_THE_ARTICLE:
            // console.log(action.theArticle);
            return {
                ...state,
                currentArticle: action.theArticle
            }
        case actionTypes.DELETED_THE_ARTICLE:
            return {
                ...state,
                currentArticle: {}
            }
        case actionTypes.CREATED_ARTICLE:
            return {
                ...state,
                newArticleId: action.articleId
            }
        case actionTypes.EDITED_THE_ARTICLE:
            return {
                ...state,
            }
        default: {
            return state;
        }
    }
}

export default reducer;