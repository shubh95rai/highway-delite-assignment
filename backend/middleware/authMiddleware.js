import jwt from "jsonwebtoken";

async function protect(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.log("Error in protect middleware: ", error.message);

    res.status(401).json({ message: "Unauthorized - Invalid token" });
  }
}

export default protect;
