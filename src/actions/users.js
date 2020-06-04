export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER'
export const ADD_QUESTION_ANSWER_TO_USER = 'ADD_QUESTION_ANSWER_TO_USER'

//action creator receiveUsers
export function receiveUsers (users) {
    return {
        type: RECEIVE_USERS,
        users,
    }
}

//action create addQuestionToUser
export function addQuestionToUser (question) {
    return {
        type: ADD_QUESTION_TO_USER,
        question
    }
}

//action create addQuestionAnswerToUser
export function addQuestionAnswerToUser ({authedUser, questionId, answer}) {
    return {
        type: ADD_QUESTION_ANSWER_TO_USER,
        authedUser,
        questionId,
        answer,
    }
}