import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { findUserById } from "../services/user";



passport.use(
  new Strategy(
    {
        secretOrKey: process.env.JWT_SECRET || "etertetrtw",
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    
    async (payload, done) => {
      const { _id } = payload;
      console.log(payload);
      const user = await findUserById(_id);
      console.log(user);
      
      if (!user) {
        return done({ message: "User does not exist on database" });
      }
      done(null, user);
    }
  )
);

export default passport.authenticate("jwt", { session: false });
