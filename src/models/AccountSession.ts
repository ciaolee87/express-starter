import {Table, Column, Model, HasMany, ForeignKey, BelongsTo, DataType} from 'sequelize-typescript';
import {Account} from "./Account";

@Table({
	timestamps: true
})
export class AccountSession extends Model<AccountSession> {
	@Column({
		primaryKey: true, allowNull: false,
		autoIncrement: true, unique: true
	})
	id: number;

	@ForeignKey(() => Account)
	accountId: number;

	@BelongsTo(() => Account)
	account: Account;

	@Column({
		type: DataType.STRING(50),
		comment: "접속 아이디"
	})
	ip: string;

	@Column({
		type: DataType.STRING(10),
		comment: "세션 고유키"
	})
	session: string;

	@Column({
		type: DataType.STRING(500),
		comment: "접속 정보"
	})
	info: string;
}
