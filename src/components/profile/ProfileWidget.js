import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useProfile from '../../hooks/useProfile';
import { IconEvent } from '../../icons/IconEvent';
import { palette } from '../../theme/palette';
import { formatProfileFirstLastName } from '../../utils/formatters';

const Wrapper = styled.div`
  padding: 16px;
  border-radius: 16px;
  background-color: #ffffff;
`;

const Message = styled.div`
  text-align: center;
`;

const ProfileWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 10px;
`;

const Brand = styled.div`
  font-size: 0.6em;
  color: ${palette.text.secondary};
`;

const DetailsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NameLink = styled.a`
  margin-left: 8px;
  text-decoration: none;
  color: ${palette.primary.main};
  font-weight: bold;
`;

const PositiveRating = styled.div`
  margin-left: 12px;
  color: ${palette.success.main};
  font-weight: bold;
`;

const NegativeRating = styled.div`
  margin-left: 12px;
  color: ${palette.danger.main};
  font-weight: bold;
`;

const Button = styled.a`
  padding: 0px 16px;
  height: 36px;
  border-radius: 12px;
  align-self: flex-end;
  display: flex;
  align-items: center;
  color: ${palette.primary.main};
  text-decoration: none;
  font-size: 0.9em;
  background-color: ${palette.primary.button.background};
  &:hover {
    background-color: ${palette.primary.button.backgroundHover};
  }
`;

const ButtonIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
`;

/**
 * A component with a profile widget.
 */
export default function ProfileWidget({ domElement }) {
  const account = domElement.getAttribute('account');
  const { getProfile } = useProfile();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  /**
   * Load profile if account is specified.
   */
  useEffect(() => {
    if (account) {
      getProfile(account)
        .then((profile) => setProfile(profile))
        .catch((error) => console.error(error))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <Wrapper>
      {isLoading && <Message>Loading...</Message>}
      {!isLoading && !profile && <Message>Profile not found</Message>}
      {!isLoading && profile && (
        <div>
          <Brand>POWER BY YOURJUSTICE</Brand>
          <ProfileWrapper>
            <Image src={profile.uriImage} />
            <DetailsWrapper>
              <NameLink
                href={`${process.env.REACT_APP_YJ_DAPP}/profile/${profile.owner}`}
                target="blank"
              >
                {formatProfileFirstLastName(profile)}
              </NameLink>
              <PositiveRating>+{profile.totalPositiveRating}</PositiveRating>
              <NegativeRating>-{profile.totalNegativeRating}</NegativeRating>
            </DetailsWrapper>
            <Button
              href={`${process.env.REACT_APP_YJ_DAPP}/profile/${profile.owner}`}
              target="blank"
            >
              <ButtonIconWrapper>
                <IconEvent />
              </ButtonIconWrapper>
              Change Reputation
            </Button>
          </ProfileWrapper>
        </div>
      )}
    </Wrapper>
  );
}
