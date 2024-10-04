import { MigrationInterface, QueryRunner } from 'typeorm';
import * as moment from 'moment';

export class CreateTableSolanaTradersV21727929441015 implements MigrationInterface {
    private tableNameV1 = 'traders';

    private tableName = 'traders_v21';

    private partitionNumber = 3;

    private startDate = '2024-09-27';

    private limitRecord = true;

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "${this.tableName}" (
                id                   serial,
                pool_id                 text not null,
                maker_address                text not null,
                bought_val         numeric   default '0'::numeric,
                sold_val           numeric   default '0'::numeric,
                pnl                  numeric,
                balance              numeric   default '0'::numeric,
                created_at           timestamp default CURRENT_TIMESTAMP,
                PRIMARY KEY (pool_id, maker_address)
            ) PARTITION BY HASH (pool_id);
        `);

        // await queryRunner.query(`CREATE UNIQUE INDEX ${this.tableName}_pair_maker_unique_index ON trader (pair, maker)`);
        // await this.createIndex(queryRunner, this.tableName, 'pair_maker_index', ['pair', 'maker']);
        await this.createIndex(queryRunner, this.tableName, 'pnl_index', ['pnl']);
        await this.createIndex(queryRunner, this.tableName, 'balance_index', ['balance']);

        // Create n partitions
        const startDate = moment(this.startDate);
        const endDate = moment().add(1, 'days'); // end at current date + 1 day
        let currentStartDate = startDate.clone();

        while (currentStartDate.isBefore(endDate)) {
            const year = currentStartDate.format('YYYY');
            const week = currentStartDate.format('WW');
            const currentEndDate = currentStartDate.clone().add(1, 'week');
            console.log('🚀  ~ up ~ currentEndDate:', { currentStartDate, currentEndDate });

            await queryRunner.query(this.buildCreatePartition(this.tableName, year, week, currentStartDate.format('YYYY-MM-DD'), currentEndDate.format('YYYY-MM-DD')));

            currentStartDate = currentEndDate;
        }

        await queryRunner.query(`INSERT INTO ${
            this.tableName
        } (pair, maker, bought_val, sold_val, pnl, balance, created_at, updated_at, pool_created_at
            ) SELECT 
                t1.pair, 
                t1.maker, 
                t1.bought_val, 
                t1.sold_val, 
                t1.pnl, 
                t1.balance, 
                t1.updated_at,
                p.created_at
            FROM ${this.tableNameV1} t1
            JOIN pools p ON t1.pair = p.id
            ${this.limitRecord ? 'LIMIT 1000' : ''};
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // for (let i = 0; i < this.partitionNumber; i++) {
        //     await queryRunner.query(`DROP TABLE IF EXISTS "${this.tableName}_p${i}";`);
        // }
        const startDate = moment(this.startDate);
        const endDate = moment().add(1, 'days'); // end at current date + 1 day
        let currentStartDate = startDate.clone();

        while (currentStartDate.isBefore(endDate)) {
            const year = currentStartDate.format('YYYY');
            const week = currentStartDate.format('WW');
            const currentEndDate = currentStartDate.clone().add(1, 'week');
            console.log('🚀  ~ down ~ currentEndDate:', { currentStartDate, currentEndDate });
            const partitionTableName = `${this.tableName}_${year}_${week}`;

            await queryRunner.query(`DROP TABLE IF EXISTS "${partitionTableName}";`);

            currentStartDate = currentEndDate;
        }
        await queryRunner.query(`DROP TABLE IF EXISTS "${this.tableName}";`);
    }

    private async createIndex(queryRunner: QueryRunner, tableName: string, indexName: string, columnNames: string[]): Promise<void> {
        const columns = columnNames.join('", "');
        const query = `
        CREATE INDEX IF NOT EXISTS "${tableName}_${indexName}"
        ON "${tableName}" ("${columns}");
    `;
        await queryRunner.query(query);
    }

    private buildCreatePartition(tableName: string, year: string, week: string, start: string, end: string): string {
        const partitionTableName = `${tableName}_${year}_${week}`;

        return `
            CREATE TABLE IF NOT EXISTS "${partitionTableName}" PARTITION OF "${tableName}"
            FOR VALUES FROM ('${start}') TO ('${end}');
        `;
    }
}
