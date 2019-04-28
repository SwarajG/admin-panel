import moment from 'moment';

export function getColumns() {
  return [{
    title: 'Sr. No.',
    dataIndex: 'index'
  }, {
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
    dataIndex: 'time'
  }];
}

export function formatData(data) {
  return data.map((history, index) => ({
    index: index + 1,
    userName: history.userName,
    type: history.type,
    remark: history.remark,
    chips: history.amount,
    time: `${moment(history.timestamp).utc().format('YYYY-MM-DD')} ${moment(history.timestamp).utc().format('HH:mm:ss')}}`
  }))
}