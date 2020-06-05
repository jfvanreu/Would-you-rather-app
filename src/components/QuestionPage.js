import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionAnswer from './QuestionAnswer'
import QuestionResults from './QuestionResults'
import PageNotFound from './PageNotFound'

class QuestionPage extends Component {

    render() {
        const { questionId, answeredQuestion, foundQuestion } = this.props
        
        if (!foundQuestion) {
            return <PageNotFound />
        } else {
            return (answeredQuestion ?  <QuestionResults questionId={questionId}/> : <QuestionAnswer questionId={questionId}/>)
        }
    }
}

function mapStateToProps({authedUser, questions, users}, props) {
    const questionId = props.match.params.QuestionId
    const question = questions[questionId]
    const foundQuestion = question ? true : false
    const answeredQuestion = foundQuestion ? ((question.optionOne.votes.includes(authedUser)) ||  (question.optionTwo.votes.includes(authedUser))) : (false)

    return {
        questionId,
        answeredQuestion,
        foundQuestion,
    }
}

export default connect(mapStateToProps)(QuestionPage)

