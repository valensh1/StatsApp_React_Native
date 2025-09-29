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
  TeamAgeGroups: [
    { label: '5U', value: '5U' },
    { label: '6U', value: '6U' },
    { label: '7U', value: '7U' },
    { label: '8U', value: '8U' },
    { label: '9U', value: '9U' },
    { label: '10U', value: '10U' },
    { label: '11U', value: '11U' },
    { label: '12U', value: '12U' },
    { label: '13U', value: '13U' },
    { label: '14U', value: '14U' },
    { label: '15U', value: '15U' },
    { label: '16U', value: '16U' },
    { label: '17U', value: '17U' },
    { label: '18U', value: '18U' },
  ],
});
export default AppConstants;
