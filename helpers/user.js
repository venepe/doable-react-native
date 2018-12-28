import { SecureStore } from 'expo';
import uuid from 'react-native-uuid';
const UID_KEY = 'UID_KEY'
let genUid = uuid.v4();
export const getUID = () => {
  return SecureStore.getItemAsync(UID_KEY)
      .then((uid) => {
        console.log(uid);
        if (!uid) {
          uid = genUid;
          SecureStore.setItemAsync(UID_KEY, uid)
        }
        return uid;
      });
}
