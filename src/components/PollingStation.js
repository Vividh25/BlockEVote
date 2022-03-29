import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const PollingStation = (props) => {
  const [candidateList, setCandidateList] = useState([]);
  const [promptName, setPromptName] = useState('');
  const [voteArray, setVoteArray] = useState([]);

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
    // updateVotes();
  }, []);

  const updateVotes = async () => {
    let voteCount = await window.contract.getVotes({
      prompt: localStorage.getItem('Prompt'),
    });
    console.log(voteCount);
    setVoteArray(voteCount);
    // console.log('Votes:', voteArray);
  };

  const addVote = async (index) => {
    console.log('index:', index);

    let userParticipation = await window.contract.didParticipate({
      prompt: localStorage.getItem('Prompt'),
      user: window.accountId,
    });

    if (userParticipation) {
      console.log('You have already coted for this poll');
    } else {
      await window.contract.addVote({
        prompt: localStorage.getItem('Prompt'),
        index: index,
      });

      await window.contract.recordUser({
        prompt: localStorage.getItem('Prompt'),
        user: window.accountId,
      });
      updateVotes();
    }
  };

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
            <Button onClick={() => addVote(index)}>Vote</Button>
          </Row>
        ))}
      </Container>
    </Container>
  );
};

export default PollingStation;
