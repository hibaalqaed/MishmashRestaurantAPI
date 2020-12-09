const bcrypt = require("bcrypt");
const { User } = require("../db/models");

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;

const { JWT_SECRET } = require("../config/keys");

const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ where: { username: username } });
    // I do 2 validations: I check if the user exists, if yes I compare the passwords,
    // if they're equal I return true, else I return false.
    const userAuthentication = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (userAuthentication) return done(null, user);
    else return done(null, false);
    // Else throw an error
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false); // this will throw a 401
    }
    try {
      const user = await User.findByPk(jwtPayload.id);
      done(null, user); // if there is no user, this will throw a 401
    } catch (error) {
      done(error);
    }
  }
);
