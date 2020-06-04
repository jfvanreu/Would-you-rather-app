import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestion, saveQuestionAnswer } from '../utils/api'

import { addQuestionToUser, addQuestionAnswerToUser } from '../actions/users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'
export const ADD_ANSWER_TO_QUESTION = 'ADD_ANSWER_TO_QUESTION'

//action creator receiveQuestions
export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

//action creator add question (by definition will return an action)
function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

//action creator to add answer to question
function addAnswerToQuestion ({authedUser, questionId, answer}) {
    return {
        type: ADD_ANSWER_TO_QUESTION,
        authedUser,
        questionId,
        answer,
    }
}

//async action creator to save the question
export function handleAddQuestion(optionOneText, optionTwoText) {
    //using redux thunk, we will return a function which has 2 functions as arguments
    //we can use those functions to collect info (getState) from the state and dispatch
    //actions to the reducers.
    return (dispatch, getState) => {
        const { authedUser } = getState()
        
        dispatch(showLoading())
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author:authedUser,
        })
        .then((question) => {
            dispatch(addQuestion(question))
            dispatch(addQuestionToUser(question))
            })
        .then(() => dispatch(hideLoading()))
    }
}

//async action creator to save the question
export function handleAnswerQuestion(questionId, answer) {
    //using redux thunk, we will return a function which has 2 functions as arguments
    //we can use those functions to collect info (getState) from the state and dispatch
    //actions to the reducers.
    return (dispatch, getState) => {
        const { authedUser } = getState()
        
        dispatch(showLoading())
        return saveQuestionAnswer({
            authedUser,
            questionId,
            answer,
        })
        .then(() => {
            dispatch(addQuestionAnswerToUser({authedUser, questionId, answer}))
            dispatch(addAnswerToQuestion({authedUser, questionId, answer}))
            })
        .then(() => dispatch(hideLoading()))
    }
}