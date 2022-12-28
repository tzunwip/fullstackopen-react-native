import { MockedProvider } from "@apollo/client/testing";
import {
  getDefaultNormalizer,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react-native";

import { GET_REPOSITORIES } from "../../graphql/queries";
import RepositoryList from "../RepositoryList";

const mockData = {
  __typename: "Query",
  repositories: {
    __typename: "RepositoryConnection",
    edges: [
      {
        __typename: "RepositoryEdge",
        node: {
          __typename: "Repository",
          id: "jaredpalmer.formik",
          fullName: "jaredpalmer/formik",
          description: "Build forms in React, without the tears 😭 ",
          language: "TypeScript",
          forksCount: 2634,
          stargazersCount: 31699,
          ratingAverage: 90,
          reviewCount: 5,
          ownerAvatarUrl: "https://avatars.githubusercontent.com/u/4060187?v=4",
        },
      },
      {
        __typename: "RepositoryEdge",
        node: {
          __typename: "Repository",
          id: "async-library.react-async",
          fullName: "async-library/react-async",
          description: "🍾 Flexible promise-based React data loader",
          language: "JavaScript",
          forksCount: 93,
          stargazersCount: 2104,
          ratingAverage: 72,
          reviewCount: 3,
          ownerAvatarUrl:
            "https://avatars.githubusercontent.com/u/54310907?v=4",
        },
      },
      {
        __typename: "RepositoryEdge",
        node: {
          __typename: "Repository",
          id: "rzwitserloot.lombok",
          fullName: "rzwitserloot/lombok",
          description: "Very spicy additions to the Java programming language.",
          language: "Java",
          forksCount: 2196,
          stargazersCount: 11678,
          ratingAverage: 0,
          reviewCount: 0,
          ownerAvatarUrl:
            "https://avatars.githubusercontent.com/u/45949248?v=4",
        },
      },
      {
        __typename: "RepositoryEdge",
        node: {
          __typename: "Repository",
          id: "rails.rails",
          fullName: "rails/rails",
          description: "Ruby on Rails",
          language: "Ruby",
          forksCount: 20839,
          stargazersCount: 51994,
          ratingAverage: 100,
          reviewCount: 2,
          ownerAvatarUrl: "https://avatars.githubusercontent.com/u/4223?v=4",
        },
      },
      {
        __typename: "RepositoryEdge",
        node: {
          __typename: "Repository",
          id: "django.django",
          fullName: "django/django",
          description: "The Web framework for perfectionists with deadlines.",
          language: "Python",
          forksCount: 28366,
          stargazersCount: 67871,
          ratingAverage: 73,
          reviewCount: 2,
          ownerAvatarUrl: "https://avatars.githubusercontent.com/u/27804?v=4",
        },
      },
      {
        __typename: "RepositoryEdge",
        node: {
          __typename: "Repository",
          id: "apollographql.apollo-client",
          fullName: "apollographql/apollo-client",
          description:
            ":rocket:  A fully-featured, production ready caching GraphQL client for every UI framework and GraphQL server.",
          language: "TypeScript",
          forksCount: 2513,
          stargazersCount: 18330,
          ratingAverage: 0,
          reviewCount: 0,
          ownerAvatarUrl:
            "https://avatars.githubusercontent.com/u/17189275?v=4",
        },
      },
      {
        __typename: "RepositoryEdge",
        node: {
          __typename: "Repository",
          id: "reduxjs.redux",
          fullName: "reduxjs/redux",
          description: "Predictable state container for JavaScript apps",
          language: "TypeScript",
          forksCount: 15348,
          stargazersCount: 59045,
          ratingAverage: 0,
          reviewCount: 0,
          ownerAvatarUrl:
            "https://avatars.githubusercontent.com/u/13142323?v=4",
        },
      },
      {
        __typename: "RepositoryEdge",
        node: {
          __typename: "Repository",
          id: "spring-projects.spring-framework",
          fullName: "spring-projects/spring-framework",
          description: "Spring Framework",
          language: "Java",
          forksCount: 35245,
          stargazersCount: 50254,
          ratingAverage: 0,
          reviewCount: 0,
          ownerAvatarUrl: "https://avatars.githubusercontent.com/u/317776?v=4",
        },
      },
      {
        __typename: "RepositoryEdge",
        node: {
          __typename: "Repository",
          id: "zeit.next.js",
          fullName: "zeit/next.js",
          description: "The React Framework",
          language: "JavaScript",
          forksCount: 21791,
          stargazersCount: 98222,
          ratingAverage: 0,
          reviewCount: 0,
          ownerAvatarUrl:
            "https://avatars.githubusercontent.com/u/14985020?v=4",
        },
      },
      {
        __typename: "RepositoryEdge",
        node: {
          __typename: "Repository",
          id: "zeit.swr",
          fullName: "zeit/swr",
          description: "React Hooks for Data Fetching",
          language: "TypeScript",
          forksCount: 989,
          stargazersCount: 25124,
          ratingAverage: 0,
          reviewCount: 0,
          ownerAvatarUrl:
            "https://avatars.githubusercontent.com/u/14985020?v=4",
        },
      },
    ],
  },
};

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", async () => {
      const mocks = [
        {
          request: {
            query: GET_REPOSITORIES,
            variables: {},
          },
          result: {
            data: mockData,
          },
        },
      ];

      render(
        <MockedProvider mocks={mocks} addTypename>
          <RepositoryList />
        </MockedProvider>
      );

      expect(await screen.getByText("loading", { exact: false })).toBeDefined();
      const repositoryItems = await screen.findAllByTestId("repository-item");

      expect(repositoryItems).toHaveLength(mockData.repositories.edges.length);

      repositoryItems.forEach((repositoryItem, index) => {
        const repositoryData = mockData.repositories.edges[index];
        const {
          fullName,
          description,
          language,
          forksCount,
          stargazersCount,
          ratingAverage,
          reviewCount,
        } = repositoryData.node;

        function countText(count: number) {
          return count === 0
            ? "N/A"
            : Intl.NumberFormat("en", { notation: "compact" })
                .format(count)
                .toString();
        }
        const starsElement = within(repositoryItem).getByTestId(
          "repository-item-stars"
        );
        const forksElement = within(repositoryItem).getByTestId(
          "repository-item-forks"
        );
        const reviewsElement = within(repositoryItem).getByTestId(
          "repository-item-reviews"
        );
        const ratingElement = within(repositoryItem).getByTestId(
          "repository-item-rating"
        );

        expect(within(repositoryItem).getByText(fullName)).toBeDefined();
        expect(within(repositoryItem).getByText(description)).toBeDefined();
        expect(within(repositoryItem).getByText(language)).toBeDefined();
        expect(
          within(starsElement).getByText(countText(stargazersCount))
        ).toBeDefined();
        expect(
          within(forksElement).getByText(countText(forksCount))
        ).toBeDefined();
        expect(
          within(reviewsElement).getByText(countText(reviewCount))
        ).toBeDefined();
        expect(
          within(ratingElement).getByText(countText(ratingAverage))
        ).toBeDefined();
      });
    });
  });
});
