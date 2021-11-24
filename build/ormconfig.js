if (process.env.NODE_ENV === "test") {
    module.exports = {
        name: "default",
        type: "postgres",
        host: "localhost",
        port: 5433,
        username: "admin",
        password: "admin123",
        database: "boilerplate_test",
        synchronize: true,
        logging: true,
        entities: ["src/models/**/*.ts"],
        migrations: ["src/migration/**/*.ts"],
        cli: {
            entitiesDir: "src/models",
            migrationsDir: "src/migration",
        },
    };
}
else {
    module.exports = {
        name: "default",
        type: "postgres",
        host: "postgres",
        port: 5432,
        username: "admin",
        password: "admin123",
        database: "boilerplate",
        synchronize: true,
        logging: true,
        entities: ["src/models/**/*.ts"],
        migrations: ["src/migration/**/*.ts"],
        cli: {
            entitiesDir: "src/models",
            migrationsDir: "src/migration",
        },
    };
}
//# sourceMappingURL=ormconfig.js.map