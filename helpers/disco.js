const chalk = require('chalk');

module.exports = {
  status: (msg) => {
    console.log(chalk.whiteBright.bgBlue(msg));
  },

  error: (msg) => {
    console.log(chalk.whiteBright.bgRed(msg));
  },
  debug: (msg) => {
    console.log(chalk.black.bgWhite(msg));
  },
  bookmark: (msg) => {
    console.log(chalk.whiteBright.bgMagenta(msg));
  },
};
