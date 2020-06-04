import React, { Component } from 'react'
import PropTypes from 'prop-types'

class OptionResult extends Component {
  static propTypes = {
    optionText: PropTypes.string.isRequired,
    picks: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
  }

  render() {

    const { optionText, picks, total, selected } = this.props
    const pct = Number(((picks / total) * 100).toFixed(2))

    const checkmark = selected ? "checkmark" : null
    
    return(
         <div className="option-result">
             <ul className={checkmark}>
                <li>{optionText}</li>
             </ul>
             <progress value={pct} max="100"></progress>
             <p className="option-result-label">{`${pct} % (${picks} out of ${total} person(s))`}</p>
        </div>
    )
  }
}

export default OptionResult;