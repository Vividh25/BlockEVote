import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const PollingStation = (props) => {
  const [candidateList, setCandidateList] = useState([]);
  const [promptName, setPromptName] = useState('');

  useEffect(() => {
    const getList = async () => {
      let promptName = localStorage.getItem('Prompt');
      // setPromptName(localStorage.getItem('Prompt'));
      setPromptName(promptName);
      const candidateNames = await window.contract.getCandidateList({
        prompt: promptName,
      });
      setCandidateList(candidateNames);
    };

    getList();
  }, []);

  // const candidateList = await window.contract.getCandidateList();

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ fontWeight: 'lighter', marginTop: '10px' }}>{promptName}</h1>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        {candidateList.map((el, index) => (
          <Row
            key={index}
            style={{
              marginTop: '5vh',
              backgroundColor: '#c4c4c4',
              marginLeft: '50px',
              borderRadius: '15px',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '6vw',
              }}
            >
              {el}
            </div>
            <Button>Vote</Button>
          </Row>
        ))}
      </Container>
    </Container>
  );
};

export default PollingStation;
