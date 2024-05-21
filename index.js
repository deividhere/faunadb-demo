const express = require('express');
const faunadb = require('faunadb');
const cors = require('cors');
const app = express();
const q = faunadb.query;

const client = new faunadb.Client({ secret: 'fnAFh80vdwAA0B3mHo83PeaDAE5Qnf62e4zF5iOR' });

app.use(cors());
app.use(express.json());

app.get('/students', async (req, res) => {
  try {
    let result = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("students"))),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    )

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({error: error.description})
  }
});

app.get('/students/:id', async (req, res) => {
  try {
    const {data} = await client.query(
      q.Get(q.Ref(q.Collection('students'), req.params.id))
    );
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({error: error.description})
  }
});

app.post('/students', async (req, res) => {

  try {
    const {name, courses } = req.body;
    const { data } = await client.query(
      q.Create(q.Collection('students'), { data: { name, courses } })
    );

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({error: error.description})
  }
});

app.put('/students/:id', async (req, res) => {

  try {
    const {name, courses } = req.body;
    const { data } = await client.query(
      q.Update(q.Ref(q.Collection('students'), req.params.id), 
      { data: { name, courses } },
      )
    );

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({error: error.description})
  }
});

app.delete('/students/:id', async (req, res) => {

  try {
    const { data } = await client.query(
      q.Delete(q.Ref(q.Collection('students'),  req.params.id))
    );

    res.status(204).json(data);
  } catch (error) {
    res.status(500).json({error: error.description})
  }
});

app.get('/courses', async (req, res) => {
  try {
    let result = await client.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("courses"))),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    )

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({error: error.description})
  }
});

app.get('/courses/:id', async (req, res) => {
  try {
    const {data} = await client.query(
      q.Get(q.Ref(q.Collection('courses'), req.params.id))
    );
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({error: error.description})
  }
});

app.post('/courses', async (req, res) => {

  try {
    const {name } = req.body;
    const { data } = await client.query(
      q.Create(q.Collection('courses'), { data: { name } })
    );

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({error: error.description})
  }
});

app.put('/courses/:id', async (req, res) => {

  try {
    const {name } = req.body;
    const { data } = await client.query(
      q.Update(q.Ref(q.Collection('courses'), req.params.id), 
      { data: { name } },
      )
    );

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({error: error.description})
  }
});

app.delete('/courses/:id', async (req, res) => {

  try {
    const { data } = await client.query(
      q.Delete(q.Ref(q.Collection('courses'),  req.params.id))
    );

    res.status(204).json(data);
  } catch (error) {
    res.status(500).json({error: error.description})
  }
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
