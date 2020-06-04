import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionAnswer from './QuestionAnswer'
import QuestionResults from './QuestionResults'

class QuestionPage extends Component {

    render() {
        const { questionId, answeredQuestion } = this.props
        
        return (answeredQuestion ?  <QuestionResults questionId={questionId}/> : <QuestionAnswer questionId={questionId}/>)  
    }
}

function mapStateToProps({authedUser, questions, users}, props) {
    const questionId = props.match.params.QuestionId
    const question = questions[questionId]
    const answeredQuestion = (question.optionOne.votes.includes(authedUser)) ||  (question.optionTwo.votes.includes(authedUser))

    return {
        questionId,
        answeredQuestion,
    }
}

export default connect(mapStateToProps)(QuestionPage)

