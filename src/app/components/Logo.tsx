import styled from 'styled-components';
import Image  from 'next/image';
import SuniflowLogo from '../assets/suniflow_logo.webp';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 50px;
  max-width: 175px;
  margin: 0;
`;

const Logo = () => {
  return (
    <LogoContainer>
      <Image
        src={SuniflowLogo}
        alt="Suniflow Logo"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </LogoContainer>
  );
};

export default Logo;
