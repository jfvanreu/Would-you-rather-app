import { combineReducers } from 'redux'
import authedUser from '../reducers/authedUser'
import users from '../reducers/users'
import questions from '../reducers/questions'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers ({
    authedUser,
    users,
    questions,
    loadingBar: loadingBarReducer,
})

/* Note that the combineReducers syntax above is a ES6 shorthand.
It's equivalent to the following.
combineReducers({
  authedUser: authedUser,
  questions: questions,
  users: users
});
*/