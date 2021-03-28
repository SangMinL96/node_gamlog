// export const isTokenCheck = (request)=>{
// if(!request.id){
//     return res.status(401).json({
//         message: 'Login is needed',
//     });
// }
// }
import passport from "passport";
// authenticateJWT
module.exports.isTokenCheck = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
//    if(true){
//     return res.status(401).json({
//       message: 'Login is needed'
//     });
//    }
    // if (user) {
    //   req.user = user;
    // }
    next();
  })(req, res, next);