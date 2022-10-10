import React, {useState} from 'react';
import './App.css';
import Box from './components/Box';
import Flex from './components/Flex';
import {VscAdd, VscArrowLeft, VscEdit, VscListFlat, VscTrash} from 'react-icons/vsc';
function App() {
  const [page, setPage] = useState<'main' | 'edit'>('main');

  if (page === 'main')
    return (
      <>
        <Flex position={'fixed'} right={'146px'} top={'119px'} borderRadius={'10px'}>
          <Flex
            bg="#2D9CBF"
            width={'74px'}
            height={'46px'}
            borderRadius={'10px'}
            alignItems={'center'}
            justifyContent={'center'}
            onClick={() => setPage('edit')}
          >
            <VscListFlat color="white" fontSize={'24px'} />
          </Flex>
        </Flex>
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          height={'100vh'}
          bg="skyblue"
          px={'16px'}
        >
          <Box fontSize={'24px'}>오늘의 명언</Box>
          <Flex
            mt="45px"
            mb="45px"
            border={'solid 1px #707070'}
            width={'100%'}
            alignItems={'center'}
            justifyContent={'center'}
            maxWidth={'1000px'}
            height={'160px'}
            textAlign={'center'}
            fontSize={'48px'}
          >
            무슨 무슨 멋진 말 ~~~~~ 굿굿
          </Flex>
          <Box fontSize={'24px'}>이름</Box>
        </Flex>
      </>
    );

  return (
    <Flex pt={'75px'} pl={'64px'} flexDirection={'column'}>
      <Flex
        borderRadius={'10px'}
        pb="41px"
        style={{
          gap: '43px',
        }}
      >
        <Flex
          bg="#2D9CBF"
          width={'74px'}
          height={'46px'}
          borderRadius={'10px'}
          alignItems={'center'}
          justifyContent={'center'}
          onClick={() => setPage('main')}
        >
          <VscArrowLeft color="white" fontSize={'24px'} />
        </Flex>

        <Flex
          bg="#2D9CBF"
          width={'74px'}
          height={'46px'}
          borderRadius={'10px'}
          alignItems={'center'}
          justifyContent={'center'}
          onClick={() => setPage('main')}
        >
          <VscAdd color="white" fontSize={'24px'} />
        </Flex>
      </Flex>

      <Flex width="541px" height={'51px'} >
        <Flex border={'solid 1px #707070'} flex={1}></Flex>
        <Flex
          bg="#2D9CBF"
          width={'74px'}
          height={'51px'}
          borderRadius={'10px'}
          alignItems={'center'}
          justifyContent={'center'}
          onClick={() => setPage('main')}
        >
          <VscEdit color="white" fontSize={'24px'} />
        </Flex>

        <Flex
          bg="#BF2D2D"
          width={'74px'}
          height={'51px'}
          borderRadius={'10px'}
          alignItems={'center'}
          justifyContent={'center'}
          onClick={() => setPage('main')}
        >
          <VscTrash color="white" fontSize={'24px'} />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default App;
