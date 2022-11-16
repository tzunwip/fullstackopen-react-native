import { Text, StyleSheet, TextProps, View, Image } from "react-native";
import theme from "../theme";
import { Repository } from "./RepositoryList";

interface RepositoryItemProps {
  item: Repository;
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  image: {
    height: 50,
    width: 50,
    margin: 10,
    borderRadius: 2,
  },
  profile: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    margin: 10,
  },
  statLine: {
    display: "flex",
    flexDirection: "row",
    margin: 10,
  },
});

export default function RepositoryItem(props: RepositoryItemProps) {
  const { item } = props;

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
      </View>
      <View style={styles.profile}>
        <Profile item={item} />
      </View>
      <View style={styles.statLine}>
        <Stat label="Stars" value={item.stargazersCount} />
        <Stat label="Forks" value={item.forksCount} />
        <Stat label="Reviews" value={item.reviewCount} />
        <Stat label="Rating" value={item.ratingAverage} />
      </View>
    </View>
  );
}

function PrimaryText({ style, ...props }: TextProps) {
  const primaryTextStyles = [{ color: theme.colors.textPrimary }, style];
  return <Text style={primaryTextStyles} {...props} />;
}

function SecondaryText({ style, ...props }: TextProps) {
  const secondaryTextStyles = [{ color: theme.colors.textSecondary }, style];
  return <Text style={secondaryTextStyles} {...props} />;
}

const profileStyles = StyleSheet.create({
  fullname: {
    marginBottom: 5,
  },
  description: {
    marginBottom: 5,
  },
});

function Profile({ item }: RepositoryItemProps) {
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

const tagStyles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.viewSecondary,
    borderRadius: 5,
    paddingHorizontal: 5,
    paddingVertical: 3,
  },
  text: {
    color: theme.colors.viewSecondaryText,
  },
});

function Tag({ children, ...props }: TextProps) {
  return (
    <View style={tagStyles.container} {...props}>
      <Text style={tagStyles.text}>{children}</Text>
    </View>
  );
}

interface StatProps extends TextProps {
  label: string;
  value: number;
}

const statStyles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginHorizontal: 10,
  },
  textPrimary: {
    marginBottom: 5,
  },
});

function formatNumber(num: number) {
  return Intl.NumberFormat("en", { notation: "compact" }).format(num);
}

function Stat({ label, value }: StatProps) {
  return (
    <View style={statStyles.container}>
      <PrimaryText style={statStyles.textPrimary}>
        {formatNumber(value)}
      </PrimaryText>
      <SecondaryText>{label}</SecondaryText>
    </View>
  );
}
