const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');

// Read your original source file
const sourceCode = fs.readFileSync('input.js', 'utf8');

// Obfuscate with maximum anti-deobfuscation settings
const obfuscationResult = JavaScriptObfuscator.obfuscate(sourceCode, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1.0, // Apply to 100% of the code
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1.0,     // Maximize fake code addition
    debugProtection: true,               // Freezes DevTools if opened
    disableConsoleOutput: true,          // Removes console logs
    identifierNamesGenerator: 'hexadecimal', // Renames variables to hex values
    numbersToExpressions: true,          // Converts 1 into (0x1a2 + 0x4b - 0x1ed)
    selfDefending: true,                 // Crashes code if formatted/pretty-printed
    splitStrings: true,
    splitStringsChunkLength: 3,
    stringArray: true,
    stringArrayEncoding: ['base64', 'rc4'], // Double encrypts text strings
    stringArrayThreshold: 1.0
});

// Save the secure code
fs.writeFileSync('output.js', obfuscationResult.getObfuscatedCode());
console.log('Code successfully protected against reverse engineering!');
