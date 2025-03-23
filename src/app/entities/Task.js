const { EntitySchema, TableForeignKey } = require("typeorm");

module.export = new Task({

    name: "Task",
    tableName: "task",
    columns: {
        id: {
            type: "int",
            primary: true,
            generated: true,
        },
        titulo: {

            type: "varchar",
            length: 100,

        },
        description: {
            type: "varchar",
            length: 200,
        },
        state: {
            type: "varchar",
            length: 100,
        },
        dateCreation: {
            type: "timestamp",
            createDate: true,
        },
        dateLimit:{

            type: "timestamp",
            createDate: true,

        },
    }

});