import React, { Component } from 'react'
// http
import axios from 'axios'
// keys and uri
import config from '../config'
// used for setting height on 'body'
import Measure from 'react-measure'
// material-ui theme things
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// components
import AppBar from 'material-ui/AppBar'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Toggle from 'material-ui/Toggle'
import Slider from 'material-ui/Slider'
import Table from './Table'

const theme = getMuiTheme(darkBaseTheme)

export default class extends Component {
  state = {
    height: null,
    records: [],
    params: {
      orderBy: {
        key: null,
        dir: 'asc'
      },
      page: {
        current: 1,
        limit: 200
      }
    }
  }

  async getRequest() {
    const { orderBy, page } = this.state.params

    const query = new URLSearchParams()
    query.append('orderBy.key', orderBy.key)
    query.append('orderBy.dir', orderBy.dir)
    query.append('page.current', page.current)
    query.append('page.limit', page.limit)

    // template literal === query.toString
    const res = await axios.get(`${config.apiUri}?${query}`)

    const { records } = res.data
    this.setState({ records })
  }

  componentWillMount() {
    this.getRequest()
  }

  handleOrderByChange(e, i, val) {
    const orderBy = {...this.state.params.orderBy, key: val}
    this.setState({params: {...this.state.params, orderBy}})
  }

  handleOrderBySortChange(e, isAscending) {
    const orderBy = {...this.state.params.orderBy, dir: isAscending ? 'asc' : 'desc'}
    this.setState({params: {...this.state.params, orderBy}})
  }

  handlePageLimitChange(e, val) {
    const page = {...this.state.params.page, limit: val}
    this.setState({params: {...this.state.params, page}})
  }

  handlePageCurrentChange(e, i, val) {
    const page = {...this.state.params.page, current: val}
    this.setState({params: {...this.state.params, page}})
  }

  renderOrderByOptions() {
    const options = [
      <MenuItem key='nullable' value={ null } primaryText='' />
    ]

    config.keys.forEach(key => {
      return options.push(
        <MenuItem key={ key } value={ key } primaryText={ key.search(/address/) !== -1 ? key.substring(8, key.length).toUpperCase() : key.toUpperCase() } />
      )
    })

    return options
  }

  renderPageOptions() {
    const options = []
    let i = 1
    while (i <= 200) {
      options.push(
        <MenuItem key={ i } value={ i } primaryText={`Page ${i}`} />
      )
      i++
    }
    return options
  }

  render() {
    const { records } = this.state

    const style_container = {
        height: this.state.height,
        backgroundColor: theme.baseTheme.palette.canvasColor
      }

    const style_filtersContainer = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px'
    }

    const style_filter = {
      flexGrow: '1'
    }

    return (
      <MuiThemeProvider muiTheme={ theme }>
        <div>
          <Measure onMeasure={ dimensions => this.setState({height: `calc(100vh - ${dimensions.height}px)`}) }>
            <AppBar
              title='AppThis Code Challenge'
              showMenuIconButton={ false }
              />
          </Measure>
          <div style={ style_container }>
            <div style={ style_filtersContainer }>
              <div style={ style_filter}>
                <SelectField
                  floatingLabelText='ORDER BY'
                  value={ this.state.params.orderBy.key }
                  onChange={ this.handleOrderByChange.bind(this) }
                  >
                  { this.renderOrderByOptions() }
                </SelectField>
              </div>
              <div style={ style_filter }>
                <Toggle
                  label={`SORT ${this.state.params.orderBy.dir.toUpperCase()}`}
                  labelPosition='right'
                  defaultToggled={ true }
                  onToggle={ this.handleOrderBySortChange.bind(this) }
                  />
              </div>
              <div style={ style_filter }>
                <SelectField
                  value={ this.state.params.page.current }
                  onChange={ this.handlePageCurrentChange.bind(this) }
                  maxHeight={ 200 }
                  >
                  { this.renderPageOptions() }
                </SelectField>
              </div>
              <div style={ style_filter }>
                <label style={{color: 'white'}}>{`RECORD LIMIT: ${this.state.params.page.limit}`}</label>
                <Slider
                  min={ 1 }
                  max={ 200 }
                  step={ 1 }
                  defaultValue={ 200 }
                  value={ this.state.params.page.limit }
                  onChange={ this.handlePageLimitChange.bind(this) }
                  />
              </div>
            </div>
            <RaisedButton
              label='Make Request'
              onClick={ this.getRequest.bind(this) }
              secondary={ true }
              fullWidth={ true }
              />
            <Table rows={ records } />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
