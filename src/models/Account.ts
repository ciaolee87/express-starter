import {Table, Column, Model, HasMany} from 'sequelize-typescript';
import {Session} from "./Session";
import {Receipt} from "./Receipt";

@Table({timestamps: true})
export class Account extends Model<Account> {
    @Column({
        primaryKey: true, unique: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        primaryKey: true, allowNull: false
    })
    uid: string;

    @Column({defaultValue: 0})
    lev: number;

    @Column({allowNull: false})
    method: string;

    @HasMany(() => Session)
    sessions: Session[];

    @HasMany(() => Receipt, 'accountId')
    receipts: Receipt[]
}