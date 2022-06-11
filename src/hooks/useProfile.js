import Profile from '../classes/Profile';
import useSubgraph from './useSubgraph';

/**
 * Hook for work with profiles.
 */
export default function useProfile() {
  const { findAvatarNftEntities } = useSubgraph();

  /**
   * Get profile.
   *
   * @param {string} owner Address of owner account.
   * @returns {Promise.<Profile>} A profile or null if profile is not found.
   */
  let getProfile = async function (owner) {
    if (!owner) {
      return null;
    }
    const avatarNftEntities = await findAvatarNftEntities([owner], 1);
    return avatarNftEntities?.length > 0
      ? createProfileObject(avatarNftEntities[0])
      : null;
  };

  return {
    getProfile,
  };
}

/**
 * Convert avatar nft entity to profile object.
 *
 * @param {object} profileEntity Avatar nft entity.
 * @returns Profile object.
 */
function createProfileObject(avatarNftEntity) {
  return new Profile(
    avatarNftEntity.id,
    avatarNftEntity.owner,
    avatarNftEntity.uri,
    avatarNftEntity.uriData,
    avatarNftEntity.uriImage,
    avatarNftEntity.uriFirstName,
    avatarNftEntity.uriLastName,
    avatarNftEntity.totalNegativeRating,
    avatarNftEntity.totalPositiveRating,
  );
}
