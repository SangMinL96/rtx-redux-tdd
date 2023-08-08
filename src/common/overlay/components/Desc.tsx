import React from 'react';
import styled from 'styled-components';

function Desc({ children }:any) {
  return (
    <StyledDesc>
      <p>{children}</p>
    </StyledDesc>
  );
}

export default React.memo(Desc);
const StyledDesc = styled.div`
  margin-top: 20px;
  font-size: 14px;
  line-height: 21px;
  color: #8c8c8c;
  white-space: pre-wrap;
  p {
    white-space: pre-wrap;
  }
`;
