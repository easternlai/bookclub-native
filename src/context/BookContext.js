import createDataContext from './createDataContext';
import api from '../api/api';
import Axios from 'axios';

const bookReducer = (state, action)=>{
    const { type, payload } = action;
    switch(type) {
        case 'get_books':
            return {
                ...state,
                books: payload
            }
        case 'book_error':
            return {
                ...state,
                error: payload
            }
        case 'update_likes':
            return {
                ...state,
                books: state.books.map(book => 
                    book._id === payload.id ? {...book, likes: payload.likes}: book 
                    )
            }
        case 'delete_book':
            return {
                ...state,
                books: state.books.filter(book => book._id != payload)
            }
        case 'add_book':
            return {
                ...state,
                books: [payload, ...state.books]
            }
        case 'get_book':
            return {
                ...state,
                book: payload
            }
        case 'add_comment':
            return {
                ...state,
                book: {...state.book, comments: payload}
            }
        case 'delete_comment':
            return {
                ...state,
                book: {
                    ...state.book, 
                    comments: state.book.comments.filter(comment => comment._id != payload)}
            };
        default:
            return state;
    }
}


const getBooks = (dispatch) => async ()=> {
    try {
        const res = await api.get("/api/books");
        dispatch({
            type: 'get_books',
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: 'book_error',
            payload: { msg: 'err.response.statusText, status: err.response.status' },
        });
    }
}

const addLike = (dispatch) => async (id) => {
    try {
        const res = await api.
        put(`/api/books/like/${id}` );
        dispatch({ 
            type: 'update_likes',
            payload: {id, likes: res.data}
        });
    } catch (err) {
        dispatch({
            type: 'book_error',
            payload: 'Cannot like this post'
        });
    }
}

const removeLike = (dispatch) => async(id) => {
    try {
        const res = await api.put(`/api/books/unlike/${id}`);
        dispatch({
            type: 'update_likes',
            payload: { id, likes: res.data}
        })
    } catch (err) {
        dispatch({
            type: 'book_error',
            payload: {msg: "error deleting like"}
        })
    }
}

const deleteBook = dispatch=> async(id) => {
    try {
        const res = await api.delete(`/api/books/${id}`);

        dispatch({
            type: 'delete_book',
            payload: id
        })

    } catch (err) {
        dispatch({
            type: 'book_error',
            payload: {msg: "error deleting book"}
        })
    }
};

const addBook = dispatch => async(title, author, image ) => {
    try { 
        const res = await api.post(`/api/books`, {title, author, image});

        dispatch({
            type: 'add_book',
            payload: res.data
        })

    }catch(err){
        dispatch({
            type: 'book_error',
            payload: {msg: "error adding book"}
        })
    }
}

const getBook = dispatch => async(id) => {
    try {
        const res = await api.get(`/api/books/${id}`);
        dispatch({
            type: 'get_book',
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: 'book_error',
            payload: {msg: 'error getting book'}
        })
    }
}

const addComment = dispatch=> async (id, formData) => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    try {
        const res = await api.post(`/api/books/comment/${id}`, formData, config);
        
        dispatch({
            type: 'add_comment',
            payload: res.data
        })
    } catch (err) {
        console.log (err.response);
        dispatch({
            type: 'book_error',
            payload: {msg: 'error adding comment'}
        })
    }
}

const deleteComment = dispatch => async (bookId, commentId) => {
    try {
        const res = await api.delete(`/api/books/comment/${bookId}/${commentId}`);
        dispatch({
            type: 'remove_comment',
            payload: commentId
        })
    } catch (err) {
        dispatch({
            type: 'book_error',
            payload: {msg: 'error deleting comment'}
        })
    }
}

export const {Context, Provider} = createDataContext(
    bookReducer, 
    { getBooks, addLike, removeLike, deleteBook, addBook, getBook, addComment, deleteComment },
    {books: [], book: null, error: {}}
)