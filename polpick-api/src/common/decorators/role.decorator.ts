import { CustomDecorator, SetMetadata } from "@nestjs/common";
import { UserRole } from "../enums/user-role.enum";

export const Roles = (...roles: UserRole[]): CustomDecorator<string> => {
    return SetMetadata('roles', roles);
}