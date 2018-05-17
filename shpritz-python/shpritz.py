import socket
import serial
import json
import threading

thresh = 30
trig = False

arduino = serial.Serial('/dev/ttyACM0', 9600)  # open serial port


udp = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
udp.bind(("127.0.0.1", 3001))

def udp_thread():
  global trig
  while True:
    data, addr = udp.recvfrom(1024) # buffer size is 1024 bytes
    msg = json.loads(data)
    if "man_trigger" in msg:
      trig = msg["man_trigger"]
      setShpritz(trig)
    
def setShpritz(state):
  if state:
    arduino.write('1')
  else:
    arduino.write('0')
  message = json.dumps({"shpritz": state})
  udp.sendto(message, ("127.0.0.1", 3002))
  
t = threading.Thread(target=udp_thread)
t.start()

if __name__ == '__main__':
  while True:
    distance = ord(arduino.read())
    if not trig:
      setShpritz(distance < thresh)
    message = {"distance": distance}
    udp.sendto(json.dumps(message), ("127.0.0.1", 3002))
    
