// Code for adding the audit info to blockchain
// This code is designed in below mentioned way
// Code detail:
// This code opens a udp server and listens on 9000 port which is the default port for 
// syslog When the syslog is configured on the device to send the syslog message to the 
// device where this program is running, all the syslog messages will be received by the
// UDP socket. This is basically emulating the syslog server.
//
// The UDP port choice is not strict. As 514 is a standard port for syslog,
// it may not allow to run the UDP server on the same port.
// In that case, the port could be adjusted.
//
// This program will parse the syslog messages received on 514 port, 
// build the blockchain payload and send it to the blockchain network.
// For correctness, it reads the last message and displays it.
//
// Programmers could choose any blockchain code and the blockchain APIs would be different.
// In this code, a wrapper API interface is provided in which specific blockchain APIs 
// can be called. To keep it generic and independent of the blockchain SDK preferences,
// in this code, it logs the acm log locally.
//
// Testing could be done using logger command in the below mentioned way.
// logger -n <IP Address> -P <port> Test
// logger -n 10.64.69.141 -P 9000 Test

var s_port = 9000;
var dgram = require("dgram");
var server = dgram.createSocket("udp4");
fs = require('fs');

let event_id = 3;
const content = 'Audit info on Blockchain log'

function sleep(ms){
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

fs.writeFile('audit_bc.log', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
})

fs.appendFile('audit_bc.log', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //done!
})

fs.readFile('audit_bc.log', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
})

const bc_audit_info_transaction_query = async (funcName, args) => {
    //Block chain SDK API call with the smart contract
    const data = await fs.readFile('audit_bc.txt');
    console.log(data.toString()); 
}

const bc_audit_info_transaction_submit = async (funcName, args) => {
  //Block chain SDK API call with the smart contract
  openFile();
}

async function bc_audit_event_send (event) 
{
    console.log('Creating audit  event\n\n')
    //let response = await bc_audit_info_transaction_submit('event_create', [JSON.stringify(event)])
    //console.log(response)
    console.log('Adding Audit info to blockchain network success\n')
    await sleep(1000)
         
    console.log('\nquerying for last events')
    //const query_response = await bc_audit_info_transaction_query('events_get_all', [JSON.stringify({event_id: 2 })])
    //console.log(query_response.Result.toString())
    console.log('\nQuery response received')
    console.log(event)
}

server.on("listening", function() {
  var address = server.address();
  console.log("server listening " + address.address + ":" + address.port);
});

server.on("message", function(msg, rinfo) {
  console.log("server got a message from " + rinfo.address + ":" + rinfo.port);
  console.log("  HEX  : " + msg.toString('hex'));
  console.log("  ASCII: " + msg);
  event_id += 1;

//    event = {
//                event_id: event_id,
//                time_stamp: obj.time_stamp,
//                system_id: obj.system_id,
//                system_name: obj.system_name,
//                system_ip: obj.src_ip,
//                user_name: obj.user_name,
//                interface_name: obj.interface_name,
//                audit_info_type: obj.audit_info_type,
//                audit_info_sub_type:obj.audit_info_sub_type,
//                audit_data: obj.audit_data
//    }
       // Example
        const event = {
             event_id: event_id,
             time_stamp: 1643656800,
             system_id: 0xAABBCCDD,
                system_name: 'BC Test',
                system_ip: '192.168.1.1',
                user_name: 'test admin',
                interface_name: 'webui',
                audit_info_type: 'Config',
                audit_info_sub_type: 'Config_Addition',
               audit_data: 'username admin password admin'
        }  
        console.log(event);
        bc_audit_event_send(event);
});

server.on("error", function(err) {
  console.log("server error: \n" + err.stack);
  server.close();
});

server.on("close", function() {
  console.log("closed.");
});

server.bind(s_port);

