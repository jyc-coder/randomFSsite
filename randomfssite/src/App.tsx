import React, {useEffect, useState} from 'react';
import './App.css';
import Box from './components/Box';
import Flex from './components/Flex';
import {VscAdd, VscArrowLeft, VscCheck, VscClose, VscEdit, VscListFlat, VscTrash} from 'react-icons/vsc';
import axios from 'axios';
import Data from './interfaces/Data';

axios.defaults.baseURL = 'http://localhost:8080/';

function App() {
  const [page, setPage] = useState<'main' | 'edit'>('main');
  const [nowData, setNowData] = useState<null | Data>(null);
  const [dataList, setDataList] = useState<null | Data[]>(null);
  const [createMode, setCreateMode] = useState(false);
  const [createInp, setCreateInp] = useState<[string, string]>(["", ""]);
  const [editInp, setEditInp] = useState<[string, string]>(['', '']);
  const [selectedData, setSelectedData] = useState<string|null>(null)
  const [error, setError] = useState('');

  useEffect(() => {
    if (page === 'main') {
      axios
        .get('/random')
        .then((e) => setNowData(e.data))
        .catch(() => setError('명언을 불러오지 못했습니다'));
    } else {
      axios
        .get('/')
        .then((e) => setDataList(e.data))
        .catch(() => setError('명언을 불러오지 못했습니다'));
    }
  }, [page]);

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
            overflowX={'scroll'}
            mt="45px"
            mb="45px"
            border={'solid 1px #707070'}
            alignItems={'center'}
            justifyContent={'center'}
            width={'100%'}
            height={'160px'}
            textAlign={'center'}
            fontSize={'48px'}
          >
            {error.length > 0 && error}
            <Box
              width={'100%'}
              px={'16px'}
              style={{
                whiteSpace: 'pre',
              }}
            >
              {nowData?.message}
              {'  '}
            </Box>
          </Flex>
          <Box fontSize={'24px'}>{nowData?.author}</Box>
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
          onClick={() => setCreateMode((prev) => !prev)}
        >
          {createMode ? <VscClose color="white" fontSize={'24px'} /> : <VscAdd color="white" fontSize={'24px'} />}
        </Flex>
      </Flex>
      {dataList?.map((data, idx) => (
        <Flex width="541px" height={'51px'} mb="23px" key={data.message}>
          <Flex
            border={'solid 1px #707070'}
            flex={1}
            overflowX="scroll"
            style={{
              whiteSpace: 'pre',
            }}
          >
            {data.message === selectedData ? (
              <>
                <input
                  value={editInp[0]}
                  onChange={(event) => setEditInp((prev) => [event.target.value, prev[1]])}
                />
                <input
                  value={editInp[1]}
                  onChange={(event) => setEditInp((prev) => [prev[0], event.target.value])}
                />
              </>
            ) : (
              `[${data.author}] ${data.message}`
            )}
          </Flex>
          <Flex
            bg="#2D9CBF"
            width={'74px'}
            height={'51px'}
            borderRadius={'10px'}
            alignItems={'center'}
            justifyContent={'center'}
            onClick={() => {
              if (data.message === selectedData) {
                  axios
                    .put('/' + idx, {
                      author: editInp[0],
                      message: editInp[1],
                    })
                    .then(({data}) => {
                      if (data.re) {
                        setDataList([]);
                        setEditInp(['', '']);
                        setSelectedData(null);
                        alert('수정 완료되었습니다!');
                        axios
                          .get('/')
                          .then((e) => setDataList(e.data))
                          .catch(() => setError('명언을 불러오지 못했습니다'));
                      } else alert('수정이 실패하였습니다');
                    });
              }
              setSelectedData(data.message);
              setEditInp([data.author, data.message])
            }}
          >
            {data.message === selectedData ? (
              <VscCheck color="white" fontSize={'24px'} />
            ) : (
              <VscEdit color="white" fontSize={'24px'} />
            )}
          </Flex>

          <Flex
            bg="#BF2D2D"
            width={'74px'}
            height={'51px'}
            borderRadius={'10px'}
            alignItems={'center'}
            justifyContent={'center'}
            onClick={() => {
              if (window.confirm('정말 해당 명언을 제거 하시겠습니까?')) {
                axios.delete('/' + idx).then(({data}) => {
                  if (data.re) {
                    setDataList([]);
                    alert('제거 완료되었습니다!');
                    axios
                      .get('/')
                      .then((e) => setDataList(e.data))
                      .catch(() => setError('명언을 불러오지 못했습니다'));
                  } else alert('제거가 실패하였습니다');
                });
              }
            }}
          >
            <VscTrash color="white" fontSize={'24px'} />
          </Flex>
        </Flex>
      ))}

      {createMode && (
        <>
          <Flex width="541px" height={'51px'} mb="23px">
            <Flex
              border={'solid 1px #707070'}
              flex={1}
              overflowX="scroll"
              style={{
                whiteSpace: 'pre',
              }}
            >
              <input value={createInp[0]} onChange={(event) => setCreateInp((prev) => [event.target.value, prev[1]])} />
              <input value={createInp[1]} onChange={(event) => setCreateInp((prev) => [prev[0], event.target.value])} />
            </Flex>
            <Flex
              bg="#2D9CBF"
              width={'74px'}
              height={'51px'}
              borderRadius={'10px'}
              alignItems={'center'}
              justifyContent={'center'}
              onClick={() => {
                if (createInp[0].length === 0 || createInp[1].length === 0) {
                  alert('정상적인 값이 아닙니다.');
                  return;
                }

                axios
                  .post('/', {
                    author: createInp[0],
                    message: createInp[1],
                  })
                  .then(({data}) => {
                    if (data.re) {
                      setDataList([]);
                      setCreateInp(['', '']);
                      setCreateMode(false);
                      alert('생성 완료되었습니다!');
                      axios
                        .get('/')
                        .then((e) => setDataList(e.data))
                        .catch(() => setError('명언을 불러오지 못했습니다'));
                    } else alert('생성이 실패하였습니다');
                  });
              }}
            >
              <VscCheck color="white" fontSize={'24px'} />
            </Flex>
          </Flex>
        </>
      )}
    </Flex>
  );
}

export default App;
