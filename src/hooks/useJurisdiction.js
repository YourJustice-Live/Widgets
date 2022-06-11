import Jurisdiction from '../classes/Jurisdiction';
import useSubgraph from './useSubgraph';

/**
 * Hook for work with jurisdictions.
 */
export default function useJurisdiction() {
  const { findJurisdictionEntities } = useSubgraph();

  /**
   * Get jurisdiction.
   *
   * @param {*} id Jurisdiction id (address).
   * @returns {Promise.<Jurisdiction>} A jurisdiction or null if jurisdiction is not found.
   */
  let getJurisdiction = async function (id) {
    if (!id) {
      return null;
    }
    const jurisdictionEntities = await findJurisdictionEntities([id], 1);
    return jurisdictionEntities?.length > 0
      ? createJurisdictionObject(jurisdictionEntities[0])
      : null;
  };

  return {
    getJurisdiction,
  };
}

/**
 * Convert jurisdiction entity to jurisdiction object.
 *
 * @param {object} jurisdictionEntity Jurisdiction entity.
 * @returns Jurisdiction object.
 */
function createJurisdictionObject(jurisdictionEntity) {
  return new Jurisdiction(jurisdictionEntity.id, jurisdictionEntity.name);
}
