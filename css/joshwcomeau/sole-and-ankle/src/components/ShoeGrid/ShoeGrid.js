import React from 'react';
import styled from 'styled-components/macro';

import SHOES from '../../data';
import ShoeCard from '../ShoeCard';

const ShoeGrid = () => {
  return (
    <Wrapper>
      {SHOES.map((shoe) => (
        <ShoeCard key={shoe.slug} {...shoe} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;

  & .shoe-card {
    flex: 1 1 300px;
    max-width: 300px;
  }

  & .shoe-card img {
    width: 100%;
  }
`;

export default ShoeGrid;
