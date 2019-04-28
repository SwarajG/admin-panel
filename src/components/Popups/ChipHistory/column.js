export function getColumns() {
  return [{
    title: 'User Name',
    dataIndex: 'userName'
  }, {
    title: 'Remark',
    dataIndex: 'remark'
  }, {
    title: 'Chips',
    dataIndex: 'chips'
  }, {
    title: 'Date Time',
  }];
};

export function getFormatData(data) {
  return data.map(history => ({
    userName: history.userName,
    remark: history.remark,
    chips: history.amount,
    time: history.timestamp
  }));
}