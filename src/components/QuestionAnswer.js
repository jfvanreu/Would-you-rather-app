import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'
//import { Link, withRouter } from 'react-router-dom'


class QuestionAnswer extends Component {

    handleSubmit = () => {
        const optionOneChecked = document.getElementById('one').checked
        const optionTwoChecked = document.getElementById('two').checked
        
        if (!optionOneChecked && !optionTwoChecked) {
            alert('Please select an option')
        }
        
        else {
            //dispatch is coming from the props because it's a connect Component
            const { dispatch, questionId } = this.props
            const answer = optionOneChecked ? "optionOne" : "optionTwo"
            dispatch(handleAnswerQuestion(questionId, answer))
        }
    }
    
    render() {
        const {name, avatarURL, optionOne, optionTwo} = this.props

        return(          
            <div className='question-results'>
                <figure className="center">
                    <img src={avatarURL} alt={`Avatar of ${name}`} className='avatar'/>
                    <figcaption>{name} asked...<br/></figcaption>
                </figure>
                <b className="center">Would You Rather?</b>
                <br/>
                <div>
                    <input type="radio" name="option" id="one"/>{optionOne.text}
                    <br/>
                    <input type="radio" name="option" id="two"/>{optionTwo.text}
                </div>
                <button className='btn' onClick={() => this.handleSubmit()}>Submit</button>
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
        questionId,
        name,
        avatarURL,
        optionOne,
        optionTwo,
    }
}

export default connect(mapStateToProps)(QuestionAnswer)
