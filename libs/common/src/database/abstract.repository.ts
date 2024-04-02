import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<T extends AbstractDocument> {
  protected abstract readonly logger: Logger;

  protected constructor(private readonly model: Model<T>) {}

  async create(createDto: Omit<T, '_id'>): Promise<T> {
    return this.model.create(createDto);
  }

  async findAll(): Promise<T[]> {
    return this.model.find();
  }

  async find(filterQuery: FilterQuery<T>): Promise<T[]> {
    return this.model.find(filterQuery);
  }

  async findOneById(id: string): Promise<T> {
    const document = await this.model.findById(id).lean<T>(true);
    if (!document) {
      this.logger.error('Document not found');
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findOne(filterQuery: FilterQuery<T>): Promise<T> {
    const document = await this.model.findOne(filterQuery).lean<T>(true);
    if (!document) {
      this.logger.error('Document not found');
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<T>,
    updateDto: UpdateQuery<T>,
  ): Promise<T> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, updateDto, { new: true })
      .lean<T>(true);

    if (!document) {
      this.logger.error('Document not found');
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async update(id: string, updateDto: UpdateQuery<T>): Promise<T> {
    const document = await this.model
      .findByIdAndUpdate(id, updateDto, { new: true })
      .lean<T>(true);

    if (!document) {
      this.logger.error('Document not found');
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async updateMany(filterQuery: FilterQuery<T>, updateDto: UpdateQuery<T>) {
    return this.model.updateMany(filterQuery, updateDto);
  }

  async remove(id: string): Promise<T> {
    return this.model.findByIdAndDelete(id).lean<T>(true);
  }

  async removeMany(filterQuery: FilterQuery<T>): Promise<unknown> {
    return this.model.deleteMany(filterQuery);
  }
}
