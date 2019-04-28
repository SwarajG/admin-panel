export function getColumns() {
  return [{
    title: 'Sr. No.',
    dataIndex: 'index'
  }, {
    title: 'User Name',
    dataIndex: 'userName'
  }, {
    title: 'Name',
    dataIndex: 'name'
  }, {
    title: 'Credit Chips',
    dataIndex: 'creditChips'
  }, {
    title: 'Available Chips',
    dataIndex: 'chips'
  }];
}

export function formatData(data) {
  return data.map((user, index) => ({
    key: user._id,
    index: index + 1,
    userName: user.userName,
    name: `${user.firstName} ${user.lastName}`,
    creditChips: user.creditChips,
    chips: user.chips
  }));
}