import React, { Component } from 'react'
import axios from 'axios'
import config from '../config'
import Measure from 'react-measure'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
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
    console.log('params', this.state.params);
    const res = await axios.get(config.apiUri, this.state.params)
    console.log('res.data', res.data);
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

  renderPageOptions() {
    const options = []
    let i = 1
    while (i <= 200) {
      options.push(
        <MenuItem value={ i } primaryText={`Page ${i}`} />
      )
      i++
    }
    return options
  }

  render() {
    console.log('our state', this.state);
    const { records } = this.state

    const style_container = {
        height: this.state.height,
        backgroundColor: theme.baseTheme.palette.canvasColor
      }

    const style_filtersContainer = {
      padding: '20px'
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
              <FlatButton
                label='Request'
                onClick={ this.getRequest.bind(this) }
                />
              <SelectField
                floatingLabelText='ORDER BY'
                value={ this.state.params.orderBy.key }
                onChange={ this.handleOrderByChange.bind(this) }
                >
                <MenuItem value={ null } primaryText='' />
                <MenuItem value='name' primaryText='NAME' />
                <MenuItem value='email' primaryText='EMAIL' />
                <MenuItem value='created' primaryText='CREATED' />
              </SelectField>
              <Toggle
                label='SORT ASCENDING'
                labelPosition='right'
                defaultToggled={ true }
                onToggle={ this.handleOrderBySortChange.bind(this) }
                />
              <div>
                <SelectField
                  value={ this.state.params.page.current }
                  onChange={ this.handlePageCurrentChange.bind(this) }
                  maxHeight={ 200 }
                  >
                  { this.renderPageOptions() }
                </SelectField>
              </div>
              <div>
                <label>RECORD LIMIT</label>
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
            <Table rows={ records } />
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}
