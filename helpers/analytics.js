import ExpoMixpanelAnalytics from 'expo-mixpanel-analytics';
import { MIXPANEL_TOKEN } from '../config';

const analytics = new ExpoMixpanelAnalytics(MIXPANEL_TOKEN);

export const track = (eventName, properties) => {
  if (__DEV__ === false) {
    analytics.track(eventName, properties);
  }
}
