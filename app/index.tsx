import { Stack, useRouter } from "expo-router";
import { useContext, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ChannelSort } from "stream-chat";
import { ChannelList } from "stream-chat-expo";
import { user } from "../constants";
import { AppContext } from "../context/AppContext";

const filters = {
  members: { $in: [user.id] },
  type: "messaging",
};
const sort: ChannelSort = { last_updated: -1 };
const options = {
  state: true,
  watch: true,
};

export default function ChannelListScreen() {
  const memoizedFilters = useMemo(() => filters, []);
  const router = useRouter();
  const { setChannel } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Channel List Screen" }} />
      <ChannelList
        filters={memoizedFilters}
        onSelect={(channel) => {
          setChannel(channel);
          router.push(`/channel/${channel.cid}`);
        }}
        options={options}
        sort={sort}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
