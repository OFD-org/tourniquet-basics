import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findOneByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { email } });
    }

    async findOneByGoogleId(googleId: string): Promise<User | undefined> {
        return this.usersRepository.findOne({ where: { googleId } });
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
        const user = this.usersRepository.create({
            ...createUserDto,
            password: hashedPassword,
        });
        return this.usersRepository.save(user);
    }

    async findOrCreateGoogleUser(profile: {
        googleId: string;
        email: string;
        name: string;
    }): Promise<User> {
        // 1. Try to find by googleId
        let user = await this.findOneByGoogleId(profile.googleId);
        if (user) return user;

        // 2. Try to find by email (user might have signed up locally before)
        user = await this.findOneByEmail(profile.email);
        if (user) {
            // Link the Google account to the existing local account
            user.googleId = profile.googleId;
            user.name = user.name ?? profile.name;
            return this.usersRepository.save(user);
        }

        // 3. Create a brand-new Google user (no password)
        const newUser = this.usersRepository.create({
            email: profile.email,
            name: profile.name,
            googleId: profile.googleId,
            password: null,
        });
        return this.usersRepository.save(newUser);
    }
}
