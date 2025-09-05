import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 8px;
  height: 56px;
  border: none;
  border-radius: 100px;
  font-weight: 600;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  color: #00095C;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }

  @media (min-width: 768px) {
    font-size: 16px;    
  }  
`;

export default Button;