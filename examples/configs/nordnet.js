var moment = require('moment');
var commonValues = {
  selectors: {
    main: '#instrumentcontainer table',
    rows: 'tbody tr',
    cols: 'td'
  },
  cols: [
    {label: 'rahasto', index: 1},
    {label: 'arvo', index: 2},
    {label: 'valuutta', index: 11},
  ],
  rows: [0]
};
var now = moment().format('YYYY-MM-DD');

module.exports =
[
  {
    url: 'https://www.nordnet.fi/mux/web/marknaden/aktiehemsidan/index.html?identifier=452211&marketid=18',
    values: commonValues,
    staticCols: [
      {label: 'rahasto', value: 'VWO'},
      {label: 'pvm', value: now}
    ]
  },
  {
    url: 'https://www.nordnet.fi/mux/web/marknaden/aktiehemsidan/index.html?identifier=DBX0AV&marketid=4',
    values: commonValues,
    staticCols: [
      {label: 'rahasto', value: 'DXSU', index: 0},
      {label: 'pvm', value: now}
    ]
  }
];
