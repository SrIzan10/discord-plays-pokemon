import { keyboard, key } from '@nut-tree/nut-js'
import { execa } from 'execa'
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

	execa('echo', 'hey').then(process => console.log(colorette.bgBlue(process.stdout)))
})

client.login(process.env.TOKEN)