import { useHeaderHeight } from "@react-navigation/elements";
import { Stack, useRouter } from "expo-router";
import React, { useContext } from "react";
import { SafeAreaView, View } from "react-native";
import { Channel, MessageInput, MessageList } from "stream-chat-expo";
import { AuthProgressLoader } from "../../../components/AuthProgressLoader";
import { AppContext } from "../../../context/AppContext";

export default function ChannelScreen() {
  const router = useRouter();
  const { setThread, channel, thread } = useContext(AppContext);
  const headerHeight = useHeaderHeight();

  if (!channel) {
    return <AuthProgressLoader />;
  }

  return (
    <SafeAreaView>
      <Stack.Screen options={{ title: "Channel Screen" }} />
      {channel && (
        <Channel
          audioRecordingEnabled={true}
          channel={channel}
          keyboardVerticalOffset={headerHeight}
          thread={thread}
        >
          <View style={{ flex: 1 }}>
            <MessageList
              onThreadSelect={(thread) => {
                setThread(thread);
                if (thread) {
                  router.push(`/channel/${channel.cid}/thread/${thread.cid}`);
                }
              }}
            />
            <MessageInput />
          </View>
        </Channel>
      )}
    </SafeAreaView>
  );
}
