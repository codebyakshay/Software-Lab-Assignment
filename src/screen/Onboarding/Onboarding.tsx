import React from "react";
import { Animated, StyleSheet, View } from "react-native";
import { observer } from "mobx-react-lite";
import { data } from "@/data/Onbaording.data";
import { locale } from "@/constant/Strings";
import IllustrationContainer from "@/component/Molecule/IllustrationContainer/IllustrationContainer";
import OnboardingContentCard from "@/component/Molecule/OnboardingContentCard/OnboardingContentCard";
import ScreenWrapper from "@/component/Molecule/ScreenWrapper/ScreenWrapper";
import { useOnboarding } from "./useOnboarding";

const Onboarding = observer(() => {
  const {
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
    activeItem,
  } = useOnboarding();

  return (
    <ScreenWrapper style={{ backgroundColor }}>
      <View style={styles.illustrationArea}>
        <Animated.FlatList
          ref={flatListRef}
          data={data}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={({ id }) => id.toString()}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
          onScrollBeginDrag={onScrollBeginDrag}
          onScrollEndDrag={onScrollEndDrag}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false },
          )}
          scrollEventThrottle={16}
          renderItem={({ item }) => (
            <IllustrationContainer Svg={item.foregroundImage} />
          )}
        />
      </View>

      <OnboardingContentCard
        title={activeItem.slideTitle}
        subtitle={activeItem.slideSubTitle}
        totalSlides={data.length}
        activeIndex={activeIndex}
        ctaBtnTitle={locale.onBoarding.ctaBtnTitle}
        ctaBgColor={ctaBackgroundColor}
        secondaryBtnTitle={locale.onBoarding.secondaryBtnTitle}
        onCtaPress={scrollToNext}
      />
    </ScreenWrapper>
  );
});

export default Onboarding;

const styles = StyleSheet.create({
  illustrationArea: {
    flex: 1,
  },
});
