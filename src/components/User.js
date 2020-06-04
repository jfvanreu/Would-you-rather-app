import React, { Component } from 'react'
import { connect } from 'react-redux'

class User extends Component {

    render() {
        const { name, avatarURL, answersCount, questionsCount } = this.props
        const score = answersCount + questionsCount
        return(
            <div className='user'>
                <figure>
                   <img src={avatarURL} alt={`Avatar of ${name}`} className='avatar'/>
                   <figcaption>{name}</figcaption>
                 </figure>
                 <ul className='user-results'>
                    <li> answered {answersCount} questions </li>
                    <li> asked {questionsCount} questions </li>
                 </ul>
                 <p className='numberCircle'>{score}</p>
            </div>)
    }

}

function mapStateToProps({ users }, { userId }) {
    const user = users[userId]
    const {name, avatarURL, answers, questions} = user
    const answersCount = answers ? Object.keys(answers).length : 0
    const questionsCount = questions ? questions.length : 0
    return {
        name,
        avatarURL,
        answersCount,
        questionsCount,
    }
}

export default connect(mapStateToProps)(User)

//<h3>{name} has answered {answersCount} questions and asked {questionsCount} questions. Score is {score}</h3>
