export const getFormattedGMTOffset = () => {
  const date = new Date();
  const offset = date.getTimezoneOffset() / -60;
  return offset < 0 ? `- ${offset * -1}` : `+ ${offset}`;
};
