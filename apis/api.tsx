import axios from 'axios';

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
            'X-Goog-Api-Key': 'AIzaSyDsQgSY4x_Y24lRuW6iPVuy1c8YnbNAcF4',
            'X-Goog-FieldMask':
              'places.id,places.displayName,places.formattedAddress',
          },
        }
      );
      console.log(`This is the full response`, response.data.places[0]);
      console.log(
        `This is the response: ${response.data.places[0].displayName.text}`
      );
      return response.data.places[0].formattedAddress;
    } catch (error: any) {
      console.log(`Unable to retrieve a city from the text entered.`);
    }
  }
}
export default API;
