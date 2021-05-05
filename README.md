# ThermoMSD_2020
P21900 Project 2020 Thermoregulatory Software

Contents of the ReadMe
- - - - - - - - - - - - - - - - - - -
* Introduction
* Requirements
* To-Do


INTRODUCTION
- - - - - - - - - - - - - - - - - - -
This repo contains the Vitals Monitor for the accompanying Raspberry Pi Thermoregulator. The CSS and JS scripts apply to both HTML files. When accessing the vital monitor, begin at the "setup_screen.html" file and input necessary experimental data there. Once complete, press 'save settings' followed by 'begin experiment.' These scripts work in conjunction with a Flask Python server and python scripts on the Raspberry Pi itself. 



REQUIREMENTS
- - - - - - - - - - - - - - - - - - -
Must have Python 3, Python IDE, Web Design IDE



TO-DO
- - - - - - - - - - - - - - - - - - -
* Integrate the leading branch (cxg5097-canvas1) into the main
* Add dynamic labels on plots and integrate stylesheet to graphs
* Enable user to send alarm threshold to the Raspberry Pi scripts for feedback loop from the set-up screen
* Upon 'begin experiment' automatically start up the python server and start the thermoregulator 
* Hardcode user inputs in Raspberry Pi script so that it can automatically start at experiment start
