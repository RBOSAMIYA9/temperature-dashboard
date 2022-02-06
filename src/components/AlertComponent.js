import React from 'react';
import { Box, Text, Divider, Button } from '@chakra-ui/react';
function AlertComponent({ alertData, setAlertData,setAlert }) {
  function deleteAlerts(){
    setAlertData([]);
    setAlert(false);
  }
  return (
    <>
      <Box
        borderRadius="50px"
        bg="#fff"
        style={{ boxShadow: '-20px 20px 60px #bebebe' }}
        p={3}
        w="40vw"
        mt="5"
        h="45vh"
        overflowY={'scroll'}
        css={{
          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-track': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'gray',
            borderRadius: '24px',
          },
        }}
      >
        <Text>Alerts</Text>
        <Divider colorScheme="black" size="xl" />
        <Box d="flex" justifyContent="flex-end" my="2">
          <Button size="xs" onClick={deleteAlerts} colorScheme={"red"}>Delete All Alerts</Button>
        </Box>

        {alertData.map(data => (
          <Box m="5" border="0.2px solid gray" borderRadius="md" p="2">
            <Text textAlign={'left'} fontSize="xs">
              Alert triggered
            </Text>
            <Box d="flex" justifyContent="space-between">
              <Text fontSize="md">{data.message}</Text>
              <Text fontSize="md">@ {data.time.toString()}</Text>
            </Box>
          </Box>
        ))}
      </Box>
    </>
  );
}

export default AlertComponent;
