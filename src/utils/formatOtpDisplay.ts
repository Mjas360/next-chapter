export const formatOtpDisplay = (val = '') =>
  val.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
