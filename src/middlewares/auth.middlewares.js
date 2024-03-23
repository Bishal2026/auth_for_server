import jwt from "jsonwebtoken";

const Auth = (req, res, next) => {
  const token = (req.cookies && req.cookies.token) || null;
  if (!token) {
    return res.status(400).json({
      sccuess: false,
      messsage: "Not authorized",
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decode.id, email: decode.email };
  } catch (e) {
    return res.status(400).json({
      sccuess: false,
      messsage: e.messsage,
    });
  }

  next();
};

export default Auth;
