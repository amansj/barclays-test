import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from './Navbar'
import swal from 'sweetalert'
import {
    Box,
    Center,
    useColorModeValue,
    Heading,
    Text,
    Stack,
    Image,
    Flex,
    Button,
  } from '@chakra-ui/react';
  const IMAGE ="https://source.unsplash.com/random/100x100?sig=";
const Cart = () => {
    const [cart, setCart] = useState([])
    useEffect(() => {
        if (localStorage.getItem('cart') !== undefined && localStorage.getItem('cart') !== null) {
            setCart(JSON.parse(localStorage.getItem('cart')))
            console.log(JSON.parse(localStorage.getItem('cart')))
        }
    }, [])
    const removeFromCart = (idx) => {
        let cart = JSON.parse(localStorage.getItem('cart'))
        let newCart = cart.filter((item,index) => index !== idx)
        setCart(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
        swal("Item Removed from Cart", "", "success")
    }
    useEffect(() => {
        console.log(cart)
    }, [cart])
  return (
    <div>
        <Navbar />
        <Flex
            flexDirection="row"
            width="100wh"
            flexWrap={'wrap'}
        >
        {
            cart.length > 0 ?
            cart.map((item, index) => {
                return <ItemCard item={item} index={index} addToCart={removeFromCart} />
            })
            :
            <Center>No Items in Cart</Center>
        }
        </Flex>
    </div>
  )
}

export default Cart

function ItemCard({ item, index, addToCart}) {
    return (
      <Center py={12} mx={4} index={index}>
        <Box
          role={'group'}
          p={6}
          maxW={'330px'}
          w={'200px'}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'md'}
          rounded={'lg'}
          pos={'relative'}
          zIndex={1}>
          <Center
            rounded={'lg'}
            height={'100px'}

            >
            <Image
              rounded={'lg'}
              height={100}
              width={100}
              objectFit={'cover'}
              src={IMAGE+`${index+1}`}
            />
          </Center>
          <Stack pt={5} align={'center'}>
            <Heading fontSize={'lg'} fontFamily={'body'} fontWeight={500}>
                {item.name}
            </Heading>
            <Stack direction={'row'} align={'center'}>
              <Text fontWeight={800} fontSize={'xl'}>
              ₹{item.discountedSellingPrice}
              </Text>
              <Text textDecoration={'line-through'} color={'gray.600'}>
              ₹{item.mrp}
              </Text>
            </Stack>
            <Button
                colorScheme={'teal'}
                variant={'solid'}
                size={'sm'}
                onClick={() => addToCart(index)}
            >
                Remove from Cart
            </Button>
          </Stack>
        </Box>
      </Center>
    );
}