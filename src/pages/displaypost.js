import React,{useEffect,useState} from 'react';
import axios from 'axios';

export default function Displaypost(props) {
    const postid=props.match.params.postid;
    console.log(postid);
    const [post,setPost]=useState([])
    useEffect(()=>{

        const variable={postId:postid};
        axios.post("https://mentor-gvpce.herokuapp.com/displayingpost",variable,{
            headers: {
              "content-type": "application/json"
            },
            withCredentials: true})
        .then(response=>{
            if(response.data.success){
                console.log(response.data.post)
                setPost(response.data.post)
            }
            else{
                alert('Failed to bring post data')
            }
        })
    },[])
    console.log(post);
    return (
        <div className="displayingpost" style={{width:'80%',margin:'3rem auto'}}>
        <h1 style={{display:'flex',justifyContent:'center',textTransform:"uppercase"}}>{post.title}</h1>
        <br/>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
            <p><span style={{color:"#e00070"}}>posted at </span>{post.time}</p>
        </div>
        <div style={{display:'flex',justifyContent:'flex-end'}}>
            <p><span style={{color:"#e00070"}}>posted by </span>{post.u_name}</p>
        </div>
        <br></br>
        <div dangerouslySetInnerHTML={{__html:post.desc}}/>
        </div>
    )
}
