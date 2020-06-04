import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'

class Leaderboard extends Component {
    
    render() {
        const { userIds } = this.props
            
        return(
            <div>
                <h2 className='center'>Leaderboard</h2>
                <ol className='user-list'>
                    {userIds.map((userId) => (
                        <li key={userId}>
                            <User userId={userId} />
                        </li>
                    ))}
                </ol>   
            </div>
        )}
}

function mapStateToProps( { users } ){
  return { 
    userIds: Object.keys(users) 
        // sort users in score descending order
        .sort((a,b) => (Object.keys(users[b].answers).length + users[b].questions.length) -
                         (Object.keys(users[a].answers).length + users[a].questions.length))
    }
}

//special export because it's a connected component
export default connect(mapStateToProps)(Leaderboard)