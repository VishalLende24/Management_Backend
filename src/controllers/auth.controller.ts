import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User, UserResponse } from '@interfaces/users.interface';
import AuthService from '@services/auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.authService.signup(userData);

      const tokenData = this.authService.createToken(signUpUserData);
      const cookie = this.authService.createCookie(tokenData);

      const userResponse: UserResponse = {
        _id: signUpUserData._id,
        firstName: signUpUserData.firstName,
        lastName: signUpUserData.lastName,
        email: signUpUserData.email,
        createdAt: signUpUserData.createdAt,
      };

      res.setHeader('Set-Cookie', [cookie]);
      res.status(201).json({ data: userResponse, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const { cookie, findUser } = await this.authService.login(userData);

      const userResponse: UserResponse = {
        _id: findUser._id,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
        email: findUser.email,
        createdAt: findUser.createdAt,
      };

      res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: userResponse, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.authService.logout(userData);

      res.setHeader('Set-Cookie', ['Authorization=; Path=/; Max-Age=0; SameSite=None; Secure=true']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
