import { combineReducers } from 'redux';
import books from './booksReducer';
import activeBook from './activeBookReducer';

const rootReducer = combineReducers({
  books,
  activeBook
});

export default rootReducer;
