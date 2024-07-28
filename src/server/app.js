import express from 'express'
import cors from 'cors'
import { getPost, getPostByID, createPost, updatePost, deletePost } from './models/posts.models.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  try {
    const result = await getPost()
    res.status(200).json({ status: true, message: result })
  } catch (error) {
    res.status(500).json({ status: false, message: 'Ha ocurrido un error' })
  }
})

app.get('/posts/:id', async (req, res) => {
  try {
    const result = await getPostByID(req.params.id)
    if (result === undefined) {
      res.status(500).json({ status: false, message: 'Falta la propiedad id' })
    }
    res.status(200).json({ status: true, message: result })
  } catch (error) {
    res.status(500).json({ status: false, message: 'Ha ocurrido un error' })
  }
})

app.post('/posts', async (req, res) => {
  try {
    const { titulo, img, descripcion, likes } = req.body
    if (titulo === undefined) {
      res.status(500).json({ status: false, message: 'Falta la propiedad titulo' })
    }
    if (img === undefined) {
      res.status(500).json({ status: false, message: 'Falta la propiedad img' })
    }
    if (descripcion === undefined) {
      res.status(500).json({ status: false, message: 'Falta la propiedad descripción' })
    }
    if (likes === undefined) {
      res.status(500).json({ status: false, message: 'Falta la propiedad likes' })
    }
    const result = await createPost(titulo, img, descripcion, likes)
    res.status(201).json({ status: true, message: result })
  } catch (error) {
    res.status(500).json({ status: false, message: 'Ha ocurrido un error' })
  }
})

app.put('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { titulo, img, descripcion, likes } = req.body
    if (id === undefined) {
      res.status(500).json({ status: false, message: 'Falta la propiedad id' })
    }
    if (titulo === undefined) {
      res.status(500).json({ status: false, message: 'Falta la propiedad titulo' })
    }
    if (img === undefined) {
      res.status(500).json({ status: false, message: 'Falta la propiedad img' })
    }
    if (descripcion === undefined) {
      res.status(500).json({ status: false, message: 'Falta la propiedad descripción' })
    }
    if (likes === undefined) {
      res.status(500).json({ status: false, message: 'Falta la propiedad likes' })
    }
    const result = await updatePost(id, { titulo, img, descripcion, likes })
    res.status(200).json({ status: true, message: result })
  } catch (error) {
    res.status(500).json({ status: false, message: 'Ha ocurrido un error' })
  }
})

app.delete('/posts/:id', async (req, res) => {
  try {
    const { id } = req.params
    if (id === undefined) {
      res.status(500).json({ status: false, message: 'Falta la propiedad id' })
    }
    const result = await deletePost(id)
    res.status(200).json({ status: true, message: result })
  } catch (error) {
    res.status(500).json({ status: false, message: 'Ha ocurrido un error' })
  }
})

app.all('*', (req, res) => res.status(404).json({ status: false, message: 'Page not found' }))

app.listen(PORT, () => console.log('Server UP!'))
