// Test execCommand.js

import execCommand from './execCommand.js';

describe('execCommand', () => {
  it('should run a command', async () => {
    await execCommand('echo "Hello World!"');
  });
});
