import { Pressable } from "react-native";
import { useNavigate } from "react-router-native";

interface RepositoryListItemWrapperProps {
  id: string;
  children: React.ReactNode;
}

function RepositoryListItemWrapper({
  id,
  children,
}: RepositoryListItemWrapperProps) {
  const navigate = useNavigate();

  return (
    <Pressable
      accessibilityRole="button"
      onPress={() => navigate(`/repository/${id}`)}
    >
      {children}
    </Pressable>
  );
}

export default RepositoryListItemWrapper;
