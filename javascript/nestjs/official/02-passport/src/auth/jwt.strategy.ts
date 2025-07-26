import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  validate(payload: { sub: string; username: string }) {
    // Passport uses this to build a User object and attach it to the request object
    return { userId: payload.sub, username: payload.username };

    // since we didn't do any futher verifications, and we just processed this object going out - this can be considered a fast, "stateless JWT" model, where each API call is immediately authenticated based on the presence of a valid JWT, and a small bit of info from the requestor (userId, and username) is available in our Request pipeline
  }
}
