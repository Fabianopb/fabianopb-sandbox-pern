import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { sign } from 'jsonwebtoken';
import { database } from '../database';
import { PORTFOLIO_USERS } from './collections';
import passport from 'passport';

const tokenSecretOrKey = process.env.JWT_SECRET_OR_KEY;

type User = {
  _id?: string;
  username: string;
  password: string;
};

export const generateJwt = (user: User) => {
  if (!tokenSecretOrKey) {
    throw new Error('JWT_SECRET_OR_KEY is not defined in the environment');
  }

  const token = sign({ user }, tokenSecretOrKey, { expiresIn: '7 days' });
  return token;
};

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: tokenSecretOrKey,
};
passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const collection = database.collection<User>(PORTFOLIO_USERS);
      const user = await collection.findOne({ id: payload.sub });
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport.authenticate('jwt', { session: false });
