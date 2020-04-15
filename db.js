const Sequelize = require('sequelize')

const db = new Sequelize({
    dialect: 'sqlite',
    storage: __dirname + '/todos.db'

})

const Todos = db.define('todo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(100)
    },
    description: {
        type: Sequelize.TEXT
    },
    due_date: {
        type: Sequelize.DATEONLY
    },
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    priority: {
        type: Sequelize.STRING
    }
})

const Notes = db.define('note',{
    Task_Id: {
        type: Sequelize.INTEGER
    },
    Note:{
        type: Sequelize.STRING(100)
    }
})

module.exports = {
    db, Todos, Notes
}