'use strict';
const path = require('path');
const fs = require('fs');
const sh = require('shelljs');

module.exports.exit = (message, code) => {
    console.log(message)
    process.exit(code)
}

module.exports.getMasterVersion = () => {
    const packagePath = path.resolve(__dirname, '_package.json');
    sh.exec(`git show master:./package.json &> ${packagePath}`, { silent: true });

    const masterPackageFile = fs.readFileSync(packagePath, 'utf8')

    const masterPackageJSON = JSON.parse(masterPackageFile);

    return masterPackageJSON.version;
}

module.exports.hasBranchDiverged = () => {
    return sh.exec('git diff --quiet master').code === 1;
}

module.exports.isGitInstalled = () => {
    return sh.which('git');
} 
