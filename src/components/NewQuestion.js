import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion} from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
    state = {
        optionOneText:'',
        optionTwoText:'',
        toHome: false,
    }
    
    handleChangeOptionOne = (e) => {
        const optionOneText = e.target.value
        
        this.setState(() => ({
            optionOneText:optionOneText
        }))
            
    }
    
    handleChangeOptionTwo = (e) => {
        const optionTwoText = e.target.value
        
        this.setState(() => ({
            optionTwoText:optionTwoText
        }))       
    }
    
    handleSubmit = (e) => {
        e.preventDefault()
        
        const { optionOneText, optionTwoText } = this.state
        //dispatch is coming from the props because it's a connect Component
        const { dispatch, id } = this.props
        
        dispatch(handleAddQuestion(optionOneText, optionTwoText))
        
        this.setState (() => ({
            optionOneText: '',
            optionTwoText: '',
            toHome: id ? false : true,}))
    }
    render() {
        
        const { optionOneText, optionTwoText, toHome } = this.state
        const { userLoggedIn } = this.props
        
        if (toHome === true) {
            return <Redirect to='/' />
        }
        
        if (!userLoggedIn) {
            return <Redirect to='/login' />
        } else {
                
        return(
            <div>
                <h3 className='center'>Compose new Question</h3>
                <form className='new-question' onSubmit={this.handleSubmit}>
                  <h4>Would you Rather?</h4>
                  <textarea
                    placeholder="Option 1"
                    value={optionOneText}
                    onChange={this.handleChangeOptionOne}
                    className='textarea'
                    maxLength={100}
                  />
                  <span className='center'>or</span>
                  <textarea
                    placeholder="Option 2"
                    value={optionTwoText}
                    onChange={this.handleChangeOptionTwo}
                    className='textarea'
                    maxLength={100}
                  />
                  <button
                    className='btn'
                    type='submit'
                    disabled={optionOneText === '' || optionTwoText === ''}>
                      Submit
                  </button>
                </form>
            </div>
            
            )}
    }
}

function mapStateToProps( {authedUser} ){
  return { 
    userLoggedIn: authedUser !== null,
    }
}

// export connected component which will give us access to dispatch
export default connect(mapStateToProps)(NewQuestion)