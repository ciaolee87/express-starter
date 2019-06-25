import {Table, Column, Model, HasMany, DataType} from 'sequelize-typescript';


@Table({
    timestamps: true, tableName: 'app_balance_records',
    underscoredAll: true, underscored: true
})
export class BalanceRecord extends Model<BalanceRecord> {
    @Column({
        type: DataType.DECIMAL,
        allowNull: false,
        defaultValue: 0
    })
    total: number;
}
