import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { BsCircleFill } from 'react-icons/bs';

function DeviceInfo({ deviceStatus, mqttStatus }) {
  // console.log("deviceStatus ",deviceStatus);
  return (
    <>
      <Box
        d="flex"
        justifyContent="space-between"
        p={3}
        w="40vw"
        mt="2"
        fontSize="md"
      >
        <Box d="flex" alignItems="center">
          <Text mx="2"> Mqtt Status: </Text>
          <BsCircleFill
            size={15}
            color={mqttStatus === true ? 'teal' : 'tomato'}
          />
          <Text mx="2">
            {mqttStatus === true ? 'Connected' : 'Disconnected'}
          </Text>
        </Box>
        <Box d="flex" alignItems="center">
          <Text mx="2"> Device Status: </Text>
          <BsCircleFill
            size={15}
            color={deviceStatus === true ? 'teal' : 'tomato'}
          />
          <Text mx="2">{deviceStatus === true ? 'Online' : 'Offline'}</Text>
        </Box>
      </Box>
    </>
  );
}

export default DeviceInfo;
