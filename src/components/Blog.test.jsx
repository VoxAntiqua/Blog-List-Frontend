import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import { beforeEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blogs'

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

  const mockShowNotification = vi.fn()
  const mockSetBlogs = vi.fn()

  beforeEach(() => {
    localStorage.setItem('loggedBloglistUser', JSON.stringify(blog.user))
    container = render(
      <Blog
        blog={blog}
        showNotification={mockShowNotification}
        blogs={[blog]}
        setBlogs={mockSetBlogs}
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

  // This tests blogService.update instead of the handleLikeButton event handler, because I chose to keep event handlers defined within their own components rather than passed in as props from the parent. This seemed a cleaner approach to me, since there does not appear to be a strong need for event handling logic to be shared with other components or managed at a higher level.
  test('blogService.update is called twice when like button is clicked twice', async () => {
    const user = userEvent.setup()
    const likeButton = screen.getByText('like')

    // mock blogService.update method
    blogService.update = vi.fn()

    await user.click(likeButton)
    await user.click(likeButton)

    expect(blogService.update).toHaveBeenCalledTimes(2)
  })
})

/* 5.13: Blog List Tests, step 1
Make a test, which checks that the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default.

Add CSS classes to the component to help the testing as necessary.

5.14: Blog List Tests, step 2
Make a test, which checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked.

5.15: Blog List Tests, step 3
Make a test, which ensures that if the like button is clicked twice, the event handler the component received as props is called twice.

5.16: Blog List Tests, step 4
Make a test for the new blog form. The test should check, that the form calls the event handler it received as props with the right details when a new blog is created. */
