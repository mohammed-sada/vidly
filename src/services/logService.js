function init() {}

function log(error) {
  console.error(error);
}

const logger = { log, init };
export default logger;
