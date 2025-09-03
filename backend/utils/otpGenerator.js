export default function otpGenerator() {
  const otp = (Math.floor(Math.random() * 90000) + 10000).toString();

  return otp;
}
