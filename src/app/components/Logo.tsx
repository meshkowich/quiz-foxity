import styled from 'styled-components';
import Image  from 'next/image';
import SuniflowLogo from '../assets/suniflow_logo.webp';
import SuniflowLogoLight from '../assets/suniflow_logo_light.webp';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 50px;
  max-width: 175px;
  margin: 0;
`;

const Logo = ({ isLight = false }) => {
  return (
    <LogoContainer>
      <Image
        src={isLight ? SuniflowLogoLight : SuniflowLogo}
        alt="Suniflow Logo"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </LogoContainer>
  );
};

export default Logo;
