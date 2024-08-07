const Comments = ({ blog }) => {
  return (
    <div>
      <h3>comments</h3>
      <ul>
        {blog.comments.map(comment => (
          <li key={comment._id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
