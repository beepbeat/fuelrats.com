// Module imports
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Link from 'next/link'
import React from 'react'
import { connect } from 'react-redux'





// Module imports
import { actions } from '../store'
import Component from './Component'





class UserShipsPanel extends Component {

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  _renderShips (ships) {
    return ships.map((ship, index) => {
      let {
        id,
      } = ship
      let {
        name,
        platform,
      } = ship.attributes

      console.log('ship', ship)

      return (
        <li
          className="card ship"
          key={index}>
          <header>
            {name}

            <small>{ship.attributes.shipType}</small>
          </header>

          <img src={`//edassets.org/img/ship-schematics/arithon/${ship.attributes.shipType.toLowerCase().replace(/\s/g, '-')}.svg`} />
        </li>
      )
    })
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  render () {
    let { ships } = this.props

    return (
      <div className="user-ships">
        <div className="row">
          <ul className="ships">
            {!ships.retrieving && this._renderShips(ships.ships)}
          </ul>
        </div>

        <form className="row">
          <input className="stretch-9" name="add-ship" placeholder="Add a ship..." type="text" />
          <button data-action="add-ship" type="submit">Add</button>
        </form>
      </div>
    )
  }
}





const mapDispatchToProps = dispatch => {
  return {
    getRats: bindActionCreators(actions.getRats, dispatch),
  }
}

const mapStateToProps = state => {
  let {
    ships,
    user,
  } = state

  console.log('state', state)

  return {
    ships,
    user,
  }
}





export default connect(mapStateToProps, mapDispatchToProps)(UserShipsPanel)
