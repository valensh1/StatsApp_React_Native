class HelperFunctions {
  static capitalizeFirstLetter = (word: string) => {
    return `${word[0].toUpperCase()}${word.slice(1)}`;
  };
  static formatDateMMDDYYYY = (date: string | Date): string => {
    const parsedDate = typeof date === 'string' ? new Date(date) : date;
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
    const dateOfMonth = parsedDate.getDate().toString().padStart(2, '0');
    const year = parsedDate.getFullYear();
    return `${month}/${dateOfMonth}/${year}`;
  };
}
export default HelperFunctions;

console.log(HelperFunctions.formatDateMMDDYYYY('Sun May 08 2025'));
