import React, { useEffect, useState } from 'react';
import { Table, Container, Button } from 'react-bootstrap';

const Home = (props) => {
  // const promptList = [
  //   'CR Election',
  //   'Corporate Election',
  //   'National Elections',
  //   'Who da best',
  //   'Test4',
  // ];

  const [promptList, setPromptList] = useState([]);

  useEffect(() => {
    const showPolls = async () => {
      let allPrompts = await window.contract.getAllPrompts();
      setPromptList(allPrompts);
    };

    showPolls();
  }, []);

  const removePolls = async () => {
    await window.contract.clearPromptArray();
  };

  if (promptList.length > 0) {
    return (
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Table style={{ margin: '5vh' }} striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>List of Polls</th>
              <th>Go to poll</th>
            </tr>
          </thead>
          <tbody>
            {promptList.map((el, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{el}</td>
                <td>
                  <Button onClick={() => props.changeCandidates(el)}>
                    Go to Polls
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Button onClick={removePolls} style={{ width: '250px' }}>
          Remove All Polls
        </Button>
      </Container>
    );
  } else {
    return (
      <h1 style={{ textAlign: 'center', fontWeight: 'light' }}>
        Please add new Polls
      </h1>
    );
  }
};

export default Home;
