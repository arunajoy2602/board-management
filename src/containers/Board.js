import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Lane from '../components/Lane/Lane';

const BoardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin: 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const Board = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const fetchData = async () => {
        const tickets = await fetch('../../assets/data.json');
        const ticketsJSON = await tickets.json();

        if (ticketsJSON) {
          setData(ticketsJSON);
          setLoading(false);
        }
      }
      fetchData()
    } catch (error) {
      setLoading(false);
      setError(error.message)
    }
  }, [])

  const lanes = [
    { id: 1, title: 'To Do' },
    { id: 2, title: 'In Progress' },
    { id: 3, title: 'Review' },
    { id: 4, title: 'Done' },
  ];

  return (
    <BoardWrapper>
      {lanes.map(lane => (
        <Lane
          key={lane.id}
          title={lane.title}
          loading={loading}
          error={error}
          tickets={data.filter(ticket => ticket.lane === lane.id)}
        />
      ))}
    </BoardWrapper>
  );
}


export default Board;
