const passport = require("passport");
const UnauthorizedException = require("../exceptions/UnauthorizedException");

class AuthController {
  constructor(baseHttpResponse, constants) {
    this.baseHttpResponse = baseHttpResponse;
    this.constants = constants;
  }

  login = (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      try {
        if (err) {
          throw new UnauthorizedException(err);
        }

        if (!user) {
          throw new UnauthorizedException(this.constants.PASSWORD_USERNAME_INCORRECT);
        }

        req.logIn(user, (err) => {
          if (err) {
            throw err;
          }

          const response = this.baseHttpResponse.success(user);
          res.status(response.statusCode).send(response);
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  };

  logout = async (req, res, next) => {
    try {
      req.session = null;
      req.logOut((err) => {
        if (err) {
          throw err;
        }
      });
      res.clearCookie("app-auth.sid");
      const response = this.baseHttpResponse.success({});
      res.status(response.statusCode).send(response);
    } catch (error) {
      next(error);
    }
  };

  requireAuth = (req, res, next) => {
    try {
      if (req.isAuthenticated()) {
        next();
      } else {
        throw new UnauthorizedException(this.constants.PLEASE_LOG_IN);
      }
    } catch (error) {
      next(error);
    }
  };
}

module.exports = AuthController;
