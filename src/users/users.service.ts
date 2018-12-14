import { JwtPayload } from './../auth/jwt-payload.interface';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { User } from './users.interface';
import { CreateUserDto } from './create-user.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    private hashLength = 16;
    constructor(@Inject('UserModelToken') private readonly userModel: Model<User>) { }
    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findOne(payload: JwtPayload): Promise<User[]> {
        return await this.userModel.findOne({ username: payload.username }).exec();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        createUserDto.password = await this.getHash(createUserDto.password);
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }

    async delete(id: string): Promise<User> {
        return await this.userModel.deleteOne({
            _id: id,
        });
        // return await this.userModel.collection.remove();
    }

    //   async updateItem(id: string, createUserDto: CreateUserDto): Promise<User> {
    //     return await this.userModel.updateOne({_id: id }, createUserDto);
    //   }

    async getHash(password: string): Promise<string> {
        return bcrypt.hash(password, this.hashLength);
    }

    async compareHash(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
