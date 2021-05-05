# ThermoMSD_2020
P21900 Project 2020 Thermoregulatory Software

Contents of the ReadMe
- - - - - - - - - - - - - - - - - - -
* Introduction
* Requirements
* Set Up
* Common Errors
* To-Do


INTRODUCTION
- - - - - - - - - - - - - - - - - - -
This repo contains the Vitals Monitor for the accompanying Raspberry Pi Thermoregulator. The CSS and JS scripts apply to both HTML files. When accessing the vital monitor, begin at the "setup_screen.html" file and input necessary experimental data there. Once complete, press 'save settings' followed by 'begin experiment.' These scripts work in conjunction with a Flask Python server ('flask_webapp.py') and python scripts ('temp_in.py' and 'gpio_pins.py') on the Raspberry Pi itself. The Raspberry Pi scripts depend on a library called 'uldaq-1.2.1' whihc can be pip installed using [pip install uldaq].



REQUIREMENTS
- - - - - - - - - - - - - - - - - - -
Must have Python 3.9*, Python IDE (we used: Pycharm 2020.3.5*), Web Design IDE (Sublime text 3*), Rasbian V10 installed on Pi, and a tempurature probe from ARIA. All scripts written and tested on a Windows computer. Ensure that the IP Adresses are all updated as needed (check Commmon Errors).
  *Codes tested on a Raspbery Pi 3B+ 


SET UP
- - - - - - - - - - - - - - - - - - -
1. Ensure all requirements are downloaded and up to date as needed

2.  Download the flask_webapp.py python script and open in the Python IDE.
      a. Run flask_webapp.py
      
3. On the Raspberry Pi:
      a. Download python scripts ('temp_in.py' and 'gpio_pins.py)
      b. Pip install the following libraries:
             - uldaq    [pip install uldaq]
             - time     [pip install time]
             - requests [pip install requests]
             - RPi.GPIO [pip install RPi.GPIO]
      c. Plug in the tempurature probe into Raspberry Pi USB port
      d. Run temp_in.py through the command line
   
4.  Open setup_screen.html in Google Chrome and fill in data as necessary for the experiment

5.  Press 'Save settings' to send experiment name, monitor names, and alarm thresholds to the javascript.

6.  Press 'Begin experiment' which transitions to Thermo.html and displays live probe data




COMMON ERRORS
- - - - - - - - - - - - - - - - - - -
- Local time on the Pi does not sync up (even with a Wi-Fi connection). Have used command line codes to manually change the time but no permenant solution has shown yet.

- Ensure that the IP Address of the computer and Pi are accurate depending on the location. The following scripts have IP address: Thermo.js, temp_in.py, flask_webapp.py

- Make sure that when you press 'Save settings' (step 5 on Set Up), you wait roughly 2 seconds before pressing 'Begin experiment' to give the script sufficient time to save the experimental inputs


TO-DO
- - - - - - - - - - - - - - - - - - -
* Add dynamic labels on plots and integrate stylesheet to graphs
* Enable user to send alarm threshold to the Raspberry Pi scripts for feedback loop from the set-up screen
* Upon 'begin experiment' automatically start up the python server and start the thermoregulator 
* Hardcode user inputs in Raspberry Pi script so that it can automatically start at experiment start
* Implement a "Load Experiment" where old files saved as .db or .csv can be opened and viewed using this monitor
* Remove redundant monitors when monitors number is less than 4.
