const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const UserResponseDTO = require("../dto/UserResponseDTO");
const NotFoundException = require("../exceptions/NotFoundException");

class AuthService {
  constructor(usersRepository, usersService, constants) {
    this.usersService = usersService;
    this.usersRepository = usersRepository;
    this.constants = constants;
    this.init();
  }

  init = () => {
    passport.serializeUser(this.serializeUser);
    passport.deserializeUser(this.deserializeUser);
    passport.use("local", this.localStrategy());
  };

  serializeUser = (user, done) => {
    return done(null, user.id);
  };

  deserializeUser = async (id, done) => {
    try {
      const user = await this.usersService.getUserById(id);
      if (user) {
        return done(null, user);
      } else {
        return done(new NotFoundException({ entity: this.constants.USER, id }));
      }
    } catch (error) {
      return done(error);
    }
  };

  localStrategy = () => {
    return new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
      try {
        const user = await this.usersRepository.getUserByEmail(username);

        if (!user) {
          return done(null, false);
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
          const userDTO = UserResponseDTO.convert(user);
          return done(null, userDTO);
        } else {
          return done(this.constants.PASSWORD_USERNAME_INCORRECT, null);
        }
      } catch (error) {
        throw error;
      }
    });
  };
}

module.exports = AuthService;
