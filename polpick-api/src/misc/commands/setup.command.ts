import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import { Command } from "nestjs-command";
import { UtilsService } from "src/helpers/utils.helper";
import { RoleRepository } from "src/role/repositories/role.repository";
import { UserRepository } from "src/users/repositories/users.repository";

@Injectable()
export class SetupCommands {
    constructor(
        private userRepo: UserRepository,
        private roleRepo: RoleRepository,
        private utilService: UtilsService
    ) { }
    
    @Command({
        command: 'create:admin',
        describe: 'Creates admin user from config credentials',
    })
    async setupDatabase(): Promise<void> {
        /* Create Roles & Admin User */
        if (!await this.roleRepo.getByField({ role: 'user' })) {
            const userRole = await this.roleRepo.save({
                role: 'user',
                roleDisplayName: 'User',
                roleGroup: 'frontend',
                description: 'User Role'
            })
            if (!userRole) console.log(userRole);
        }

        if (!await this.roleRepo.getByField({ role: 'admin' })) {
            const adminRole = await this.roleRepo.save({
                roleDisplayName: 'Admin',
                roleGroup: 'backend',
                role: 'admin',
                description: 'Admin Portal User Role'
            })
            if (!adminRole) return console.log(adminRole);
            
            await this.userRepo.save({
                email: process.env.ADMIN_EMAIL || 'outdoors-ninja@yopmail.com',
                password: this.utilService.generateHash(process.env.ADMIN_PASSWORD || '12345678'),
                role: adminRole._id as Types.ObjectId
            });
        }
    }
}