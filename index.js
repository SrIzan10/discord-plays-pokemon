const robot = require('robotjs')
const execa = require('execa')
require('dotenv').config()
const { Client } = require('discord.js')
const colorette = require('colorette')

const client = new Client({
    intents: [
        'Guilds',
        'GuildMembers',
        'GuildMessages',
    ]
})

client.on('ready', () => {
    console.log(colorette.bgGreen('Logged onto Discord!'))

    execa('echo "Hello World!"')
})