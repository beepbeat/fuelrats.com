// Module imports
import { bindActionCreators } from 'redux'
import _ from 'lodash'
import Link from 'next/link'
import React from 'react'
import ReactTable from 'react-table'
import { connect } from 'react-redux'





// Module imports
import { actions } from '../store'
import AddShipForm from './AddShipForm'
import Component from './Component'





class UserShipsPanel extends Component {

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  _renderIDRow (row) {
    let ship = row.original
    let shipId = ship.attributes.shipId.toString()

    while (shipId.length < 4) {
      shipId = `0${shipId}`
    }

    return (
      <span>
        FR{shipId}
      </span>
    )
  }

  _renderShipTypeRow (row) {
    let ship = row.original

    return (
      <span>
        <img
          hidden={true}
          src={`//edassets.org/img/ship-schematics/arithon/${ship.attributes.shipType.toLowerCase().replace(/\s/g, '-')}.svg`} />
        {ship.attributes.shipType}
      </span>
    )
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this.state = {
      loading: false,
    }
  }

  render () {
    let { ships } = this.props
    let { loading } = this.state

    return (
      <div className="panel">
        <ReactTable
          className="user-ships"
          columns={this.columns}
          data={ships}
          defaultPageSize={ships.length || 5}
          loading={loading}
          manual
          noDataText={`No ships registered`}
          showPagination={false} />
        <div className="panel-footer">
          <AddShipForm />
        </div>
      </div>
    )
  }





  /***************************************************************************\
    Getters
  \***************************************************************************/

  get columns () {
    return [
      {
        accessor: 'attributes.shipId',
        Cell: this._renderIDRow,
        className: 'id',
        Header: 'FRID',
        headerClassName: 'id',
        id: 'id',
        resizable: false,
        sortable: true,
        width: 100,
      },
      {
        accessor: 'attributes.name',
        className: 'name',
        Header: 'Name',
        headerClassName: 'name',
        id: 'name',
        resizable: true,
        sortable: true,
      },
      {
        accessor: 'attributes.shipType',
        Cell: this._renderShipTypeRow,
        className: 'type',
        Header: 'Type',
        headerClassName: 'type',
        id: 'type',
        resizable: true,
        sortable: true,
      },
      {
        accessor: 'attributes.owner',
        className: 'owner',
        Header: 'Owner',
        headerClassName: 'owner',
        id: 'owner',
        resizable: true,
        sortable: true,
      },
    ]
  }
}





const mapStateToProps = state => {
  let newState = Object.assign({}, state.ships)

  newState.ships.forEach(ship => {
    ship.attributes.owner = state.rats.rats.find(rat => rat.id = ship.attributes.ratId).attributes.name
  })

  return newState
}





export default connect(mapStateToProps)(UserShipsPanel)
