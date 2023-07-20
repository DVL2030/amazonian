import jwt from "jsonwebtoken";
// const moment = require('moment');

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || "wowSuper!@$#$Secret",
    {
      expiresIn: "30d",
    }
  );
};

export const isAuth = (req, res, next) => {
  const auth = req.headers.authorization;

  if (auth) {
    const token = auth.split(" ")[1];
    jwt.verify(
      token,
      process.env.JWT_SECRET || "wowSuper!@$#$Secret",
      (err, decode) => {
        if (err) {
          //Token invalid
          return res.status(401).send({ message: "Invalid Token." });
        } else {
          req.user = decode;
          next();
        }
      }
    );
  } else {
    return res.status(401).send({ message: "Not logged in." });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res
      .status(401)
      .send({ message: "Invalid: You do not have access." });
  }
};

export const minifyHtml = (html) => {
  // minify html by removing all extra spaces new lines, and script tags.
  const minified = html.replace(/\s+/g, "").replace(/\n/g, "");
  return minified;
};
