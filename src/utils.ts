export const getFilterString = (array: Array<string>) => {
  const string = `OR( RECORD_ID() = '${array.join("', RECORD_ID() = '")}')`;
  return string;
};
