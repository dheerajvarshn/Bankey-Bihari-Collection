import { Box, Heading, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const CategoryFilter = ({ category}) => {
  const [products,setProducts]=useState([])
  const [allCategory,setAllCategory] = useState([])
  const { searchResult } = useSelector((state) => state.searchReducer);
    const [value,setValue] = useState('')

    useEffect(() => {
      if (searchResult.length === "") {
        return;
      } else if (searchResult[0]) {
        setProducts(searchResult[0]);
      }
    }, [searchResult]);
  
    if (products) {
      products.forEach((item) => {
        const caplet = item.category[0].toUpperCase() + item.category.slice(1)
        !allCategory.includes(caplet) && (
          setAllCategory([...allCategory,caplet])
        )
      })
    }
    useEffect(()=>{
      category(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[value])

  return (
    <Box mt={2}>
        {
          allCategory && (
          <Box>
         <Heading size={'sm'} fontStyle={'oblique'}>Category</Heading>
    <RadioGroup onChange={setValue} value={value}>
      <Stack direction='column' spacing={'2'}>
        {
          allCategory.map((item)=>(
            <Radio size='sm' value={item} key={item}>{item}</Radio>

          ))
        }
      </Stack>
    </RadioGroup>
        </Box>
          )
        }

    </Box>
  )
}

export default CategoryFilter
