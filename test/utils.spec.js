const sh = require('shelljs');
const expect = require('chai').expect
const sinon = require('sinon');
const utils = require('../main/utils');
const fs = require('fs')

describe('Utils', () => {
    context('exit()', () => {
        it('should call console.log() and process.exit() with the provided parameters', async () => {
            sinon.stub(process, 'exit');
            sinon.stub(console, 'log');

            utils.exit('something', 1)

            expect(console.log.calledWith('something')).to.be.true;
            expect(process.exit.calledWith(1)).to.be.true;

            console.log.restore();
            process.exit.restore();
        })
    })

    context('getMasterVersion()', () => {
        it('should return the version from a file', async () => {
            sinon.stub(sh, 'exec').callsFake((_) => { return; });
            sinon.stub(fs, 'readFileSync').callsFake((_1, _2) => {
                return '{ "version" : 3 }'
            });

            const version = utils.getMasterVersion()

            expect(version).to.equal(3)
            sh.exec.restore()
            fs.readFileSync.restore()
        })
    })

    context('hasBranchDiverged()', () => {
        it('should return true if code is 1', async () => {
            sinon.stub(sh, 'exec').callsFake((_) => { return { code: 1 }; });

            const hasBranchDiverged = utils.hasBranchDiverged()

            expect(hasBranchDiverged).to.be.true
            sh.exec.restore()
        })
        it('should return false if code is 0', async () => {
            sinon.stub(sh, 'exec').callsFake((_) => { return { code: 0 }; });

            const hasBranchDiverged = utils.hasBranchDiverged()

            expect(hasBranchDiverged).to.be.false
            sh.exec.restore()
        })
    })

    context('isGitInstalled()', () => {
        it('should be called', async () => {
            sinon.stub(sh, 'which').callsFake((_) => { return true; });

            const hasBranchDiverged = utils.isGitInstalled()

            expect(hasBranchDiverged).to.be.true
            sh.which.restore()
        })
    })

})