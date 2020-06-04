import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link } from 'react-router-dom'

class Question extends Component {

    render() {
        const { questionId, name, avatarURL, optionOne, optionTwo } = this.props
        
        if (name === null) {
            return <Redirect to='*' />
        }
        
        return(
            <div className="question">
                <img
                    src={avatarURL}
                    alt={`Avatar of ${name}`}
                    className='avatar'/>
                    <p className='user-info'>{name} wonders...</p>
                <span className="question-info">Would you rather {optionOne.text} or {optionTwo.text}?</span>
                <Link className="btn" to={`/question/${questionId}`}> View Poll </Link>
            </div>)
    }
}

function mapStateToProps({authedUser, questions, users}, {questionId}) {
    const question = questions[questionId]
    const {author, optionOne, optionTwo} = question
    const user = users[author]
    const {name, avatarURL} = user

    return {
        questionId,
        name,
        avatarURL,
        optionOne,
        optionTwo,
    }
}

export default connect(mapStateToProps)(Question)