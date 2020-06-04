// we import our const variable that we defined in actions/questions.
import { RECEIVE_QUESTIONS, ADD_QUESTION, ADD_ANSWER_TO_QUESTION } from '../actions/questions'

// set a default value to state to avoid error when state is empty
export default function questions (state = {}, action) {
    //switch statement over various action types
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                // use the spread operator to create new object
                ...state,
                ...action.questions,
            }
        case ADD_QUESTION:
            return {
                // create a copy of the state using the spread operator
                ...state,
                // add the new question object to the state 
                [action.question.id]: action.question,
                }
        
        case ADD_ANSWER_TO_QUESTION:
            return {
                ...state,
                [action.questionId]: {
                  ...state[action.questionId],
                  [action.answer]: {
                    ...state[action.questionId][action.answer],
                    votes: state[action.questionId][action.answer].votes.concat([action.authedUser])
                  }
                }
              }
        default:
            return state
    }
}