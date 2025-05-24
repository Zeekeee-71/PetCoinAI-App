// build-android.js
const { execSync } = require('child_process');

// Force ignore the Node.js version check
process.env.EXPO_IGNORE_NODE_VERSION = '1';

// Run the EAS build command
try {
  console.log('Starting Android build with version checks bypassed...');
  execSync('npx eas-cli build -p android --profile preview', { stdio: 'inherit' });
} catch (error) {
  console.error('Build failed:', error);
}
