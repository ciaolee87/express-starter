import {Table, Column, Model, BelongsTo, ForeignKey, HasMany} from 'sequelize-typescript';
import {Receipt} from "./Receipt";

@Table
export class Category extends Model<Category> {
    @Column({allowNull: false, defaultValue: "", unique: true})
    nm: string;

    @HasMany(() => Receipt, 'categoryId')
    receipts: Receipt[];
}



