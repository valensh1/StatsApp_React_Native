interface AppConstants {
  minimumPasswordCharacters: number;
  signupRoles: { label: string; value: string }[];
}

const AppConstants: AppConstants = Object.freeze({
  minimumPasswordCharacters: 7,
  signupRoles: [
    { label: 'Coach', value: 'Coach' },
    { label: 'Parent', value: 'Parent' },
    { label: 'Player', value: 'Player' },
    { label: 'Referee', value: 'Referee' },
    { label: 'Scout', value: 'Scout' },
    { label: 'Team Manager', value: 'Team Manager' },
  ],
});
export default AppConstants;
