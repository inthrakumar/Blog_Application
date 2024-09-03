import React from 'react';
import Container from '../scenes/container/Container';
import Post_form from '../scenes/post-form/Post_form';
function Addpost() {
  return (
    <div className="py-6">
      <Container>
        <Post_form />
      </Container>
    </div>
  );
}

export default Addpost;
