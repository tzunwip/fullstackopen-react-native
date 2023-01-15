import { Pressable } from "react-native";
import { useNavigate } from "react-router-native";

import { useFragment } from "../__generated__";
import { RepositoryItemFragment } from "../graphql/fragments";
import { RepositoryItemProps } from "./RepositoryItem";

interface RepositoryListItemWrapperProps {
  item: RepositoryItemProps["item"];
  children: React.ReactNode;
}

function RepositoryListItemWrapper({
  item,
  children,
}: RepositoryListItemWrapperProps) {
  const navigate = useNavigate();
  const repository = useFragment(RepositoryItemFragment, item);

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => navigate(`/repository/${repository.id}`)}
    >
      {children}
    </Pressable>
  );
}

export default RepositoryListItemWrapper;
