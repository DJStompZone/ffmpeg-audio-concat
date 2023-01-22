#!/usr/bin/env node
'use strict'

const fs = require('fs')
const program = require('commander')

const concat = require('.')
const { version } = require('../package')

module.exports = async (argv) => {
  program
    .version(version)
    .usage('[options] <audios...>')
    .option('-o, --output <output>', 'path to mp3 file to write', (s) => s, 'out.mp3')
    .option('-c, --concurrency <number>', 'number of files to process in parallel', (v) => parseInt(v), 4)
    .option('-v, --verbose', 'enable verbose debug logging from FFmpeg')
    .parse(argv)

  try {
    const audios = program.args.filter((v) => typeof v === 'string')

    await concat({
      log: console.log,
      concurrency: program.concurrency,

      audios,
      output: program.output,

      verbose: !!program.verbose
    })

    console.log(program.output)
  } catch (err) {
    console.error('concat error', err)
    throw err
  }
}

module.exports(process.argv)
