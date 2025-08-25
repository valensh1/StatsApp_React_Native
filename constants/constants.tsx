interface AppConstants {
  minimumPasswordCharacters: number;
  signupRoles: { label: string; value: string }[];
}

const AppConstants: AppConstants = Object.freeze({
  minimumPasswordCharacters: 7,
  signupRoles: [
    { label: 'Coach', value: 'Coach' },
    { label: 'Scout', value: 'Scout' },
    { label: 'Referee', value: 'Referee' },
    { label: 'Parent', value: 'Parent' },
    { label: 'Player', value: 'Player' },
  ],
});
export default AppConstants;
