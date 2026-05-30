async function testImport() {
  try {
    const secretsModule = await import('secrets.js-grempe');
    console.log('secretsModule:', Object.keys(secretsModule));
    console.log('secretsModule.default:', secretsModule.default ? Object.keys(secretsModule.default) : 'undefined');
    
    const secrets = secretsModule.default || secretsModule;
    console.log('secrets keys:', Object.keys(secrets));
    console.log('share type:', typeof secrets.share);
    console.log('combine type:', typeof secrets.combine);
  } catch (e) {
    console.error('Import failed:', e);
  }
}

testImport();
