import jwt from "jsonwebtoken";
import User from "../models/User";

const auth = async (req, res, next) => {
  if (!req.header("Authorization")) {
    return res.status(401).send({ error: "Authorization token is required!" });
  }
  const token = req.header("Authorization").replace("Bearer ", "");

  try {
    const data = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ _id: data._id, "tokens.token": token });

    if (!user) {
      throw new Error("Not authorized to access this resource");
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};

export default auth;
