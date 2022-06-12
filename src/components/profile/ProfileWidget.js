import { useEffect, useState } from 'react';
import styled from 'styled-components';
import useJurisdiction from '../../hooks/useJurisdiction';
import useProfile from '../../hooks/useProfile';
import { IconArrowDown } from '../../icons/IconArrowDown';
import { IconArrowUp } from '../../icons/IconArrowUp';
import { IconLogo } from '../../icons/IconLogo';
import { palette } from '../../theme/palette';
import { formatProfileFirstLastName } from '../../utils/formatters';

const Wrapper = styled.div`
  padding: 16px;
  border-radius: 16px;
  background-color: #ffffff;
  font-family: 'Manrope', sans-serif;
`;

const Message = styled.div`
  text-align: center;
`;

const ProfileWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Image = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 12px;
`;

const BrandWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.6em;
  font-weight: 600;
  color: ${palette.text.secondary};
`;

const BrandLogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 4px;
`;

const DetailsWrapper = styled.div`
  margin-left: 12px;
  flex: 1;
`;

const NameRatingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const NameLink = styled.a`
  text-decoration: none;
  color: ${palette.primary.main};
  font-weight: 700;
`;

const PositiveRating = styled.div`
  margin-left: 12px;
  color: ${palette.success.main};
  font-weight: 700;
`;

const NegativeRating = styled.div`
  margin-left: 12px;
  color: ${palette.danger.main};
  font-weight: 700;
`;

const JurisdictionLink = styled.a`
  text-decoration: none;
  font-size: 0.8em;
  font-weight: 600;
  color: ${palette.text.secondary};
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
  font-weight: 500;
  background-color: ${palette.primary.button.background};
  &:hover {
    background-color: ${palette.primary.button.backgroundHover};
  }
`;

const ButtonLeftIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 8px;
`;

const ButtonRightIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 8px;
`;

/**
 * A component with a profile widget.
 */
export default function ProfileWidget({ domElement }) {
  const accountAttribute = domElement.getAttribute('account');
  const jurisdictionAttribute = domElement.getAttribute('jurisdiction');
  const { getProfile } = useProfile();
  const { getJurisdiction } = useJurisdiction();
  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [jurisdiction, setJurisdiction] = useState(null);

  async function loadData() {
    try {
      const profile = await getProfile(accountAttribute);
      setProfile(profile);
      if (profile && jurisdictionAttribute) {
        const jurisdiction = await getJurisdiction(jurisdictionAttribute);
        setJurisdiction(jurisdiction);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  /**
   * Load profile and jurisdiction if attributes is specified when component is mounted.
   */
  useEffect(() => {
    if (accountAttribute) {
      loadData();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <Wrapper>
      {isLoading && <Message>Loading profile...</Message>}
      {!isLoading && !profile && <Message>Profile not found</Message>}
      {!isLoading && profile && (
        <div>
          <BrandWrapper>
            POWERED BY
            <BrandLogoWrapper>
              <IconLogo
                width="100px"
                height="17px"
                color={palette.text.secondary}
              />
            </BrandLogoWrapper>
          </BrandWrapper>
          <ProfileWrapper>
            <Image src={profile.uriImage} />
            <DetailsWrapper>
              <NameRatingWrapper>
                <NameLink
                  href={`${process.env.REACT_APP_YJ_DAPP}/profile/${profile.owner}`}
                  target="blank"
                >
                  {formatProfileFirstLastName(profile)}
                </NameLink>
                <PositiveRating>+{profile.totalPositiveRating}</PositiveRating>
                <NegativeRating>-{profile.totalNegativeRating}</NegativeRating>
              </NameRatingWrapper>
              {jurisdiction && (
                <JurisdictionLink
                  href={`${process.env.REACT_APP_YJ_DAPP}/jurisdiction/${jurisdiction.id}`}
                  target="blank"
                >
                  {jurisdiction.name}
                </JurisdictionLink>
              )}
            </DetailsWrapper>
            <Button
              href={`${process.env.REACT_APP_YJ_DAPP}/profile/${profile.owner}`}
              target="blank"
            >
              <ButtonLeftIconWrapper>
                <IconArrowUp color={palette.success.main} />
              </ButtonLeftIconWrapper>
              Impact Reputation
              <ButtonRightIconWrapper>
                <IconArrowDown color={palette.danger.main} />
              </ButtonRightIconWrapper>
            </Button>
          </ProfileWrapper>
        </div>
      )}
    </Wrapper>
  );
}
