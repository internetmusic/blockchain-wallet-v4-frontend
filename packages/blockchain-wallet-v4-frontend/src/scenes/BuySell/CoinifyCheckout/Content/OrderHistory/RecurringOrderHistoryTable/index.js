import React from 'react'
import RecurringOrder from './RecurringOrder'
import { FormattedMessage } from 'react-intl'
import { filter, prop, reverse, sortBy } from 'ramda'
import { Table, TableCell, TableHeader, Text } from 'blockchain-info-components'

class OrderHistoryTable extends React.PureComponent {
  constructor () {
    super()
    this.state = {}
  }

  render () {
    const { conversion, trades, handleTradeCancel, handleFinishTrade, handleDetailsClick, status, cancelTradeId, canTrade } = this.props

    const isValid = (t) => t.createdAt
    const validTrades = filter(isValid, trades)
    const sortByCreated = sortBy(prop('createdAt'))
    const sortedTrades = reverse(sortByCreated(validTrades))

    return (
      <Table>
        <TableHeader>
          <TableCell width='15%'>
            <Text size='13px' weight={500} capitalize>
              <FormattedMessage id='scenes.buysell.orderhistory.recurring.order' defaultMessage='Recurring Order' />
            </Text>
          </TableCell>
          <TableCell width='15%' />
          <TableCell width='30%'>
            <Text size='13px' weight={500} capitalize>
              <FormattedMessage id='scenes.buysell.orderhistory.recurring.frequency' defaultMessage='Frequency' />
            </Text>
          </TableCell>
          <TableCell width='20%'>
            <Text size='13px' weight={500} capitalize>
              <FormattedMessage id='scenes.buysell.orderhistory.recurring.start' defaultMessage='Start' />
            </Text>
          </TableCell>
          <TableCell width='20%'>
            <Text size='13px' weight={500} capitalize>
              <FormattedMessage id='scenes.buysell.orderhistory.recurring.end' defaultMessage='End' />
            </Text>
          </TableCell>
        </TableHeader>
        {sortedTrades.map((trade, index) => <RecurringOrder // list of all recurring orders, trades will be inside these
          key={index}
          trade={trade}
          conversion={conversion}
          handleFinish={handleFinishTrade}
          handleClick={handleDetailsClick}
          handleTradeCancel={handleTradeCancel}
          status={status}
          cancelTradeId={cancelTradeId}
          canTrade={canTrade}
        />)}
      </Table>
    )
  }
}

export default OrderHistoryTable
