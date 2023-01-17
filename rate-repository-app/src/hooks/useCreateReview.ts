import { useMutation } from "@apollo/client";
import { FormikHelpers } from "formik";
import { useNavigate } from "react-router-native";

import { gql } from "../__generated__";
import { ReviewValues } from "../components/ReviewForm";

const CREATE_REVIEW = gql(/* GraphQL */ `
  mutation CreateReview(
    $ownerName: String!
    $repositoryName: String!
    $rating: Int!
    $text: String
  ) {
    createReview(
      review: {
        ownerName: $ownerName
        repositoryName: $repositoryName
        rating: $rating
        text: $text
      }
    ) {
      repositoryId
    }
  }
`);

function useCreateReview() {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  async function submitReview(
    values: ReviewValues,
    { setStatus }: FormikHelpers<ReviewValues>
  ) {
    try {
      const { data } = await createReview({ variables: values });
      const repositoryId = data?.createReview?.repositoryId;

      navigate(`/repository/${repositoryId}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setStatus({ errorMessage: err.message });
      }
    }
  }

  return [submitReview];
}

export default useCreateReview;
