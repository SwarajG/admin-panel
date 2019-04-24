export function getColumns() {
  return [{
    title: 'Sr. No.',
    dataIndex: 'index'
  }, {
    title: 'User Name',
    dataIndex: 'username',
  }, {
    title: 'Name',
    dataIndex: 'name',
  }, {
    title: 'Total',
    dataIndex: 'total',
  }, {
    title: 'Settlement'
  }];
}

export function formatGiveTableData(data) {
  return data.map((giveData, index) => ({
    index: index + 1,
    username: giveData.username,
    name: `${giveData.firstName || ''} ${giveData.lastName || ''}`,
    total: (giveData.total / 100).toFixed(2)
  }));
}

export function formatGetTableData(data) {
  return data.map((getData, index) => ({
    index: index + 1,
    username: getData.username,
    name: `${getData.firstName || ''} ${getData.lastName || ''}`,
    total: (getData.total / 100).toFixed(2)
  }));
}