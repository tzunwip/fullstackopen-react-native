import { StyleSheet, View } from "react-native";
import { PrimaryText, SecondaryText } from "./Text";
import Tag from "./Tag";
import { RepositoryItemFragment } from "../__generated__/graphql";

type ProfileProps = Pick<
  RepositoryItemFragment,
  "fullName" | "description" | "language"
>;

const profileStyles = StyleSheet.create({
  fullname: {
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
});

function Profile({ fullName, description, language }: ProfileProps) {
  return (
    <>
      <PrimaryText style={profileStyles.fullname}>{fullName}</PrimaryText>
      <SecondaryText style={profileStyles.description}>
        {description}
      </SecondaryText>
      <View>
        <Tag>{language}</Tag>
      </View>
    </>
  );
}

export default Profile;
