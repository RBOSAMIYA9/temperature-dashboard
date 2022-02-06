import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Select,
  Kbd,
  Center,
  Button,
  useDisclosure,
  InputGroup,
  Input,
  InputRightAddon,
  useToast,
} from '@chakra-ui/react';
import { BsFillBellFill, BsBell } from 'react-icons/bs';

function Card({
  messages,
  ruleData,
  setRuleData,
  rule,
  setRule,
  setAlert,
  setAlertData,
  alertData,
}) {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [saveButton, setSaveButton] = useState(false);

  function deleteRule() {
    setRule(false);
    setSaveButton(!saveButton);
    onClose();
  }
  function saveRule() {
    setRule(true);
    onClose();
  }
  useEffect(() => {
    if (rule) {
      console.log('temp from device', messages.temperature);
      console.log('temp from rule', ruleData.temp);

      var currentTime = new Date(); // for now

      let time =
        currentTime.getHours().toString()+" : " +
        currentTime.getMinutes().toString()+" : " +
        currentTime.getSeconds().toString();

      if (ruleData.condition === 'greater than') {
        if (messages.temperature > ruleData.temp) {
          let alertMessage =
            'Hey current temperature : ' +
            messages.temperature +
            ' is greater than ' +
            ruleData.temp;
          toast({
            title: 'Alert',
            description: alertMessage,
            status: 'warning',
            duration: 3000,
            isClosable: true,
          });

          setAlert(true);
          setAlertData([
            ...alertData,
            { message: alertMessage, time: time },
          ]);
        }
      } else if (ruleData.condition === 'less than') {
        if (messages.temperature < ruleData.temp) {
          let alertMessage =
            'Hey current temperature : ' +
            messages.temperature +
            ' is less than ' +
            ruleData.temp;

          toast({
            title: 'Alert',
            description: alertMessage,
            status: 'warning',
            duration: 3000,
            isClosable: true,
          });
          setAlert(true);
          setAlertData([
            ...alertData,
            { message: alertMessage, time: time },
          ]);
        }
      }
    }
     // eslint-disable-next-line
  }, [messages, rule]);

  function formChangeHandler(e) {
    // console.log(e.target.id, ' : ', e.target.value);

    if (e.target.id === 'condition') {
      setRuleData({ ...ruleData, condition: e.target.value });
    }
    if (e.target.id === 'temp' && e.target.value) {
      setSaveButton(true);
      setRuleData({ ...ruleData, temp: e.target.value });
    } else {
      setSaveButton(false);
    }
  }
  return (
    <>
      <Box
        borderRadius="50px"
        bg="#fff"
        style={{ boxShadow: '-20px 20px 60px #bebebe' }}
        p={3}
        w="40vw"
      >
        <Box d="flex" alignItems="center" justifyContent="space-between" mx="5">
          <Text fontSize="2xl">Temperature</Text>
          {rule ? (
            <BsFillBellFill color="black.500" onClick={onOpen} />
          ) : (
            <BsBell onClick={onOpen} />
          )}
        </Box>

        <Text fontSize="9xl" mt="-5" color={'#2d3340'}>
          {messages ? messages.temperature : '0'}°
        </Text>
        <Text textAlign={'center'} mt="-5" fontSize={'4xl'}>
          Celsius
        </Text>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set Alert</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center flexDir={'column'}>
              {!rule ? (
                <>
                  <Text fontSize="2xl" mb="8" as="h1">
                    Create Rule
                  </Text>

                  <Text textAlign={'center'}>Alert me when Temperature is</Text>
                  <Box onChange={formChangeHandler}>
                    <Box spacing={3}>
                      <Select
                        id="condition"
                        defaultValue="greater than"
                        variant="filled"
                        my="5"
                      >
                        <option value="greater than">Greater than</option>
                        <option value="less than">Less than</option>
                      </Select>
                    </Box>
                    <Center>
                      <InputGroup w="70%">
                        <Input
                          id="temp"
                          type="number"
                          placeholder="Temperature"
                        />
                        <InputRightAddon children="°C" />
                      </InputGroup>
                    </Center>
                  </Box>
                  <Button
                    my="8"
                    disabled={!saveButton}
                    onClick={saveRule}
                    colorScheme={'messenger'}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Box>
                    <Center>
                      <Text>
                        Alert me when temperature is
                        <span>
                          <Kbd mx={2}>{ruleData.condition}</Kbd>
                        </span>
                        <span>
                          <Kbd mx={2}>{ruleData.temp}°</Kbd>
                        </span>
                        Celsius
                      </Text>
                    </Center>

                    <Center>
                      <Button colorScheme={'red'} my="4" onClick={deleteRule}>
                        Delete Rule
                      </Button>
                    </Center>
                  </Box>
                </>
              )}
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Card;
