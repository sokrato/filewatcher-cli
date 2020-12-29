#!/usr/bin/env node
const fs = require('fs'),
  yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function run(cmd) {
  const { stdout, stderr } = await exec(cmd)
  if (stdout) {
    console.log(stdout)
  }
  if (stderr) {
    console.log(stderr)
  }
}

function now() {
  return new Date() * 1
}

const stats = {
  lastRunAt: 0
}

function watch(filename, cmd, interval) {
  if (! fs.existsSync(filename)) {
    console.error("file not exists: " + filename)
    return
  }

  fs.watch(filename, async (eventType, filename) => {
    console.log(`${filename} : ${eventType}`)
    let ts = now()
    if (stats.lastRunAt + interval * 1000 > ts) {
      return
    }
    stats.lastRunAt = ts
    console.log(`run: ${cmd}`)
    await run(cmd)
  })

  console.log(`watching ${argv.filename}`)
}

const argv = yargs(hideBin(process.argv)).argv
watch(argv.filename, argv.cmd, argv.interval || 2)
