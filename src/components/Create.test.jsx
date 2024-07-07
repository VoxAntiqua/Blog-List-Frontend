import { render, screen, waitFor } from '@testing-library/react'
import Create from './Create'
import { beforeEach, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

describe('<Create />', () => {
  let mockHandleCreate

  beforeEach(() => {
    mockHandleCreate = vi.fn()
    render(<Create handleCreate={mockHandleCreate} />)
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

    await waitFor(() => {
      // Check that the handleCreate function is called once
      expect(mockHandleCreate).toHaveBeenCalledTimes(1)

      // Check that the handleCreate function is called with the correct arguments
      expect(mockHandleCreate).toHaveBeenCalledWith(
        'Test Title',
        'Test Author',
        'www.example.com/test'
      )
    })
  })
})
