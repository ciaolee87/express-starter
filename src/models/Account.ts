import {Table, Column, Model, HasMany, ForeignKey, BelongsTo, DataType} from 'sequelize-typescript';
import {AccountSession} from "./AccountSession";

@Table({
	timestamps: true
})
export class Account extends Model<Account> {
	@Column({
		primaryKey: true, allowNull: false,
		autoIncrement: true, unique: true
	})
	id: number;

	@Column({
		unique: true, primaryKey: true,
		type: DataType.STRING(255),
		comment: "계정 이메일"
	})
	email: string;

	@Column({
		unique: true, primaryKey: true,
		type: DataType.STRING(100),
		comment: "계정 키"
	})
	uid: string;

	@HasMany(() => AccountSession)
	sessions: Array<AccountSession>;
}
