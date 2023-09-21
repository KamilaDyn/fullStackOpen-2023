import { Button, Spinner } from 'react-bootstrap'
const Loading = () => {
  return (
    <Button variant="secondary" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Loading...
    </Button>
  )
}

export default Loading
