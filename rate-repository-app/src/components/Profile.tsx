import { StyleSheet, View } from "react-native";
import { PrimaryText, SecondaryText } from "./Text";
import Tag from "./Tag";
import { Repository } from "./RepositoryList";

interface ProfileProps {
  item: Repository;
}

const profileStyles = StyleSheet.create({
  fullname: {
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
});

function Profile({ item }: ProfileProps) {
  return (
    <>
      <PrimaryText style={profileStyles.fullname}>{item.fullName}</PrimaryText>
      <SecondaryText style={profileStyles.description}>
        {item.description}
      </SecondaryText>
      <View>
        <Tag>{item.language}</Tag>
      </View>
    </>
  );
}

export default Profile;
