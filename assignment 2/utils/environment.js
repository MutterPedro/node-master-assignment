function requiredEnvVar(varName) {
  console.error(
    '\x1b[31m%s\x1b[0m',
    `⚠️  Required environment variable "${varName}" is missing.`,
  );

  process.exit(1);
}

module.exports = Object.freeze({
  DATA_DIR: process.env.DATA_DIR || 'data',
  TOKEN_LENGTH: Number(process.env.TOKEN_LENGTH || 50),
  STRIPE_TOKEN: process.env.STRIPE_TOKEN || requiredEnvVar('STRIPE_TOKEN'),
});
