import {
    Table,
    Column,
    Model,
    BelongsTo,
    DataType,
    ForeignKey,
    HasMany, BeforeUpdate
} from 'sequelize-typescript';
import {Account} from "./Account";
import {Category} from "./Category";
import {GeomPoint} from "../utils/sequelize/SequelizeLocationUtil";

@Table({
    timestamps: true
})
export class Receipt extends Model<Receipt> {
    // 어카운트 정보
    @ForeignKey(() => Account)
    accountId: number;

    // 글 카테고리 정보
    @ForeignKey(() => Category)
    categoryId: number;

    @BelongsTo(() => Category)
    category: Category;

    @Column({allowNull: false, defaultValue: "", type: DataType.STRING(150)})
    memo: string;

    @Column({type: DataType.GEOMETRY('POINT'), allowNull: false})
    location: GeomPoint;

    @Column
    currency: number;

    @Column
    regAt: Date;

    @Column({defaultValue: false})
    isDelete: boolean;

    @BelongsTo(() => Account)
    account: Account;
}
