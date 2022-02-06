import React from 'react';
import { Box, Center, Image } from '@chakra-ui/react';
import WTSLogo from '../wtsLogo.png';

function Header() {
  return (
    <>
      <Box bg="#292838" w="100vw" p={2} borderBottomRadius="3xl" boxShadow={"xl"}>
        <Center>
          <Image src={WTSLogo} w={75} h={75} />
        </Center>
      </Box>
    </>
  );
}

export default Header;
