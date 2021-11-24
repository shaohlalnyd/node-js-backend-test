import { createConnection, getConnection } from "typeorm";

const connection = {
  async create() {
    await createConnection();
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    try {
      for (const entity of entities) {
        const repository = await connection.getRepository(entity.name);
        await repository.query(`DELETE FROM "${entity.tableName}";`);
      }
    } catch (error) {
      throw new Error(`ERROR: Cleaning test db: ${error}`);
    }
  },
};
export default connection;
