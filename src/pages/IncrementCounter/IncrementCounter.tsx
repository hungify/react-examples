import { socials } from 'mocks/socials';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #8d44ad;
`;
const Social = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 30px 50px;
  color: #fff;
`;
const SocialLogo = styled.div`
  svg {
    font-size: 50px;
  }
`;
const SocialFollower = styled.div`
  span {
    font-size: 60px;
    margin-top: 10px;
    letter-spacing: 1.12px;
  }
`;
const SocialName = styled.div`
  span {
    font-size: 30px;
    margin-top: 10px;
  }
`;

export default function IncrementCounter() {
  const [twitter, setTwitter] = useState({
    from: 0,
    to: socials[0].followers,
  });
  const [youtube, setYoutube] = useState({
    from: 0,
    to: socials[1].followers,
  });
  const [facebook, setFacebook] = useState({
    from: 0,
    to: socials[2].followers,
  });

  useEffect(() => {
    const increment = twitter.to / 200;
    let timer = setTimeout(() => {
      if (twitter.from < twitter.to) {
        setTwitter({
          ...twitter,
          from: Math.ceil(increment + twitter.from),
        });
      } else {
        setTwitter({
          ...twitter,
          from: twitter.to,
        });
      }
    }, 1);
    return () => clearInterval(timer);
  }, [twitter]);

  useEffect(() => {
    const increment = youtube.to / 200;
    let timer = setTimeout(() => {
      if (youtube.from < youtube.to) {
        setYoutube({
          ...youtube,
          from: Math.ceil(increment + youtube.from),
        });
      } else {
        setYoutube({
          ...youtube,
          from: youtube.to,
        });
      }
    }, 1);
    return () => clearInterval(timer);
  }, [youtube]);

  useEffect(() => {
    const increment = facebook.to / 200;
    let timer = setTimeout(() => {
      if (facebook.from < facebook.to) {
        setFacebook({
          ...facebook,
          from: Math.ceil(increment + facebook.from),
        });
      } else {
        setFacebook({
          ...facebook,
          from: facebook.to,
        });
      }
    }, 1);
    return () => clearInterval(timer);
  }, [facebook]);

  return (
    <Wrapper>
      {socials.map((social) => (
        <Social key={social.id}>
          <SocialLogo>{social.icon}</SocialLogo>
          <SocialFollower>
            <span>
              {social.id === 'twitter'
                ? twitter.from
                : social.id === 'youtube'
                ? youtube.from
                : facebook.from}
            </span>
          </SocialFollower>
          <SocialName>
            <span>{social.title}</span>
          </SocialName>
        </Social>
      ))}
    </Wrapper>
  );
}
