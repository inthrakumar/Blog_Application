import React,{useEffect,useState} from 'react'
import {Link,useNavigate,useParams} from 'react-router-dom'
import Appwrite from "../appwrite/data_config"
import Button from '../components/Button'
import Container from "../components/container/Container"
import parse from "html-react-parser"
import { useSelector } from 'react-redux'

function Post() {
  const [post,setpost]=useState(null);
  const {slug}=useParams();
  const navigate=useNavigate();
  const userData=useSelector(state=>state.auth.userData);

  const author =post && userData ? post.userId ===userData.id:false;
  useEffect(()=>{
    if(slug){
      Appwrite.getPostData(slug).then((post)=>{
        if(post){
          setpost(post);
        }else{
          navigate("/");
        }
      })
    }
  },[slug,navigate])
  const delete_post=async()=>{
     Appwrite.deletePost((post.id).then((status)=>{
      if(status){
        Appwrite.deleteFile(post.image_feature);
        navigate("/");
      }
    }))
  }
  return post ? (
    <div className="py-8">
      <Container>
        <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
          <img src={Appwrite.getFilePreview(post.image_feature)} alt={post.title} className='rounded-xl' />
          { isAuthor && (
            <div className="absolute-right-6 top-6">
              <Link to={`/edit-post/${post.id}`}>
                <Button bgColor="bg-green-500" className="mr-3">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" 
              onClick={delete_post}
              >Delete</Button>
            </div>
          )}
        </div>
        <div className="w-full mb-6">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <div className="browser-css">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null
}

export default Post
