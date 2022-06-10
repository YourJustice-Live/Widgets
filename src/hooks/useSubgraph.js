import axios from "axios";

/**
 * Hook to work with subgraph.
 */
export default function useSubgraph() {

  /**
   * Find the avatar nft entities.
   * 
   * @param {Array.<string>} owners List with addresses of avatar nft owners.
   * @param {number} first The number of entities to get.
   * @param {*} skip The number of entities to skip.
   * @returns {Promise.<Array.<{object}>>} Entitites.
   */
  let findAvatarNftEntities = async function (
    owners,
    first = 10,
    skip = 0
  ) {
    const fixedOwners = owners
      ? owners.map((owner) => owner.toLowerCase())
      : null;
    const response = await makeSubgraphQuery(
      getFindAvatarNftEntitiesQuery(
        fixedOwners,
        first,
        skip,
      ),
    );
    return response.avatarNftEntities;
  };

  return {
    findAvatarNftEntities,
  }
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

function getFindAvatarNftEntitiesQuery(
  owners,
  first,
  skip,
) {
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