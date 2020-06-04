import React, { Component } from 'react'
import { setAuthedUser } from '../actions/authedUser'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


class Login extends Component {
  
  state = {
    redirectToReferrer: false
  }
  
  handleChange = (e) => {
        const newUser = e.target.value
        
        this.setState(() => ({
            redirectToReferrer:true
        }))
        
        this.props.dispatch(setAuthedUser(newUser))
    }
    
  render() {

    // dispatch is provided as part of the props via the connect function
    const { dispatch, authedUser, usersList } = this.props
    const selectedItem = authedUser ? authedUser : ""
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state

    if (redirectToReferrer === true) {
          return <Redirect to={from} />
        }
    
    return(
        <div className='center'>
          <h3>Please select a user</h3>
          <select value={selectedItem} onChange={(e)=>this.handleChange(e)}>
            <option value="" disabled>Select user...</option>
            {usersList.map((userId) => (
                <option key={userId} value={userId}>{userId}</option>))}
          </select>
          {authedUser && <div>
              <h3>or</h3>
              <button className='btn' onClick={(e) => dispatch(setAuthedUser(null))}>
                Logout
              </button>
          </div>
          }
        </div>
    )
  }
}

function mapStateToProps({ authedUser, users }) {
    const usersList = Object.keys(users)
    // return the props for this component
    return {
        authedUser,
        usersList,
    }
}

// export connected component which will give us access to dispatch
export default connect(mapStateToProps)(Login)