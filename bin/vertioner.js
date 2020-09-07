#!/usr/bin/env node

const sh = require('shelljs');

const packageJSON = JSON.parse(sh.cat('./package.json').stdout)
const currentName = packageJSON.name
const currentVersion = packageJSON.version

if (!sh.which('git')) {
    sh.echo('Sorry, this script requires git');
    sh.exit(1);
}

const hasDiff = sh.exec('git diff --quiet master').code

if (hasDiff === 1) {
    sh.echo(`Package '${currentName}' has diverged from master`)
    const masterVersion = JSON.parse(sh.exec('git show master:./package.json', { silent: true })).version
    if (currentVersion === masterVersion) {
        sh.echo(`Current version of package '${currentName}' is the same as master. Please update your version.`);
        sh.exit(1);
    }

    sh.echo(`Current version ${currentVersion}, master version: ${masterVersion}`)
    sh.exit(0);

} else {
    sh.echo(`Package '${currentName}' has no differences with master`)
    sh.exit(1);
}

