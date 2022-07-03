import React, { useEffect, useState, useMemo } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import Pagination from './Pagination';
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
  import swal from 'sweetalert';
  const IMAGE ="https://source.unsplash.com/random/100x100?sig=";

const Dashboard = () => {
    const [ItemArray, setItemArray] = useState([])
    const [storeList, setStoreList] = useState([])
    const [closeststore, setClosestore] = useState({
        Area: "Adugodi",
        Latitude: "12.9716",
        Longitude: "77.5946",
        Pincode: "560 030",
        Store_Name: "Kanti Sweets",
    })
    const [distList, setDistList] = useState([])
    const [currentLocation, setCurrentLocation] = useState({
        latitude: 10,
        longitude: 10
    })
    useEffect(() => {
        axios
            .get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/items22808a8.txt')
            .then(res => {
                setItemArray(res.data.Data)
            })
        navigator.geolocation.getCurrentPosition(function(position) {
            setCurrentLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        });
        axios.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/datab79e8b2.txt').then(res => {
            setStoreList(Object.values(res.data)[0])
        })  
    }, [])
    const [currentPage, setCurrentPage] = useState(1);
    const PageSize = 30;
    const currentTableData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return ItemArray.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, ItemArray]);
    const addToCart = (item) => {
        console.log(localStorage.getItem('cart'))
        let cart = localStorage.getItem('cart') !== undefined && localStorage.getItem('cart')!==null ? JSON.parse(localStorage.getItem('cart')) : [];
        cart.push(item)
        localStorage.setItem('cart', JSON.stringify(cart))
        swal("Added to Cart", "", "success")

    }
    useEffect(() => {
        let distListTemp = []
        storeList.forEach(store => {
            const dist = distance(currentLocation.latitude, currentLocation.longitude, Number(store.Latitude), Number(store.Longitude))
            distListTemp.push({
                store: store,
                dist: dist
            })
        })
        distListTemp.sort((a, b) => a.dist - b.dist)
        setClosestore(distListTemp[0]?.store)
    }, [storeList])
    function distance(lat1, lon1, lat2, lon2) {
        var radlat1 = Math.PI * lat1/180
        var radlat2 = Math.PI * lat2/180
        var theta = lon1-lon2
        var radtheta = Math.PI * theta/180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist)
        dist = dist * 180/Math.PI
        dist = dist * 60 * 1.1515;
        dist = dist * 0.8684 
        return dist
    }

    
  return (
    <div>
        <Navbar />
        <StoreCard storeDetails={closeststore} />
        <Flex
            flexDirection="row"
            width="100wh"
            flexWrap={'wrap'}

        >
            {
                currentTableData.map((item, index) => {
                    return (
                        <ItemCard index={index} item={item} addToCart={addToCart}/>
                    )
                })
            }
        </Flex>
        <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={ItemArray.length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)}
        />
    </div>
  )
}

export default Dashboard


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
                onClick={() => addToCart(item)}
            >
                Add to Cart
            </Button>
          </Stack>
        </Box>
      </Center>
    );
}
  
function StoreCard({storeDetails}){
    return (
        <Flex
            padding={30}
            margin={'auto'}
            marginTop={30}
            border={'1px solid teal.200'}
            borderRadius={'lg'}
            width={'95%'}
            height={'200px'}
            backgroundColor={'teal.100'}
            flexDirection={'column'}
        >
            <Text
                fontSize={'12px'}
                color={'teal.800'}
                fontWeight={'bold'}
            >
                    Closest Store 
            </Text>
            <Heading fontSize={'4xl'} fontWeight={700} mt={4}>
                {storeDetails?.Store_Name !== undefined ? storeDetails.Store_Name : 'Loading'}
            </Heading>
            <Text
                fontSize={'16px'}
                color={'teal.800'}
                fontWeight={'bold'}
                mt={2}
            >
                    {storeDetails?.Area !== undefined ? storeDetails.Area : 'Loading'}
            </Text>
        </Flex>
    )
}