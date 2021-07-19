const tests = require('./unit');

async function testRunner() {
  let failed = 0;
  const total = Object.keys(tests).length;
  const promises = Object.keys(tests).map(async (testName) => {
    try {
      await tests[testName]();

      console.log(`\x1b[32m${testName}\x1b[0m`);
    } catch (error) {
      console.log(`\x1b[31m${testName}\x1b[0m`);
      console.error(error);
      failed++;
    }
  });

  await Promise.all(promises);
  console.info(`${total - failed}/${total} tests passed`);
}

testRunner();
