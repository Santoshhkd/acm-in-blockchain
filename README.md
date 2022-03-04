# acm-in-blockchain
Audit and Compliance using blockchain

# How to run
node acm-bc.js

# Code Detail:
This code opens a udp server and listens on 9000 port which is the default port for syslog When the syslog is configured on the device to send the syslog message to the device where this program is running, all the syslog messages will be received by the UDP socket. This is basically emulating the syslog server.
The UDP port choice is not strict. As 514 is a standard port for syslog, it may not allow to run the UDP server on the same port. In that case, the port could be adjusted.

This program will parse the syslog messages received on 514 port, build the blockchain payload and send it to the blockchain network. For correctness, it reads the last message and displays it.

Programmers could choose any blockchain code and the blockchain APIs would be different. In this code, a wrapper API interface is provided in which specific blockchain APIs can be called. To keep it generic and independent of the blockchain SDK preferences,in this code, it logs the acm log locally.

Testing could be done using logger command in the below mentioned way.
logger -n <IP Address> -P <port> Test
example: logger -n 10.64.69.141 -P 9000 Test
