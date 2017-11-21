/**
 * Basic configuration object
 */
module.exports = {
  auth: {
    secret: 'Motherfucking secret of the motherfuckers biatch! Ayee kanye is my god.' //Note to self: Don't take aderall when writing auth secrets.
  },
  database: {
    local: 'mongodb://test:test@ds117348.mlab.com:17348/clickedy',
    mLab: 'mongodb://farhan:farhan@ds157539.mlab.com:57539/spacedrop-beta' // if you want to use mLab for example
  }
};
