import { Module } from "@nestjs/common";
import { JwtStrategy } from "./strategy/auth.strategy";

@Module({
    exports: [JwtStrategy],
    providers: [JwtStrategy]
})
export class AuthModule {}