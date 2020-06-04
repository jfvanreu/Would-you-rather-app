import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import {receiveQuestions } from '../actions/questions'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

// we hardcode the name of the user for now. Later, we'll add the sign in.
//const AUTHED_ID = 'tylermcginnis'
const AUTHED_ID = null

export function handleInitialData () {
    
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({questions, users}) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestions(questions))
                dispatch(setAuthedUser(AUTHED_ID))
                dispatch(hideLoading())
            })
    }

}