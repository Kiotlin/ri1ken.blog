/* eslint-disable array-callback-return */
const { promises: fs } = require('fs')
const path = require('path')
const RSS = require('rss')
const matter = require('gray-matter')

function addFeed(fd, { cat, name, mat }) {
  fd.item({
    title: mat.data.title,
    url: `/${cat}/${name.replace(/\.mdx?/, '')}`,
    date: mat.data.date,
    description: mat.data.description,
    author: mat.data.author,
  })
}

// @TODO: for now let's generate with all posts, unsorted
async function generate() {
  const feed = new RSS({
    title: 'ri1ken',
    site_url: 'https://iken.moe/',
    feed_url: 'https://iken.moe/feed.xml',
  })

  const [blogs, posts] = await Promise.all([
    fs.readdir(path.join(__dirname, '..', 'pages', 'blogs')),
    fs.readdir(path.join(__dirname, '..', 'pages', 'posts')),
  ])

  await Promise.all(
    blogs.map(async (name) => {
      if (name.startsWith('index.')) return

      const blogContent = await fs.readFile(
        path.join(__dirname, '..', 'pages', 'blogs', name)
      )
      const frontmatter = matter(blogContent)

      addFeed(feed, { cat: 'blogs', name, mat: frontmatter })
    })
  )

  await Promise.all(
    posts.map(async (name) => {
      if (name.startsWith('index.')) return

      const postContent = await fs.readFile(
        path.join(__dirname, '..', 'pages', 'posts', name)
      )
      const frontmatter = matter(postContent)

      addFeed(feed, { cat: 'posts', name, mat: frontmatter })
    })
  )

  await fs.writeFile('./public/feed.xml', feed.xml({ indent: true }))
}

generate()
