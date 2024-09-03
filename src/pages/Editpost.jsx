import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Database_Service_Object from '../appwrite/data_config';
import Container from '../scenes/container/Container';
import Post_form from '../scenes/post-form/Post_form';

function Editpost() {
  const [post, setpost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      Database_Service_Object.getPostData(slug).then((post) => {
        setpost(post);
      });
    } else {
      navigate('/');
    }
  }, [slug, navigate]);
  return (
    <div className="py-6">
      <Container>
        <Post_form post={post} />
      </Container>
    </div>
  );
}

export default Editpost;
