import { SecureStore } from 'expo';
import jwtDecoder from 'jwt-decode';
import Keys from '../constants/Keys';

export const getUser = () => {
  return SecureStore.getItemAsync(Keys.TOKEN_KEY)
      .then((token) => {
        const decodedToken = jwtDecoder(token);
        console.log(decodedToken);
        const uid = decodedToken.sub;
        const email = decodedToken.email;
        return { uid, email };
      });
}
