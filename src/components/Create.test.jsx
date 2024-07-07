import { render, screen } from '@testing-library/react'
import Create from './Create'
import { beforeEach, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import blogService from '../services/blogs'

describe('<Create />', () => {
  const mockShowNotification = vi.fn()
  const mockSetBlogs = vi.fn()

  beforeEach(() => {
    // Mock the blogService.create method
    blogService.create = vi.fn().mockResolvedValue({
      title: 'Test Title',
      author: 'Test Author',
      url: 'www.example.com/test',
      id: '1',
    })

    // Render the Create component
    render(
      <Create
        blogs={[]}
        setBlogs={mockSetBlogs}
        showNotification={mockShowNotification}
      />
    )
  })

  test('submitting a new blog calls the event handler with correct details', async () => {
    const user = userEvent.setup()

    const titleInput = screen.getByPlaceholderText('title')
    const authorInput = screen.getByPlaceholderText('author')
    const urlInput = screen.getByPlaceholderText('url')

    const submitButton = screen.getByText('create')

    await user.type(titleInput, 'Test Title')
    await user.type(authorInput, 'Test Author')
    await user.type(urlInput, 'www.example.com/test')

    await user.click(submitButton)

    expect(mockSetBlogs.mock.calls).toHaveLength(1)
    expect(mockSetBlogs.mock.calls[0][0]).toEqual([
      {
        title: 'Test Title',
        author: 'Test Author',
        url: 'www.example.com/test',
        id: '1',
      },
    ])
    expect(mockShowNotification).toHaveBeenCalledWith(
      'new blog Test Title by Test Author added'
    )
  })
})
