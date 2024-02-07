export const convertToDateAgo = (dateIso) => {
  if (!dateIso) {
    return "";
  }
  //Get difference between dates
  let currentDate = new Date();
  let dateToConvert = new Date(dateIso);
  let difference = currentDate.getTime() - dateToConvert.getTime();
  let absoluteDifference = Math.abs(difference);

  //Get amounts by time
  let seconds = Math.floor(absoluteDifference / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  let days = Math.floor(hours / 24);
  let months = Math.floor(days / 30);
  let years = Math.floor(days / 365);

  //Returns depending on amounts of time
  if (years > 0) return `hace ${years} año${years === 1 ? "" : "s"}`;
  if (months > 0) return `hace ${months} mes${months === 1 ? "" : "es"}`;
  if (days > 0) return `hace ${days} día${days === 1 ? "" : "s"}`;
  if (hours > 0) return `hace ${hours} hora${hours === 1 ? "" : "s"}`;
  if (minutes > 0) return `hace ${minutes} minuto${minutes === 1 ? "" : "s"}`;
  return `hace unos segundos`;
};

export const convertToShortDate = (dateIso) => {
  if (!dateIso) {
    return "";
  }

  // Obtener los componentes de la fecha
  let dateToConvert = new Date(dateIso);
  var day = dateToConvert.getDate();
  var month = dateToConvert.getMonth() + 1;
  var year = dateToConvert.getFullYear();

  // Formatear la fecha en el orden día/mes/año
  var formatDate = day + "/" + month + "/" + year;

  return formatDate;
};
