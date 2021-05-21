//get current local time in milliseconds
const CurrTimeInMillis = () => {
  let utcDate = new Date();
  let localDate = new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000);
  let localDateInMillis = localDate.getTime();
  let d = new Date(localDateInMillis)
  console.log("current datetime: ", new Date())
  return localDateInMillis;
};

export { CurrTimeInMillis };
