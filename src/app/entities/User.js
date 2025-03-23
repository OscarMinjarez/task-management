const { EntitySchema } = require("typeorm");

module.export = new User({

    name: "User",
    tableName: "users",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        username: {

            type: "varchar",
            length: 100,

        },
        name: {
            type: "varchar",
            length: 100,
        },
        email: {
            type: "varchar",
            unique: true,
        },
        password: {
            type: "varchar",
        }
    }

});