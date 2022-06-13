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
  display: flex;
  flex-direction: ${(props) =>
    props.variant === 'vertical' ? 'column' : 'row'};
  align-items: ${(props) =>
    props.variant === 'vertical' ? 'none' : 'flex-end'};
  justify-content: space-between;
  background-color: ${(props) => props.backgroundColor || palette.background};
  font-family: 'Manrope', sans-serif;
`;

const Message = styled.div`
  flex: 1;
  text-align: center;
  font-weight: 500;
`;

const Brand = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.6em;
  font-weight: 600;
  color: ${(props) => props.secondaryTextColor || palette.text.secondary};
`;

const BrandLogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 4px;
`;

const ProfileWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Image = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 12px;
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
  color: ${(props) => props.primaryTextColor || palette.primary.main};
  font-weight: 700;
`;

const PositiveRating = styled.div`
  margin-left: 12px;
  color: ${(props) => props.positiveColor || palette.success.main};
  font-weight: 700;
`;

const NegativeRating = styled.div`
  margin-left: 12px;
  color: ${(props) => props.negativeColor || palette.danger.main};
  font-weight: 700;
`;

const JurisdictionLink = styled.a`
  text-decoration: none;
  font-size: 0.8em;
  font-weight: 600;
  color: ${(props) => props.secondaryTextColor || palette.text.secondary};
`;

const ButtonWrapper = styled.div`
  flex: ${(props) => (props.variant === 'vertical' ? 1 : 'none')};
  margin-top: ${(props) => (props.variant === 'vertical' ? '10px' : '0px')};
`;

const Button = styled.a`
  padding: 0px 16px;
  height: 36px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.buttonTextColor || palette.primary.main};
  background-color: ${(props) =>
    props.buttonBackgroundColor || palette.primary.light};
  text-decoration: none;
  font-weight: 500;
  &:hover {
    filter: brightness(85%);
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
  // Attributes
  const accountAttribute = domElement.getAttribute('account');
  const jurisdictionAttribute = domElement.getAttribute('jurisdiction');
  const variant = domElement.getAttribute('variant');
  const backgroundColor = domElement.getAttribute('backgroundColor');
  const primaryTextColor = domElement.getAttribute('primaryTextColor');
  const secondaryTextColor = domElement.getAttribute('secondaryTextColor');
  const buttonBackgroundColor = domElement.getAttribute(
    'buttonBackgroundColor',
  );
  const buttonTextColor = domElement.getAttribute('buttonTextColor');
  const positiveColor = domElement.getAttribute('positiveColor');
  const negativeColor = domElement.getAttribute('negativeColor');
  // Hooks
  const { getProfile } = useProfile();
  const { getJurisdiction } = useJurisdiction();
  // States
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
    <Wrapper variant={variant} backgroundColor={backgroundColor}>
      {isLoading && <Message>Loading profile...</Message>}
      {!isLoading && !profile && <Message>Profile not found</Message>}
      {!isLoading && profile && (
        <>
          <div>
            <Brand secondaryTextColor={secondaryTextColor}>
              POWERED BY
              <BrandLogoWrapper>
                <IconLogo
                  width="100px"
                  height="17px"
                  color={secondaryTextColor || palette.text.secondary}
                />
              </BrandLogoWrapper>
            </Brand>
            <ProfileWrapper>
              <Image src={profile.uriImage} />
              <DetailsWrapper>
                <NameRatingWrapper>
                  <NameLink
                    href={`${process.env.REACT_APP_YJ_DAPP}/profile/${profile.owner}`}
                    target="blank"
                    primaryTextColor={primaryTextColor}
                  >
                    {formatProfileFirstLastName(profile)}
                  </NameLink>
                  <PositiveRating positiveColor={positiveColor}>
                    +{profile.totalPositiveRating}
                  </PositiveRating>
                  <NegativeRating negativeColor={negativeColor}>
                    -{profile.totalNegativeRating}
                  </NegativeRating>
                </NameRatingWrapper>
                {jurisdiction && (
                  <JurisdictionLink
                    href={`${process.env.REACT_APP_YJ_DAPP}/jurisdiction/${jurisdiction.id}`}
                    target="blank"
                    secondaryTextColor={secondaryTextColor}
                  >
                    {jurisdiction.name}
                  </JurisdictionLink>
                )}
              </DetailsWrapper>
            </ProfileWrapper>
          </div>
          <ButtonWrapper variant={variant}>
            <Button
              href={`${process.env.REACT_APP_YJ_DAPP}/profile/${profile.owner}`}
              target="blank"
              buttonBackgroundColor={buttonBackgroundColor}
              buttonTextColor={buttonTextColor}
            >
              <ButtonLeftIconWrapper>
                <IconArrowUp color={positiveColor || palette.success.main} />
              </ButtonLeftIconWrapper>
              Impact Reputation
              <ButtonRightIconWrapper>
                <IconArrowDown color={negativeColor || palette.danger.main} />
              </ButtonRightIconWrapper>
            </Button>
          </ButtonWrapper>
        </>
      )}
    </Wrapper>
  );
}
