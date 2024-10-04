import { getRepository } from 'typeorm';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Trader {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pair: string;

    @Column()
    maker: string;

    @Column('numeric', { nullable: true })
    balance: number;

    @Column('numeric', { nullable: true })
    pnl: number;

    // Các cột khác...
}

const traderData = [
    {
        pair: 'BTC/USD',
        maker: 'Binance',
        balance: 1000,
        pnl: 200,
    },
    {
        pair: 'ETH/USD',
        maker: 'Coinbase',
        balance: 500,
        pnl: 150,
    },
];

const onConflictStr = `
    ("pair", "maker") DO UPDATE 
    SET 
        balance = trader.balance + EXCLUDED.balance, -- Cộng thêm balance từ bản ghi mới
        pnl = trader.pnl -- Giữ nguyên pnl từ bản ghi cũ
`;

await getRepository(Trader)
    .createQueryBuilder()
    .insert()
    .into(Trader)
    .values(traderData)
    .onConflict(onConflictStr)
    .execute();
