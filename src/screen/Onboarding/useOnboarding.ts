import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ViewToken,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { data } from "@/data/Onbaording.data";
import { RootStackNavigationProp } from "@/navigation/types";
import { useStore } from "@/store/StoreProvider";
import { NotificationService } from "@/service/NotificationService";

const { width } = Dimensions.get("window");

export const useOnboarding = () => {
  const navigation = useNavigation<RootStackNavigationProp>();
  const { onboardingStore } = useStore();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const scrollOffsetRef = useRef(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchToken = async () => {
      const token = await NotificationService.getDeviceToken();
      if (token) {
        onboardingStore.setDeviceToken(token);
      }
    };
    fetchToken();
  }, [onboardingStore]);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const scrollToNext = () => {
    if (activeIndex < data.onboarding.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex + 1,
        animated: true,
      });
    } else {
      onboardingStore.completeOnboarding();
      navigation.navigate("Login");
    }
  };

  const onScrollBeginDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollOffsetRef.current = e.nativeEvent.contentOffset.x;
  };

  const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newOffset = e.nativeEvent.contentOffset.x;
    if (newOffset < scrollOffsetRef.current) {
      flatListRef.current?.scrollToIndex({
        index: activeIndex,
        animated: true,
      });
    }
  };

  const backgroundColor = scrollX.interpolate({
    inputRange: data.onboarding.map((_, i) => i * width),
    outputRange: data.onboarding.map((item) => item.backgroundColor),
    extrapolate: "clamp",
  });

  const ctaBackgroundColor = scrollX.interpolate({
    inputRange: data.onboarding.map((_, i) => i * width),
    outputRange: data.onboarding.map((item) => item.ctaButtonBgColor),
    extrapolate: "clamp",
  });

  return {
    activeIndex,
    flatListRef,
    scrollX,
    onViewableItemsChanged,
    viewabilityConfig,
    scrollToNext,
    onScrollBeginDrag,
    onScrollEndDrag,
    backgroundColor,
    ctaBackgroundColor,
    activeItem: data.onboarding[activeIndex],
  };
};
