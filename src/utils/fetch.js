import {
    ApolloClient,
    InMemoryCache,
    gql
} from "@apollo/client";

const cache = new InMemoryCache({
    typePolicies: {
      UnconventionalRootQuery: {
        queryType: true,
      },
    },
});

function getSearchQuery(searchContent) {
    return gql`
      {
          searchMovies(query: "${searchContent}") {
              id
              name
              overview
              releaseDate
              poster {
                  small
                }
              score
              genres {
                  name
                }
          }
      }`
}

export default async function searchMovie(searchContent) {
    try {
      const query = getSearchQuery(searchContent)
      const client = new ApolloClient({
          uri: 'https://tmdb.sandbox.zoosh.ie/dev/graphql',
          cache,
      });
      const resultFromCache = cache.readQuery({ query });
      if (resultFromCache) return resultFromCache.searchMovies;

      const result = await client.query({ query });
      return result.data.searchMovies;
    } catch (error) {
      console.log(error);
    }
}

export async function getWikiPediaDetails(movieTitle) {
    try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=description|categories&titles=${movieTitle}&formatversion=2`;
        const result = await fetch(url);
        const data = await result.json();
        return data.query.pages[0].missing
            ? null
            : data.query.pages[0];
    } catch (error) {
        console.log(error);
    }
}


