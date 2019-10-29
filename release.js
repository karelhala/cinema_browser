const util = require('util');
const { resolve } = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

const exec = util.promisify(require('child_process').exec);

const readFile = (fileName) => util.promisify(fs.readFile)(fileName, 'utf8');
const writeFile = (fileName, data) => util.promisify(fs.writeFile)(fileName, data, 'utf8');
const readJson = (fileName) => readFile(fileName).then(JSON.parse);
const writeJson = (fileName, data) => writeFile(fileName, JSON.stringify(data, null, 4) + '\n');

const Octokit = require("@octokit/rest");
const octokit = Octokit({
    auth: process.env.GH_TOKEN,
    userAgent: 'karelhala',
    previews: ['jean-grey', 'symmetra'],
    timeZone: 'Europe/Prague',
    baseUrl: 'https://api.github.com',
});

const randomValue = Math.random().toString(36).substring(Math.round(Math.random() * Math.floor(10)));

(async () => {
    const dump = await readJson('./dump.json');

    dump.value = randomValue;

    writeJson('./dump.json', dump);
})();
