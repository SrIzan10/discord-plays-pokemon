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
		'-s', '854x480',
		'-i', `${execa('echo', ['$DISPLAY']).then(cmd => cmd.stdout)}+0,0`,
		'-vcodec', 'libx264',
		'-preset', 'ultrafast',
		'-tune', 'zerolatency',
		'-r', '30',
		'-b:v', '2500k',
		'-bufsize', '5000k',
		'-acodec', 'libmp3lame',
		'-ar', '44100',
		'-b:a', '128k',
		'-f', 'flv',
		`rtmp://mad02.contribute.live-video.net/app/${process.env.TWITCH_STREAMKEY}`
	  ], {shell: true}).then(cmd => console.log(cmd.stdout))
})

client.login(process.env.TOKEN)