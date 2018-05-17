#define TRIG 8
#define ECHO 9
#define SPRAY 10

int pulseStart;
int pulseEnd;
int pulseDuration;
int distance;

void setup() {
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);
  pinMode(SPRAY, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available()) {
    digitalWrite(SPRAY, Serial.read() == '1');
  }
  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);
  while(!digitalRead(ECHO)) {
    pulseStart = micros();
  }
  while(digitalRead(ECHO)) {
    pulseEnd = micros();
  }
  pulseDuration = pulseEnd - pulseStart;
  distance = pulseDuration * 0.017150f;
  Serial.write(min(distance, 255));
  delay(250);
}
