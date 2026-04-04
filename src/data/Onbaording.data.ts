import { color } from "@/constant/Color";
import { locale } from "@/constant/Strings";

import Onboarding1 from "../../assets/Images/Onboarding1.svg";
import Onboarding2 from "../../assets/Images/Onboarding2.svg";
import Onboarding3 from "../../assets/Images/Onboarding3.svg";

import Google from "../../assets/Icons/Google.svg";
import Apple from "../../assets/Icons/Apple.svg";
import Facebook from "../../assets/Icons/Facebook.svg";

export const data = {
  onboarding: [
    {
      id: 1,
      foregroundImage: Onboarding1,
      backgroundColor: color.onBoarding.color1,
      ctaButtonBgColor: color.onBoarding.color1,
      slideTitle: locale.onBoarding.title1,
      slideSubTitle: locale.onBoarding.subtitle1,
    },
    {
      id: 2,
      foregroundImage: Onboarding2,
      backgroundColor: color.onBoarding.color2,
      ctaButtonBgColor: color.onBoarding.color2,
      slideTitle: locale.onBoarding.title2,
      slideSubTitle: locale.onBoarding.subtitle2,
    },
    {
      id: 3,
      foregroundImage: Onboarding3,
      backgroundColor: color.onBoarding.color3,
      ctaButtonBgColor: color.onBoarding.color3,
      slideTitle: locale.onBoarding.title3,
      slideSubTitle: locale.onBoarding.subtitle3,
    },
  ],

  socialMediaAuthOptions: [
    { id: 1, svg: Google },
    { id: 2, svg: Apple },
    { id: 3, svg: Facebook },
  ],
};
