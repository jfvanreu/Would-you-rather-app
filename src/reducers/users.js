// we import our const variable that we defined in actions/users.
import { RECEIVE_USERS, ADD_QUESTION_TO_USER, ADD_QUESTION_ANSWER_TO_USER} from '../actions/users'

// set a default value to state to avoid error when state is empty
export default function users (state = {}, action) {
    //switch statement over various action types
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                // use the spread operator to create new object
                ...state,
                ...action.users
            }
        
        case ADD_QUESTION_TO_USER:
            return {
                ...state,
                [action.question.author]: {
                    ...state[action.question.author],
                    questions:state[action.question.author].questions.concat([action.question.id])
                    }             
             }
             
        case ADD_QUESTION_ANSWER_TO_USER:
            console.log(state)
            return {
                    ...state,
                    [action.authedUser]: {
                      ...state[action.authedUser],
                      answers: {
                        ...state[action.authedUser].answers,
                        [action.questionId]: action.answer
                      }
                    }
                  }
                
        default:
            return state
    }
}