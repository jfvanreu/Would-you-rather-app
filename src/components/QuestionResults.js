import React, { Component } from 'react'
import { connect } from 'react-redux'
import OptionResult from './OptionResult'
import { Link } from 'react-router-dom'

class QuestionResults extends Component {
    
    render() {
        const {userId, name, avatarURL, optionOne, optionTwo} = this.props
        const total_responses = optionOne.votes.length + optionTwo.votes.length
        const selectedOne = optionOne.votes.includes(userId) ? true : false
        const selectedTwo = optionTwo.votes.includes(userId) ? true : false
        
        return(
                <div className='question-results'>
                    <figure>
                        <img src={avatarURL} alt={`Avatar of ${name}`} className='avatar'/>
                        <figcaption>{name} asked...<br/><b>Would You Rather?</b></figcaption>
                    </figure>
                    <div>    
                        <OptionResult optionText={optionOne.text} picks={optionOne.votes.length} total={total_responses} selected={selectedOne}/>
                        <OptionResult optionText={optionTwo.text} picks={optionTwo.votes.length} total={total_responses} selected={selectedTwo}/>
                    </div>
                    <Link to={`/`} className='answer-btn'>Back to List</Link>
                </div>
            )
    }
}

function mapStateToProps({authedUser, questions, users}, {questionId}) {
    const question = questions[questionId]
    const {author, optionOne, optionTwo} = question
    const user = users[author]
    const {name, avatarURL} = user
    return {
        userId:authedUser,
        name,
        avatarURL,
        optionOne,
        optionTwo,
    }
}

export default connect(mapStateToProps)(QuestionResults)