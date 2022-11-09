import { Text } from "react-native";
import { Repository } from "./RepositoryList";

interface RepositoryItemProps {
  item: Repository;
}

export default function RepositoryItem(props: RepositoryItemProps) {
  const { item } = props;

  return (
    <>
      <Text>
        {`Full Name: ${item.fullName}\n`}
        {`Description: ${item.description}\n`}
        {`Language: ${item.language}\n`}
        {`Stars: ${item.stargazersCount}\n`}
        {`Forks: ${item.forksCount}\n`}
        {`Reviews: ${item.reviewCount}\n`}
        {`Rating: ${item.ratingAverage}`}
      </Text>
    </>
  );
}
