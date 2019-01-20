import { SecureStore } from 'expo';
import jwtDecoder from 'jwt-decode';
const TOKEN_KEY = 'TOKEN_KEY';
export const getUser = () => {
  return SecureStore.getItemAsync(TOKEN_KEY)
      .then((token) => {
        const decodedToken = jwtDecoder(token);
        console.log(decodedToken);
        const uid = decodedToken.sub;
        const email = decodedToken.email;
        return { uid, email };
      });
}
