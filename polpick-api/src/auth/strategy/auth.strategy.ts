import { Injectable, Redirect } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { Request } from "express";
import { UserRepository } from "src/users/repositories/users.repository";
import { Types } from "mongoose";
import { JwtPayloadType } from "src/common/types/jwt-payload.types";
import { UserDeviceRepository } from "src/user-devices/repository/user-device.repository";
import { getClientIp } from 'request-ip';
import * as geoIp from 'geoip-lite';
import { IUserDevice } from "src/common/interfaces/user-device.interface";
import _ from "underscore";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(
        private readonly userRepository: UserRepository,
        private readonly userDeviceRepository: UserDeviceRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromHeader('token'),
            secretOrKey: process.env.JWT_SECRET,
            passReqToCallback: true
        });
    }

    async validate(req: Request, payload: JwtPayloadType, done: VerifiedCallback) {
        const user = await this.userRepository.authentication(new Types.ObjectId(payload.id));

        let ip = getClientIp(req);
        const token = req.headers?.token;

        if (ip) {
            let user_devices = user['user_devices'] || [];
            let existingDeviceData: IUserDevice = _.findWhere(user_devices, { access_token: token });

            if (existingDeviceData) {
                let ipDetails = geoIp.lookup(ip);

                const createDeviceObject = () => ({
                    ip,
                    ip_lat: ipDetails?.ll?.[0] as unknown as string || '',
                    ip_long: ipDetails?.ll?.[1] as unknown as string || '',
                    last_active: Date.now(),
                    state: ipDetails?.region || '',
                    country: ipDetails?.country || '',
                    city: ipDetails?.city || '',
                    timezone: ipDetails?.timezone || '',
                });

                await this.userDeviceRepository.updateById(createDeviceObject(), existingDeviceData._id);

                if (existingDeviceData.expired) {
                    return done(null, null, payload?.iat);
                }
            }
        }

        return done(null, user, payload?.iat);
    }
}

@Injectable()
export class BasicJwtStrategy extends PassportStrategy(Strategy, 'basicJwt') {
    constructor(
        private readonly userRepository: UserRepository
    ) {
        super({ jwtFromRequest: ExtractJwt.fromHeader('token'), secretOrKey: process.env.JWT_SECRET_NO_LOGIN })
    }

    async validate(req: Request, payload: JwtPayloadType) {
        const user = await this.userRepository.authentication(new Types.ObjectId(payload.id));
        return user || null;
    }
}