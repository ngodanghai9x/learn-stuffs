import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTradersV21727929412345 implements MigrationInterface {
    private tableName = 'traders_v2';

    private partitionNumber = 3;

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

        // await queryRunner.query(`CREATE UNIQUE INDEX ${this.tableName}_pool_id_maker_address_unique_idx ON trader (pool_id, maker_address)`);
        // await this.createIndex(queryRunner, this.tableName, 'pool_id_maker_address_idx', ['pool_id', 'maker_address']);
        await this.createIndex(queryRunner, this.tableName, 'pnl_idx', ['pnl']);
        await this.createIndex(queryRunner, this.tableName, 'balance_idx', ['balance']);

        // Create n partitions
        for (let i = 0; i < this.partitionNumber; i++) {
            await this.createPartition(queryRunner, `${this.tableName}`, i);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        for (let i = 0; i < this.partitionNumber; i++) {
            await queryRunner.query(`DROP TABLE IF EXISTS "${this.tableName}_p${i}";`);
        }
        await queryRunner.query(`DROP TABLE IF EXISTS "${this.tableName}";`);
    }

    private async createIndex(
        queryRunner: QueryRunner,
        tableName: string,
        indexName: string,
        columnNames: string[],
    ): Promise<void> {
        const columns = columnNames.join('", "');
        const query = `CREATE INDEX IF NOT EXISTS "${tableName}_${indexName}" ON "${tableName}" ("${columns}");`;
        return await queryRunner.query(query);
    }

    private async createPartition(
        queryRunner: QueryRunner,
        tableName: string,
        partitionNumber: number,
    ): Promise<any> {
        const partitionTableName = `${tableName}_p${partitionNumber}`;
        const query = `CREATE TABLE IF NOT EXISTS "${partitionTableName}" PARTITION OF "${tableName}"
                        FOR VALUES WITH (MODULUS ${this.partitionNumber}, REMAINDER ${partitionNumber});`;

        return await queryRunner.query(query);
    }
}
