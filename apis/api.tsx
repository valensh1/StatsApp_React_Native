import axios from 'axios';
import Constants from 'expo-constants';

const { GOOGLE_MAPS_API_KEY } = Constants.expoConfig?.extra || {};

class API {
  public static async getCityAPI(cityOrZip: string) {
    console.log(`This is the city being searched ---> ${cityOrZip}`);
    try {
      const response = await axios.post(
        `https://places.googleapis.com/v1/places:searchText`,
        {
          textQuery: cityOrZip,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': GOOGLE_MAPS_API_KEY,
            'X-Goog-FieldMask':
              'places.id,places.displayName,places.formattedAddress',
          },
        }
      );
      console.log(`This is the full response`, response.data.places[0]);
      console.log(
        `This is the place name: ${response.data.places[0].displayName.text}`
      );
      console.log(
        `This is the formatted address: ${response.data.places[0].formattedAddress}`
      );
      return {
        formattedName: response.data.places[0].displayName.text,
        formattedAddress: response.data.places[0].formattedAddress,
      };
    } catch (error: any) {
      console.log(
        `Unable to retrieve a city or place from the text entered. Try again!`
      );
    }
  }
}
export default API;
