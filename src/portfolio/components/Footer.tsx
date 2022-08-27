import styled from 'styled-components';

import twitterIcon from '../../assets/twitter.svg';
import linkedinIcon from '../../assets/linkedin.svg';
import githubIcon from '../../assets/github.svg';
import { Link } from '@mui/material';

const Root = styled.div`
  background-color: #284865;
  padding: 24px;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 800;
`;

const Email = styled(Link)`
  margin-top: 32px;
  font-size: 14px;
  color: #fff;
`;

const Social = styled.div`
  width: 280px;
  margin-top: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SocialIcon = styled.img`
  width: 48px;
  height: 48px;
`;

const Copyright = styled.div`
  margin-top: 32px;
  font-size: 12px;
`;

const Footer = ({ className }: { className?: string }) => (
  <Root className={className}>
    <Title>Get in touch!</Title>
    <Email href="mailto:fabianopbrito@gmail.com" underline="none">
      fabianopbrito@gmail.com
    </Email>
    <Social>
      <Link href="https://twitter.com/fabianopaivab" target="_blank" rel="noopener noreferrer">
        <SocialIcon src={twitterIcon} />
      </Link>
      <Link href="https://linkedin.com/in/fabianopb" target="_blank" rel="noopener noreferrer">
        <SocialIcon src={linkedinIcon} />
      </Link>
      <Link href="https://github.com/Fabianopb" target="_blank" rel="noopener noreferrer">
        <SocialIcon src={githubIcon} />
      </Link>
    </Social>
    <Copyright>© 2016 Fabiano Brito. Developed using Ruby on Rails. Recreated in 2022 using React.</Copyright>
  </Root>
);

export default Footer;