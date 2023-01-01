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

client.on('ready', async () => {
	console.log(colorette.bgGreen('Logged onto Discord!'))

	console.log(colorette.bgBlue('Starting up the emulator'))
	execa('mednafen', './roms/pokegold.gbc').then(process => console.log(process.stdout))
})

client.login(process.env.TOKEN)