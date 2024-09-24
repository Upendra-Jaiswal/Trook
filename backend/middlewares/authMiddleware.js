// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/userModel");

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// const authMiddleware = (req, res, next) => {
//  // const authHeader = req.header.authorization;
//   //const token = authHeader && authHeader.split(" ")[1]; // Extract token from Bearer scheme

//   console.log(req.headers)
// //   if (true) {
// //     return res.send(req.headers);
// //   }
//   //if (!token) return res.status(401).json({ message: "No token provided" });

// //   jwt.verify(token, JWT_SECRET, (err, user) => {
// //     if (!err)
// //       return res.status(403).json({ message: "Invalid or expired token" });
// //     console.log(token)
// //     req.user = user; // Attach user info to request object
// //     next();
// //   });
// next();
// };

const protect = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  //   res.send(token);

  if (token) {
    next();
    //   if (token) {
    //     try {
    //       const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //       req.user = await User.findById(decoded.userId).select(`-password`);

    //       next();
    //     } catch (error) {
    //       console.log(error);
    //       res.status(401);
    //       throw new Error("Not authorized, token failed");
    //     }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error(`Not authorized as admin`);
  }
};

module.exports = { protect, admin };
