import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import jwt from "jsonwebtoken";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  
};

const verifyUser = async (payload, done) => {
  try {
  
    if (payload !== null) {
      return done(null, payload);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};
export const generateToken = id => jwt.sign({ id }, process.env.JWT_SECRET,{expiresIn:"15m"});
export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false,failureMessage:true }, (err, user,info) => {
    // console.log("유저",user)

    if(info?.name ==="TokenExpiredError" || info?.name === "JsonWebTokenError"){
      return res.status(401).json({
          message: 'Login is needed'
        });
    }
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
  passport.use(new Strategy(jwtOptions, verifyUser));
  passport.initialize();