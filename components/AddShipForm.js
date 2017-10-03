// Module imports
import { bindActionCreators } from 'redux'
import React from 'react'
import { connect } from 'react-redux'





// Component imports
import { actions } from '../store'
import Component from './Component'
import TagsInput from './TagsInput'





const shipTypes = [
  { value: 'Adder' },
  { value: 'Anaconda' },
  { value: 'Asp Explorer' },
  { value: 'Asp Scout' },
  { value: 'Beluga Liner' },
  { value: 'Cobra MkIII' },
  { value: 'Cobra MkIV' },
  { value: 'Diamondback Explorer' },
  { value: 'Diamondback Scout' },
  { value: 'Dolphin' },
  { value: 'Eagle' },
  { value: 'F63 Condor' },
  { value: 'Federal Assault Ship' },
  { value: 'Federal Corvette' },
  { value: 'Federal Dropship' },
  { value: 'Federal Gunship' },
  { value: 'Fer-de-lance' },
  { value: 'Hauler' },
  { value: 'Imperial Clipper' },
  { value: 'Imperial Courier' },
  { value: 'Imperial Cutter' },
  { value: 'Imperial Eagle' },
  { value: 'Imperial Fighter' },
  { value: 'Keelback' },
  { value: 'Orca' },
  { value: 'Python' },
  { value: 'Sidewinder MkI' },
  { value: 'Taipan Fighter' },
  { value: 'Type-6 Transporter' },
  { value: 'Type-7 Transporter' },
  { value: 'Type-9 Heavy' },
  { value: 'Viper MkIII' },
  { value: 'Viper MkIV' },
  { value: 'Vulture' },
]





class AddRatForm extends Component {

  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  _handleOwnerChange (value) {
    this.setState({ ratId: value[0].id })
  }

  _handleShipTypeChange (value) {
    this.setState({ shipType: value[0].value })
  }

  _renderTagsInputLoader () {
    return (
      <span>
        <i className="fa fa-fw fa-pulse fa-spinner" />
        Loading...
      </span>
    )
  }

  _renderRatTagsInputValue (rat) {
    let badgeClasses = ['badge', 'platform', 'short', rat.attributes.platform]

    return (
      <span><span className={badgeClasses.join(' ')} /> {rat.attributes.name}</span>
    )
  }

  _renderShipTypeTagsInputLoader (shipType) {
    return (
      <span>{shipType.value}</span>
    )
  }

  _shipTypeSearch (query) {
    this.setState({ loading: true })

    if (query) {
      return this.updateOptions(shipTypes.filter(shipType => new RegExp(query, 'i').test(shipType.value)))
    }

    this.updateOptions(shipTypes)
  }





  /***************************************************************************\
    Public Methods
  \***************************************************************************/

  constructor (props) {
    super(props)

    this._bindMethods([
      '_handleOwnerChange',
      '_handleShipTypeChange',
      'onSubmit',
    ])

    this.state = {
      name: null,
      ratId: null,
      shipType: null,
      submitting: false,
    }
  }

  async onSubmit (event) {
    let { createShip } = this.props
    let {
      name,
      ratId,
      shipType,
    } = this.state

    event.preventDefault()

    this.setState({ submitting: true })

    console.log('// TODO: Attempt to create a ship')
//    await createShip(name, ratId)

    this.setState({ submitting: false })
  }

  render () {
    let { submitting } = this.state

    let { rats } = this.props

    return (
      <form
        className="add-rat"
        onSubmit={this.onSubmit}>
        <div className="stretch-12">
          <label htmlFor="add-ship">Add a ship</label>
        </div>

        <div className="row">
          <div className="input-group stretch-3">
            <input
              disabled={submitting}
              id="add-ship"
              name="add-ship"
              onChange={event => this.setState({ name: event.target.value })}
              placeholder="Ship Name..."
              type="text" />
          </div>

          <TagsInput
            className="stretch-3"
            data-single
            disabled={submitting}
            placeholder="Type..."
            onChange={this._handleShipTypeChange}
            options={shipTypes}
            renderLoader={this._renderTagsInputLoader}
            renderValue={this._renderShipTypeTagsInputLoader}
            search={this._shipTypeSearch}
            searchDebounce={0} />

          <TagsInput
            className="stretch-3"
            data-single
            disabled={submitting}
            placeholder="Owned by..."
            onChange={this._handleOwnerChange}
            options={rats}
            renderLoader={this._renderTagsInputLoader}
            renderValue={this._renderRatTagsInputValue}
            valueProp="attributes.name" />

          <button
            disabled={!this.isValid() || submitting}
            type="submit">Add</button>
        </div>
      </form>
    )
  }

  isValid () {
    let {
      name,
      ratId,
      shipType,
    } = this.state

    if (!name || !ratId || !shipType) {
      return false
    }

    return true
  }
}





const mapDispatchToProps = dispatch => {
  return {
    createShip: bindActionCreators(actions.createShip, dispatch),
  }
}

const mapStateToProps = state => {
  return Object.assign({}, state.rats)
}





export default connect(mapStateToProps, mapDispatchToProps)(AddRatForm)
