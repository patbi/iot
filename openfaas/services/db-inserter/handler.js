"use strict"

const { Client } = require('pg')
const Pool = require('pg').Pool
const fs = require('fs')

const pool = initPool()

module.exports = async (event, context) => {  
    let client = await pool.connect()

    if(event.method == "POST") {
        let {name, location, dest, altitude, bearing, speed, payloadPercent, tempCelsius, batteryPercent} = event.body;
        console.log(name, location, dest, altitude, bearing, speed, payloadPercent, tempCelsius, batteryPercent)
        await insert(name, location, dest, altitude, bearing, speed, payloadPercent, tempCelsius, batteryPercent);

        client.release()
        return context.status(200).succeed({"status": "OK"});
    }
    
    client.release()
    return context.status(200).succeed({"status": "No action"});
}

async function insert(name, location, dest, altitude, bearing,
        speed, payloadPercent, tempCelsius, batteryPercent) {
    let res = await client.query(`insert into drone_position (name, location, dest, alititude, bearing, speed, payload_percent, temp_celsius, battery_percent) values ($1, $2, $3, $4, $5, $6, $7, $8, $9);`,
    [name, new Point(location).toString(), new Point(dest).toString(), altitude, bearing, speed, payloadPercent, tempCelsius, batteryPercent]);
    console.log(res);
}

function initPool() {
  return new Pool({
    user: fs.readFileSync("/var/openfaas/secrets/db-username", "utf-8"),
    host: fs.readFileSync("/var/openfaas/secrets/db-host", "utf-8"),
    database: process.env["db_name"],
    password: fs.readFileSync("/var/openfaas/secrets/db-password", "utf-8"),
    port: process.env["db_port"],
  });
 }

 class Point {
     constructor(point) {
         this.lon = point.lon
         this.lat = point.lat
     }

     toString() {
         return "(" + this.lon+"," + this.lat+")"
     }
 }