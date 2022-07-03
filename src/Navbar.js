import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
  chakra
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { FaShoppingCart, FaHome } from 'react-icons/fa';
const CFaShoppingCart = chakra(FaShoppingCart);
const CFaHome = chakra(FaHome);
const Links = ['Logout']
const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('teal.200', 'teal.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = JSON.parse(localStorage.getItem('user'))
  const name = user.firstName + " " + user.lastName

  return (
    <>
      <Box bg={useColorModeValue('teal.50', 'teal.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />

          
          <HStack alignItems={'center'}>
          <CFaHome size={'md'} 
            width={'2rem'}
            height={'2rem'}
            color={useColorModeValue('teal.800', 'teal.200')}
            cursor={'pointer'}
            onClick={() => {
              window.location.href = '/dashboard';
            }}
           />
            <Box>
                <Heading
                    as="h1"
                    fontSize={'2xl'}
                    fontWeight={'bold'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    width={'max-content'}
                    ml={4}
                >
                    {name}
                </Heading>
            </Box>
          </HStack>
          <CFaShoppingCart size={'md'} 
            width={'2rem'}
            height={'2rem'}
            color={useColorModeValue('teal.800', 'teal.200')}
            marginLeft={'20%'}
            cursor={'pointer'}
            onClick={() => {
              window.location.href = '/cart';
            }}
           />
          <Flex alignItems={'center'}>
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
              </MenuButton>
              <MenuList>
              
                <MenuItem
                  onClick={()=>{
                      localStorage.clear()
                      window.location.href = '/login'
                    }}
                >Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}
                  onClick={()=>{
                    localStorage.clear()
                    window.location.href = '/login'
                  }}
                >{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}