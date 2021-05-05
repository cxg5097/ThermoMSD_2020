###Toggles GPIO Pin 1 between ON and OFF or 3.3V and 0 V
#####This code was used to test GPIO functionality for temp_in.py code

import RPi.GPIO as GPIO #Importing GPIO Library from which functions controlling the General Purpose Input/Output (GPIO) pins are called
import time #Importing time Library from which the time.sleep function is called

GPIO.setwarnings(False) #Disables standard warning which states the GPIO pins may already be in use
GPIO.setmode(GPIO.BCM) #Sets the GPIO numbering system to Broadcom. Alternative numbering system is GPIO.BOARD
GPIO.setup(1, GPIO.OUT) #Sets Pin 1 as an output

while True: #Infinitely loops
    GPIO.output(1, True) #Turns on Pin 1, 3.3V Outpu. Other syntax: GPIO.output(Pin#, GPIO.HIGH) or GPIO.output(Pin#, 1)
    time.sleep(1) #Adds a time delay for the previous step to complete
    GPIO.output(1, False) #Turns off Pin 1, 0V Output. Other syntax: GPIO.output(Pin#, GPIO.LOW or GPIO.output(Pin#, 0)
    time.sleep(1) #Adds a time delay for the previous step to complete

GPIO.cleanup() #Resets/clears GPIO settings. Standard practice.
