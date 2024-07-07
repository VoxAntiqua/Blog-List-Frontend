import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let container
  const blog = {
    title: 'Blog Title',
    author: 'Blog Author',
    url: 'http://www.blogurl.com',
    likes: 10,
    user: {
      name: 'User Name',
      username: 'username',
    },
  }

  const mockHandleLikeButton = vi.fn()
  const mockHandleRemoveButton = vi.fn()

  beforeEach(() => {
    localStorage.setItem('loggedBloglistUser', JSON.stringify(blog.user))
    container = render(
      <Blog
        blog={blog}
        handleLikeButton={mockHandleLikeButton}
        handleRemoveButton={mockHandleRemoveButton}
      />
    ).container
  })

  test('renders title and author, but not URL or likes by default', () => {
    const blogTitle = screen.getByText('Blog Title', { exact: false })
    expect(blogTitle).toBeDefined()
    const blogAuthor = screen.getByText('Blog Author', { exact: false })
    expect(blogAuthor).toBeDefined()
    const blogDetails = container.querySelector('.blogDetails')
    expect(blogDetails).toHaveStyle('display: none')
  })

  test('URL and likes are displayed after details button is clicked', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const blogDetails = container.querySelector('.blogDetails')
    expect(blogDetails).not.toHaveStyle('display: none')
  })

  test('event handler is called twice when like button is clicked twice', async () => {
    const user = userEvent.setup()
    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandleLikeButton).toHaveBeenCalledTimes(2)
  })
})
