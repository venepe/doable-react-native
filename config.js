import { Platform } from 'react-native';

export const API_URL = Platform.OS === 'ios' ? 'http://192.168.0.12:3000/graphql' : 'http://10.0.2.2:3000/graphql';
// export const API_URL = 'http192.168.0.12:3000/graphql';
export const MIXPANEL_TOKEN = '45fc3ef9e83e7257b4a7115799ccbee1';
