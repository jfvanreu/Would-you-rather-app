import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import QuestionList from './QuestionList'
import Leaderboard from './Leaderboard'
import NewQuestion from './NewQuestion'
import QuestionPage from './QuestionPage'
import Login from './Login'
import Nav from './Nav'
import LoadingBar from 'react-redux-loading'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import '../index.css'
import PrivateRoute from './PrivateRoute'
import PageNotFound from './PageNotFound'


class App extends Component {
    componentDidMount() {
        //we have access to dispatch because it's a connected component
        this.props.dispatch(handleInitialData())
    }
    
    render() {
      const authedUser = this.props.authedUser
      return (
        <Router>
            <Fragment>
               <LoadingBar/>
               <div>
                    <Nav />
                    {this.props.loading === true
                    ? null
                    : <div>
                        <Switch>
                            <PrivateRoute path='/' exact component={QuestionList} authedUser={authedUser} />
                            <PrivateRoute path='/question/:QuestionId' component={QuestionPage} authedUser={authedUser} />
                            <PrivateRoute path='/add' component={NewQuestion} authedUser={authedUser} />
                            <PrivateRoute path='/leaderboard' component={Leaderboard} authedUser={authedUser} />
                            <Route path='/login' component={Login} />
                            <Route path="*" component={PageNotFound} />
                        </Switch>
                      </div>
                    }
                </div>
            </Fragment>
        </Router>
     )
    }
}

function mapStateToProps ({ authedUser, questions }) {
    return {
        //loading will be true if authedUser is not assigned to any value
        loading: questions === null,
        authedUser: authedUser
    }

}
//we don't need anything from the state so we leave the first argument to Connect blank
export default connect(mapStateToProps)(App)

