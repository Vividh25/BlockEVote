import { Button } from 'react-bootstrap';
import React, { useState } from 'react';
import '../component-css/NewPoll.css';
import TextField from '@material-ui/core/TextField';
import { v4 as uuidv4 } from 'uuid';
const NewPoll = () => {
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), candidateName: '' },
  ]);

  const [pollName, setPollName] = useState('');

  const candidateList = [];

  const sendToBlockchain = async () => {
    await window.contract.addCandidateList({
      prompt: pollName,
      candidateNames: candidateList,
    });
    await window.contract.addToPromptArray({ prompt: pollName });
  };

  const handleChangeInput = (id, event) => {
    // console.log('=>', event.target.value);
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setInputFields(newInputFields);
    // console.log(inputFields);
  };

  const handleSubmit = async () => {
    // console.log(inputFields);
    inputFields.map((i) => {
      candidateList.push(i.candidateName);
    });
    console.log(candidateList);
    await sendToBlockchain();
    window.location.replace('/');
  };

  const handleAddFields = () => {
    setInputFields([...inputFields, { id: uuidv4(), candidateName: '' }]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  const handlePollName = (e) => {
    e.preventDefault();
    setPollName(e.target.value);
    // console.log(pollName);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '500px',
      }}
    >
      <form
        style={{
          display: 'flex',
          justifyContent: 'ceneter',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            border: '1px solid grey',
            padding: '20px',
            borderRadius: '10px',
          }}
        >
          {inputFields.map((inputField) => (
            <div
              key={inputField.id}
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <TextField
                style={{ width: '300px', marginTop: '10px' }}
                name='candidateName'
                label='Candidate Name'
                variant='filled'
                // value={inputField.candidateName}
                onChange={(event) => handleChangeInput(inputField.id, event)}
              />
              <Button
                style={{ marginLeft: '10px', marginTop: '10px' }}
                onClick={handleRemoveFields}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
        <Button
          style={{ width: '150px', marginTop: '10px' }}
          onClick={(event) => handleAddFields(event)}
        >
          Add More
        </Button>
        <TextField
          style={{ marginTop: '30px', width: '300px' }}
          name='PollName'
          label='Poll Name'
          variant='filled'
          onChange={handlePollName}
        />

        <Button onClick={handleSubmit}>Submit</Button>
      </form>
      {/* <input
        type='number'
        placeholder='0'
        label='Number of Candidates'
        onChange={setCount}
      ></input> */}
      {/* {Array.from(Array(candidateCount)).map((ele, index) => {
        console.log('Field Created');
        return (
          <div key={index} style={{ display: 'flex', marginTop: '15px' }}>
            <input
              className='inputField'
              type='string'
              placeholder='Candidate Name'
            ></input>
            <Button style={{ borderRadius: '10px' }}>Add</Button>
          </div>
        );
      })} */}

      {/* <div style={{ display: 'flex', marginTop: '15px' }}>
        <input
          className='inputField'
          type='string'
          placeholder='Candidate Name'
        ></input>
        <Button style={{ borderRadius: '10px' }}>Add</Button>
      </div> */}
    </div>
  );
};

export default NewPoll;
