import env, { loadEnv } from '/util/envLoadUtil.js'

async function init() {
  await loadEnv();
}
init();
const SERVER_URL = env.SERVER_URL;

