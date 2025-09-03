import jwt from "jsonwebtoken";

const cookieOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 1, // 1 days in milliseconds
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
};

export function generateTokenAndSetCookie(userId, res) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, cookieOptions);
}

export function clearTokenCookie(res) {
  const clearOptions = { ...cookieOptions };
  delete clearOptions.maxAge;

  res.clearCookie("token", clearOptions);
}
