import { Client } from "whatsapp-web.js"
import * as qrcode from "qrcode-terminal"

const client = new Client({})

// log ready
client.once("ready", () => {
  console.log("Client ready")
})

// make login qr 
client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true })
})

// log message body when received
client.on("message_create", message => {
  console.log(message.body)
})

client.initialize()
