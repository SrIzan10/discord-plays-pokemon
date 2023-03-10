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
})

client.on('ready', async () => {
	console.log(colorette.bgBlue('Starting up the emulator'))
	execa('mednafen', ['./roms/pokegold.gbc'], {shell: true})
})

client.on('ready', async () => {
	console.log(colorette.bgBlue('Streaming to Twitch!'))
	execa('ffmpeg', [
		'-f', 'x11grab',
		'-s', '1364x629',
		'-i', `:11.0+0,0`,
		'-tune', 'zerolatency',
		'-preset', 'ultrafast',
		'-vcodec', 'libx264',
		'-r', '20',
		'-b:v', '2500k',
		'-bufsize', '5000k',
		'-ar', '44100',
		'-b:a', '128k',
		'-f', 'flv',
		`rtmp://mad02.contribute.live-video.net/app/${process.env.TWITCH_STREAMKEY}`
	  ], {shell: true}).then(cmd => console.log(cmd.stdout))
})

client.login(process.env.TOKEN)