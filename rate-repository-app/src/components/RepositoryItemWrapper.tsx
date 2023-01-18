import { Pressable } from "react-native";
import { useNavigate } from "react-router-native";

interface RepositoryItemWrapperProps {
  id: string;
  children: React.ReactNode;
}

function RepositoryItemWrapper({ id, children }: RepositoryItemWrapperProps) {
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

export default RepositoryItemWrapper;
