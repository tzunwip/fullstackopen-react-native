import { ApolloProvider } from "@apollo/client";
import { render, within, screen } from "@testing-library/react-native";

import { repositoryData as mockData } from "../../test/mocks/data";
import apolloClient from "../../utils/apolloClient";
import RepositoryList from "../RepositoryList";

describe("RepositoryList", () => {
  describe("RepositoryListContainer", () => {
    it("renders repository information correctly", async () => {
      render(
        <ApolloProvider client={apolloClient()}>
          <RepositoryList />
        </ApolloProvider>
      );

      expect(await screen.getByText("loading", { exact: false })).toBeDefined();
      const repositoryItems = await screen.findAllByTestId("repository-item");

      expect(repositoryItems).toHaveLength(mockData.repositories.edges.length);

      repositoryItems.forEach((repositoryItem, index) => {
        const repositoryData = mockData.repositories.edges[index].node;
        const {
          fullName,
          description,
          language,
          forksCount,
          stargazersCount,
          ratingAverage,
          reviewCount,
        } = repositoryData;

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
