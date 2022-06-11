import axios from 'axios';

/**
 * Hook to work with subgraph.
 */
export default function useSubgraph() {
  /**
   * Find avatar nft entities.
   *
   * @param {Array.<string>} owners List with addresses of avatar nft owners.
   * @param {number} first Number of entities to get.
   * @param {*} skip Number of entities to skip.
   * @returns {Promise.<Array.<{object}>>} Entitites.
   */
  let findAvatarNftEntities = async function (owners, first = 10, skip = 0) {
    const fixedOwners = owners
      ? owners.map((owner) => owner.toLowerCase())
      : null;
    const response = await makeSubgraphQuery(
      getFindAvatarNftEntitiesQuery(fixedOwners, first, skip),
    );
    return response.avatarNftEntities;
  };

  /**
   * Find jurisdiction entities
   *
   * @param {*} ids List with jurisdiction ids (addresses).
   * @param {*} first Number of entities to get.
   * @param {*} skip Number of entities to skip.
   * @returns {Promise.<Array.<{object}>>} Entitites.
   */
  let findJurisdictionEntities = async function (ids, first = 10, skip = 0) {
    const fixedIds = ids ? ids.map((id) => id.toLowerCase()) : null;
    const response = await makeSubgraphQuery(
      getFindJurisdictionEntitiesQuery(fixedIds, first, skip),
    );
    return response.jurisdictionEntities;
  };

  return {
    findAvatarNftEntities,
    findJurisdictionEntities,
  };
}

async function makeSubgraphQuery(query) {
  try {
    const response = await axios.post(process.env.REACT_APP_SUBGRAPH_API, {
      query: query,
    });
    if (response.data.errors) {
      throw new Error(
        `Error making subgraph query: ${JSON.stringify(response.data.errors)}`,
      );
    }
    return response.data.data;
  } catch (error) {
    throw new Error(
      `Could not query the subgraph: ${JSON.stringify(error.message)}`,
    );
  }
}

function getFindAvatarNftEntitiesQuery(owners, first, skip) {
  let ownersFilter = owners ? `owner_in: ["${owners.join('","')}"]` : '';
  let filterParams = `where: {${ownersFilter}}`;
  let sortParams = `orderBy: totalPositiveRating, orderDirection: desc`;
  let paginationParams = `first: ${first}, skip: ${skip}`;
  return `{
      avatarNftEntities(${filterParams}, ${sortParams}, ${paginationParams}) {
        id
        owner
        uri
        uriData
        uriImage
        uriFirstName
        uriLastName
        totalNegativeRating
        totalPositiveRating
      }
    }`;
}

function getFindJurisdictionEntitiesQuery(ids, first, skip) {
  let idsFilter = ids ? `id_in: ["${ids.join('","')}"]` : '';
  let filterParams = `where: {${idsFilter}}`;
  let sortParams = `orderBy: memberAccountsCount, orderDirection: desc`;
  let paginationParams = `first: ${first}, skip: ${skip}`;
  return `{
    jurisdictionEntities(${filterParams}, ${sortParams}, ${paginationParams}) {
      id
      name
    }
  }`;
}
