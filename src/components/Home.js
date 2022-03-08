import React from 'react';
import { Table, Container, Button } from 'react-bootstrap';

const Home = (props) => {
  const promptList = [
    'CR Election',
    'Corporate Election',
    'National Elections',
  ];

  return (
    <Container>
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
                <Button>Go to Polls</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
