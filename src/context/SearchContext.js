import createDataContext from './createDataContext';
import api from '../api/google';

const searchReducer = (state, action ) => {
    const { payload, type } = action; 

    switch (type) {
        case 'enter_search':
            return {
                ...state,
                searchTerm: payload.searchTerm,
                searchResults: payload.searchResults
            }
        case 'clear_search':
            return {
                ...state,
                searchTerm: null,
                searchResults: null
            }
    }
}

const searchTerm = (dispatch) => async(query) => {
    const res = await api.search(query);
    dispatch({
        type: 'enter_search',
        payload: {searchTerm: query, searchResults: res.data.items}
    })
}

const clearSearch = (dispatch) => async => {
    dispatch({
        type: 'clear_search'
    })
}


export const {Context, Provider} = createDataContext(
    searchReducer, 
    { searchTerm, clearSearch },
    {searchTerm: null, searchResults: null}
) 
