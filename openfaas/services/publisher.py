import paho.mqtt.publish as publish
import paho.mqtt.client as mqtt
import os, json

def on_publish(client,userdata,result):
    print("data published \n")
    pass

client = mqtt.Client("127.0.0.1:8081", transport="websockets")

client.on_publish = on_publish
broker = "127.0.0.1"
port = 8081

client.connect(broker, port)

payload = json.dumps({
    "name": "Alpha Cortex",
    "tempCelsius": 3.5,
    "location": {
        "lat": 52.5740072, 
        "lon": -0.2399354
    },
    "dest": {
        "lat": 52.5740081, 
        "lon": -0.2399367
    },
    "altitude": 310.12,
    "bearing": 321.1222,
    "speed": 83,
    "payloadPercent": 32,
    "batteryPercent": 87
})

ret = client.publish(os.getenv("CHANNEL_KEY"), payload)
print(ret)
