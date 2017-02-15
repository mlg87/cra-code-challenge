import React from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import moment from 'moment'

export default (props) => {
  const { rows } = props

  const style_avatarCol = {
    width: '30px'
  }

  const renderRows = () => {

    const style_avatar = {
      height: '25px'
    }

    return rows.map(row => {
      return (
        <TableRow key={ row.created }>
          <TableRowColumn style={ style_avatarCol }><img style={ style_avatar } src={ row.avatar } /></TableRowColumn>
          <TableRowColumn>{ row.name }</TableRowColumn>
          <TableRowColumn>{ row.email }</TableRowColumn>
          <TableRowColumn>{ moment(row.created).format('MM/DD/YYYY') }</TableRowColumn>
          <TableRowColumn>{ row.balance }</TableRowColumn>
          <TableRowColumn>{ row.address.street }</TableRowColumn>
          <TableRowColumn>{ row.address.city }</TableRowColumn>
          <TableRowColumn>{ row.address.country }</TableRowColumn>
          <TableRowColumn>{ row.address.zip }</TableRowColumn>
        </TableRow>
      )
    })
  }

  return (
    <Table
      selectable={ false }
      >
      <TableHeader
        displaySelectAll={ false }
        adjustForCheckbox={ false }
        >
        <TableRow>
          <TableHeaderColumn style={ style_avatarCol }></TableHeaderColumn>
          <TableHeaderColumn>NAME</TableHeaderColumn>
          <TableHeaderColumn>EMAIL</TableHeaderColumn>
          <TableHeaderColumn>CREATED</TableHeaderColumn>
          <TableHeaderColumn>BALANCE</TableHeaderColumn>
          <TableHeaderColumn>STREET</TableHeaderColumn>
          <TableHeaderColumn>CITY</TableHeaderColumn>
          <TableHeaderColumn>COUNTRY</TableHeaderColumn>
          <TableHeaderColumn>ZIP</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody
        displayRowCheckbox={ false }
        >
        { renderRows() }
      </TableBody>
    </Table>
  )
}
