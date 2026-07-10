const spawn = require("child_process").spawn;
const dotenv = require("dotenv");

// Load selected env file
dotenv.config({ path: process.env.ENVFILE });

const appName = process.env.APP_NAME || "SendNex App";

console.log("iOS App Name:", appName);

// Pass env into iOS build
spawn("npx", ["react-native", "run-ios"], {
  stdio: "inherit",
  env: {
    ...process.env,
    APP_NAME: appName,
  },
});