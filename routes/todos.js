const Route = require('express')
const {Todos, Notes} = require('../db')
const route = Route()

// getAllTodos
route.get('/', async (req,res) => {
    const todos = await Todos.findAll()
     res.send(todos); 
})

// getNotesById
route.get('/Notes/:id', async (req,res) => {
  if (isNaN(Number(req.params.id))) {
    return res.status(400).send({
      error: 'Invalid Id Provided',
    })
  }
  const notes = await Notes.findAll({
    attributes: ['Note'],
    where:{ Task_Id: req.params.id}
  })

   res.send(notes); 
})

// getTodoById
route.get('/:id', async(req,res) => {
    if (isNaN(Number(req.params.id))) {
        return res.status(400).send({
          error: 'Invalid Id Provided',
        })
      }

      const todo = await Todos.findByPk(req.params.id)
      if (!todo) {
        return res.status(404).send({
          error: 'No Task found with id = ' + req.params.id,
        })
      }
      res.send(todo)
})

// PostTodo
    route.post('/', async (req, res) => {

        if (req.body.status === 'true') {      
          req.body.status = true
        } else {
          req.body.status = false
        }
     
        const newTodo = await Todos.create({      
            name: req.body.name,
            status: req.body.status,
            due_date: req.body.due_date,
            description: req.body.description,
            priority: req.body.priority
        })

        res.status(201).send({ success: 'New task added', data: newTodo })
      })
      
  // PostNotes
  route.post('/Notes/', async (req, res) => {

    const newNote = await Notes.create({      
       Task_Id: req.body.id,
       Note: req.body.notes
    })

    res.status(201).send({ success: 'New Note added', data: newNote })
  })
      
 // UpdateTodoById
route.post('/Update', async(req,res) => {

    if (req.body.status === 'true') {      
      req.body.status = true
    } else {
      req.body.status = false
    }
    
    const todo = await Todos.findByPk(req.body.id)
    if (!todo) {
      return res.status(404).send({
        error: 'No Task found with id = ' + req.body.id,
      })
    }
    
    todo.status = req.body.status
    todo.priority = req.body.priority
    todo.due_date = req.body.due_date
    
    await todo.save()
    res.status(201).send({ success: 'New Task Updated', data: todo })
})
   
module.exports = route