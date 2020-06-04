import React, { Component } from 'react'
//import connect because it's a connected component (container)
import { connect } from 'react-redux'
import Question from './Question'
import { Redirect } from 'react-router-dom'

class QuestionList extends Component {
    
    state = {
        answeredQuestions: false 
    }
    
    toggle = () => {
        if (this.state.answeredQuestions) {
            this.setState({answeredQuestions: false})}
        else {this.setState({answeredQuestions: true})
        }
        return this.answeredQuestions
    }
        
    render() {
    
        const { userLoggedIn, answeredQuestionsIds, unAnsweredQuestionsIds } = this.props
        const title = this.state.answeredQuestions ? "Answered Questions" : "Unanswered Questions"
        const questionsIds = this.state.answeredQuestions ? answeredQuestionsIds : unAnsweredQuestionsIds
      
        if (!userLoggedIn) {
            return <Redirect to='/login' />
        } else {
            return(
                <div>
                    <button className="btn" onClick={() => this.toggle()}>{title}</button>
                    <ul className='question-list'>
                        {questionsIds.map((id) => (
                            <li key={id}>
                                <Question questionId={id} />
                            </li>
                        ))}
                    </ul>   
                </div>
            )
        }
    }
}

function mapStateToProps( {authedUser, questions} ){
  
  const questionsIds = Object.keys(questions)
  
  // filter answered and unanswered questions for authedUser and return as props
  const answeredQuestionsIds = questionsIds.filter((questionId) => 
                            ((questions[questionId].optionOne.votes.includes(authedUser)) || 
                            (questions[questionId].optionTwo.votes.includes(authedUser))))
                            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
  const unAnsweredQuestionsIds = questionsIds.filter((questionId) => 
                            ((!questions[questionId].optionOne.votes.includes(authedUser)) && 
                            (!questions[questionId].optionTwo.votes.includes(authedUser))))
                            .sort((a,b) => questions[b].timestamp - questions[a].timestamp)                            

return { 
    userLoggedIn: authedUser,
    answeredQuestionsIds,
    unAnsweredQuestionsIds,
    }
}


//special export because it's a connected component
export default connect(mapStateToProps)(QuestionList)