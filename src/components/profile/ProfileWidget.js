import { useEffect, useState } from 'react';
import useProfile from '../../hooks/useProfile';
import { styles } from '../../styles';
import { formatProfileFirstLastName } from '../../utils/formatters';

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
    <div style={styles.ProfileWidget}>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !profile && <p>Profile not found</p>}
      {!isLoading && profile && (
        <>
          <img
            src={profile.uriImage}
            alt="Profile"
            width="64px"
            height="64px"
          />
          <br />
          <span>{formatProfileFirstLastName(profile)}</span>
          <br />
          <span>+{profile.totalPositiveRating}</span>
          <br />
          <span>-{profile.totalNegativeRating}</span>
          <br />
          <a
            href={`${process.env.REACT_APP_YJ_DAPP}/profile/${profile.owner}`}
            target="blank"
          >
            <button>Change Reputation</button>
          </a>
          <br />
          <span style={{ fontSize: '0.7em' }}>POWER BY YOURJUSTICE</span>
        </>
      )}
    </div>
  );
}
