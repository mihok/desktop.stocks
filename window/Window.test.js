const Application = require('spectron').Application

const electron = require('electron') // Require Electron from the binaries included in node_modules.
const path = require('path')

const driver = new Application({
  path: electron,
  args: [ path.join(__dirname, '../dist/main.js') ],
  // chromeDriverArgs: [ '--no-sandbox' ],
  startTimeout: 10000,
});

describe('Electron', function () {
  jest.setTimeout(10000);

  beforeEach(async function () {

    try {
      await driver.start()
    } catch (e) {
      console.error('ERROR', 'Unable to start spectron:', e);
    }
 
  });

  afterEach(async function () {

    if (driver && driver.isRunning()) {
      await t.stop();
    }

  });

  // Sanity check for electron, spectron and the underlying tooling for the
  // component tests in an desktop application.
  it('shows an initial window', async function () {

    const logs = await driver.client.getMainProcessLogs();

    logs.forEach(function (log) {
      console.log(log);
    });

    const count = await driver.client.getWindowCount();
    
    expect(count).toBe(1);

  });
});
