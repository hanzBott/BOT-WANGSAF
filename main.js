const {
WAConnection,
MessageType,
Presence,
Mimetype,
GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const { banner, start, success } = require('./lib/functions')
const { color } = require('./lib/color')
require('./index.js')
nocache('./index.js', module => console.log(`${module} Telah Di Update✓`))
const starts = async (Tio = new WAConnection()) => {
Tio.logger.level = 'warn'
Tio.version = [2, 2143, 8]
Tio.browserDescription = ["Tio", "safari", "windows 8"];
console.log(banner.string)
Tio.on('qr', () => {
console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan bang'))})
fs.existsSync('./session.json') && Tio.loadAuthInfo('./session.json')
Tio.on('connecting', () => {
start('2', 'Connecting...')})
Tio.on('open', () => {
success('2', 'Connected')})
await Tio.connect({timeoutMs: 30*1000})
fs.writeFileSync('./session.json', JSON.stringify(Tio.base64EncodedAuthInfo(), null, '\t'))
Tio.on('chat-update', async (message) => {
require('./index.js')(Tio, message)})}
function nocache(module, cb = () => { }) {
console.log('[ ! ]', `'${module}'`, 'DI Pantau Oleh Allah')
fs.watchFile(require.resolve(module), async () => {
await uncache(require.resolve(module))
cb(module)})}
function uncache(module = '.') {
return new Promise((resolve, reject) => {
try {
delete require.cache[require.resolve(module)]
resolve()
} catch (e) {
reject(e)}})}

starts()
