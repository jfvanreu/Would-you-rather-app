import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

class Nav extends Component {
  
  render() {
        const {name, avatarURL} = this.props
        const loginLabel = name === '' ? 'Login' : 'Logout'
        
          return (
            <nav className='nav'>
              <ul>
                { name !== '' && 
                  <Fragment>
                    <li>
                      <NavLink to='/' exact activeClassName='active'>
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to='/add' activeClassName='active'>
                        New Question
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to='/leaderboard' activeClassName='active'>
                        Leaderboard
                      </NavLink>
                    </li>
                  </Fragment>
                }
                <li>
                  <NavLink to='/login' activeClassName='active'>
                    {loginLabel}
                  </NavLink>
                </li>                
                { avatarURL &&
                    <li>
                        <img
                        src={avatarURL}
                        alt={`Avatar of ${name}`}
                        className='avatar-login'/>
                        <span>{name}</span>
                    </li>
                }
              </ul>
            </nav>
          )
    }
} 

function mapStateToProps({authedUser, questions, users}) {
    if (authedUser === null) {
        return {
            name:'',
            avatarURL:null,
        }
    } else {
        const currentUser = users[authedUser]
        const {name, avatarURL} = currentUser
        return {
            name,
            avatarURL,
        }
   }
}

export default connect(mapStateToProps)(Nav)