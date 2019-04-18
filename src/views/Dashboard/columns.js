export function getColumns() {
  return [{
    title: 'Sr. No.',
    dataIndex: 'index'
  }, {
    title: 'Game Type',
    dataIndex: 'type',
  }, {
    title: 'Total Count',
    dataIndex: 'count',
  }, {
    title: 'Total Players',
    dataIndex: 'players',
  }, {
    title: 'Boot Amount',
    dataIndex: 'amount',
  }];
}

export function formatTableData(tablePlayers) {
  return tablePlayers.map((player, index) => ({
    key: index,
    index: index + 1,
    type: player._id.gameType,
    count: player.count,
    players: player.players,
    amount: player._id.bootAmount
  }))
}