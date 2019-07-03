import {Table, Column, Model, HasMany} from 'sequelize-typescript';


@Table({
    timestamps: true
})
export class User extends Model<User> {
    @Column({
        primaryKey: true, allowNull: false
    })
    email: string;
}
