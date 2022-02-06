import React, { useState, useEffect } from 'react';
import { ChakraProvider, Box, Center, theme } from '@chakra-ui/react';
import Header from './components/Header';
import Card from './components/Card';
import DeviceInfo from './components/DeviceInfo';
import AlertComponent from './components/AlertComponent';
import mqtt from 'mqtt/dist/mqtt';

function App() {
  const [mqttStatus, setMqttStatus] = useState(false);
  const [deviceStatus, setDeviceStatus] = useState(false);
  const [messages, setMessages] = useState('');
  const [rule, setRule] = useState(false);
  const [ruleData, setRuleData] = useState({
    condition: 'greater than',
    temp: '',
  });

  const [alert, setAlert] = useState(false);
  const [alertData, setAlertData] = useState([]);

  const mainTopic = 'wtsTemp';
  const willTopic = 'wtsTempWill';
  const onBoardingTopic = 'wtsHello';

  useEffect(() => {
    console.log('inside use effect');
    // trying source tree
    // const client = mqtt.connect("ws://broker.hivemq.com:8000");
    // const client = mqtt.connect("ws://broker.mqttdashboard.com:8000/mqtt");
    // const client = mqtt.connect("wss://broker.emqx.io:8084/mqtt");
    // const client = mqtt.connect("ws://test.mosquitto.org:8080");
    const client = mqtt.connect('wss://public:public@public.cloud.shiftr.io');

    client.on('connect', () => {
      setMqttStatus(true);
      // setConnectionStatus(true);
      console.log('connected');
      client.subscribe(mainTopic);
      client.subscribe(willTopic);
      client.subscribe(onBoardingTopic);
    });
    client.on('message', (topic, payload, packet) => {
      if (topic === mainTopic) {
        setDeviceStatus(true);
        // const msgInjson = JSON.parse(payload.toString())
        // console.log("msgInjson", JSON.parse(payload.toString()));
        setMessages(JSON.parse(payload.toString()));
      } else if (topic === willTopic) {
        // console.log('will message', payload.toString());

        setDeviceStatus(false);
      } else if (topic === onBoardingTopic) {
        // console.log('onboarding :', payload.toString());
        setDeviceStatus(true);
      }
    });

    client.on('disconnect', () => {
      setMqttStatus(false);
      console.log('mqtt disconnect');
    });

    client.on('offline', () => {
      setMqttStatus(false);
      console.log('mqtt offline');
    });

    // eslint-disable-next-line
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Box
        textAlign="center"
        fontSize="xl"
        bg="#fff"
        h="100vh"
        overflowX={'hidden'}
      >
        {/* <ColorModeSwitcher justifySelf="flex-end"  /> */}
        <Header />
        <Center flexDir="column">
          <DeviceInfo mqttStatus={mqttStatus} deviceStatus={deviceStatus} />
          <Card
            messages={messages}
            ruleData={ruleData}
            setRuleData={setRuleData}
            rule={rule}
            setRule={setRule}
            setAlert={setAlert}
            alertData={alertData}
            setAlertData={setAlertData}
          />
          {alert && (
            <AlertComponent
              alertData={alertData}
              setAlert={setAlert}
              setAlertData={setAlertData}
            />
          )}
        </Center>
      </Box>
    </ChakraProvider>
  );
}

export default App;
