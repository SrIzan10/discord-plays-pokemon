import robot from 'robotjs'
import {execa} from 'execa'
import 'dotenv/config'
import { Client } from 'discord.js'
import * as colorette from 'colorette'

const client = new Client({
	intents: [
		'Guilds',
		'GuildMessages',
	]
})

client.on('ready', () => {
	console.log(colorette.bgGreen('Logged onto Discord!'))

	execa('echo', 'hey').then(process => console.log(process.stdout))
})

client.login(process.env.TOKEN)