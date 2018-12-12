import { Injectable, Inject } from '@nestjs/common';
import { Item } from './items.interface';
import { CreateItemDto } from './create-item.dto';
import { Model } from 'mongoose';

@Injectable()
export class ItemsService {
  constructor(@Inject('ItemModelToken') private readonly itemModel: Model<Item>) {}
  async findAll(): Promise<Item[]> {
    return await this.itemModel.find().exec();
  }

  async findOne(id: string): Promise<Item[]> {
    return await this.itemModel.findById(id);
  }

  async create(createItemDto: CreateItemDto): Promise<Item> {
    const createdItem = new this.itemModel(createItemDto);
    return await createdItem.save();
  }

  async delete(id: string): Promise<Item> {
    return await this.itemModel.deleteOne({
        _id: id,
    });
    // return await this.itemModel.collection.remove();
  }

  async updateItem(id: string, createItemDto: CreateItemDto): Promise<Item> {
    return await this.itemModel.updateOne({_id: id }, createItemDto);
  }
}
