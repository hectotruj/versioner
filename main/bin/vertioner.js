#!/usr/bin/env node
const { exit, getMasterVersion, hasBranchDiverged, isGitInstalled } = require('../utils')

const packageJSON = require('../../package.json')
const currentName = packageJSON.name
const currentVersion = packageJSON.version

if (!isGitInstalled()) {
    exit('Sorry, this script requires git', 1);
}

if (hasBranchDiverged()) {

    const masterVersion = getMasterVersion()
    if (currentVersion === masterVersion) {
        exit(`Package '${currentName}' has diverged from master. \n Current version of package '${currentName}' is the same as master. Please update your version.`, 1);
    }

    exit(`Package '${currentName}' has diverged from master. \n Current version ${currentVersion}, master version: ${masterVersion}`, 0);

} else {
    exit(`Package '${currentName}' has no differences with master`, 1);
}
