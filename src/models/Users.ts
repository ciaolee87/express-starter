import {Table, Column, Model, HasMany} from 'sequelize-typescript';


@Table({
    timestamps: true, tableName: 'app_users',
    underscoredAll: true, underscored: true
})
export class User extends Model<User> {
    @Column({
        primaryKey: true, allowNull: false
    })
    email: string;
}
