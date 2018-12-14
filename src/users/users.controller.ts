import { AuthGuard } from '@nestjs/passport';
import {
    Get,
    Post,
    Body,
    Controller,
    UsePipes,
    Delete,
    Param,
    Put,
    UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.interface';
import { ValidationPipe } from '../common/validation.pipe';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async findOne(@Param('id') id): Promise<User[]> {
        return this.usersService.findOne(id);
    }

    @Post()
    // @UsePipes(new ValidationPipe())
    async create(@Body() createUserDto: CreateUserDto) {
        this.usersService.create(createUserDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    async deleteItem(@Param('id') id) {
        this.usersService.delete(id);
    }

    // @Put(':id')
    // async updateItem(@Param('id') id, @Body() createItemDto: CreateItemDto) {
    //     this.usersService.updateItem(id, createItemDto);
    // }
}
