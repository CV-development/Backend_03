import db from '../database/db_connect.js'

export const getPost = async () => {
  const query = 'SELECT * FROM posts;'
  try {
    const result = await db(query)
    return result
  } catch (error) {
    console.error('Error al buscar el post:', error)
    throw error
  }
}

export const getPostByID = async (id) => {
  const query = 'SELECT * FROM posts WHERE id = $1;'
  const values = [id]
  try {
    const result = await db(query, values)
    return result[0]
  } catch (error) {
    console.error('Error al encontrar el post:', error)
    throw error
  }
}

export const createPost = async (titulo, img, descripcion, likes) => {
  const query = 'INSERT INTO posts (id, titulo, img, descripcion, likes) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING *;'
  const values = [titulo, img, descripcion, likes]
  try {
    const result = await db(query, values)
    return result[0]
  } catch (error) {
    console.error('Error al crear el post:', error)
    throw error
  }
}

export const updatePost = async (id, { titulo, img, descripcion, likes }) => {
  const query = 'UPDATE posts SET titulo = $2, img = $3, descripcion= $4, likes = $5 WHERE id = $1 RETURNING *;'
  const values = [id, titulo, img, descripcion, likes]
  try {
    const result = await db(query, values)
    return result[0]
  } catch (error) {
    console.error('Error al actualizar el post:', error)
    throw error
  }
}

export const deletePost = async (id) => {
  const query = 'DELETE FROM posts WHERE id = $1 RETURNING *;'
  const values = [id]
  try {
    const result = await db(query, values)
    return result
  } catch (error) {
    console.error('Error al crear el post:', error)
    throw error
  }
}
