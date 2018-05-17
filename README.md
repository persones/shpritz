# shpritz
Distance-triggered water sprayer. Works great for keeping cats from scrathcing coats.
This repo accompanies my talk at Maker Faire Bay Area 2018.

* For a pure-NodeJS version, as presented in the main part of the talk, go ahead to shpritz-node.
* For The Python implementation, you will need to run the python code AND the code in node-dashboard

You'll also find here:
* The Arduino Sketch
* The Fritzing file
* The presentation's slides.

## Installning JavaScript projects
There are 2 JavaScript projects here: shpritz-node, and node-dashboard. Before running a project, its packages need to be installed.
CD into that project (let's say shpritz-node) and use npm to install the packages:
```bash
cd shpritz-node
npm install
```
and then run.

## Running a project
The JavaScript dashboard does not require sudo privileges. It can be run like this:
```bash
npm start
```
Projects that need access to the serial port do need sudo privileges:
```bash
sudo npm start
```
for shpritz-node, or
```bash
sudo python spritz.py
```
## Contact
Having issues? drop me a line: eyal {dot} person {dot} shahar (at) gmail {dot} com


