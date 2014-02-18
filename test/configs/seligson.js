module.exports = {
  url: 'http://seligson.fi/suomi/rahastot/FundValues_FI.html',
  values: {
    selectors: {
      main: '.teksti table',
      rows: 'tr',
      cols: 'td'
    },
    cols: [
      {label: 'rahasto', index: 0},
      {label: 'pvm', index: 1},
      {label: 'arvo', index: 2}
    ],
    rows: [4,5,6,7,8,9,10,11,13,14,15,17,19,20,21]
  }
};