const util = require('util');
const { resolve } = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

const exec = util.promisify(require('child_process').exec);

const readFile = (fileName) => util.promisify(fs.readFile)(fileName, 'utf8');
const writeFile = (fileName, data) => util.promisify(fs.writeFile)(fileName, data, 'utf8');
const readJson = (fileName) => readFile(fileName).then(JSON.parse);
const writeJson = (fileName, data) => writeFile(fileName, JSON.stringify(data, null, 4) + '\n');

dotenv.config();
const Octokit = require("@octokit/rest");
const octokit = Octokit({
    auth: process.env.GH_TOKEN,
    userAgent: 'karelhala',
    previews: ['jean-grey', 'symmetra'],
    timeZone: 'Europe/Prague',
    baseUrl: 'https://api.github.com'
});

const randomValue = Math.random().toString(36).substring(Math.round(Math.random() * Math.floor(10)));

const encodeFile = async (filename) => Buffer.from(await readFile(filename)).toString('base64');

(async () => {
    const dump = await readJson('./dump.json');

    dump.value = randomValue;

    await writeJson('./dump.json', dump);
    let sha;
    try {
        const { data: contents } = await octokit.repos.getContents({
            owner: 'karelhala',
            repo: 'cinema_browser',
            path: 'dump.json'
        });
        sha = contents && contents.sha;
    } catch(e) {}


    const content = await encodeFile('./dump.json');

    console.log(sha);
    console.log(content);
    octokit.repos.createOrUpdateFile({
        owner: 'karelhala',
        repo: 'cinema_browser',
        path: 'dump.json',
        message: 'Update dump file from bot!',
        content: content,
        debug: true,
        ...sha && { sha }
    }).then(() => {}, console.log)
})();
