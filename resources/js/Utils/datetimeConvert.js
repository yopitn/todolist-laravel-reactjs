const datetimeConvert = (datetime) => {
  const month = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Des"];

  return datetime.substring(8, 10) + " " + month[parseInt(datetime.substring(5, 7), 10) - 1] + " " + datetime.substring(0, 4);
};

export default datetimeConvert;
