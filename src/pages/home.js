
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import OutlinedCard from "./card";
import { Grid } from "@material-ui/core";
import { selectUser } from "../components/redux_code/userSlice";
import { useSelector } from "react-redux";
import Filter from "./filters";
import Filter1 from "./filter1";
import Filter2 from "./filter2";
//import {c_name,c_role,dept} from './data';
import EmojiPeopleOutlinedIcon from "@material-ui/icons/EmojiPeopleOutlined";
function Home() {
  const user = useSelector(selectUser);
  const [data, setData] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(6);
  const [Post, setPost] = useState(0);
  const [Filters, setFilters] = useState({
    c_name: [],
    c_role: [],
    branch: []
  });

  useEffect(() => {
    const variables = {
      skip: Skip,
      limit: Limit
    };
    getPosts(variables);
  }, []);

  const getPosts = (variables) => {
    const url = "https://mentor-gvpce.herokuapp.com/posts";

    Axios.post(url, variables, {
      headers: { "content-type": "application/json" },
      withCredentials: true
    })
      .then((response) => {
        if (response.data.success) {
          if (variables.loadMore) {
            setData([...data, ...response.data.result]);
          } else {
            setData(response.data.result);
          }
          setPost(response.data.postSize);
        } else {
          alert("Failed to fetch posts");
        }
      })
      .catch((err) => {
        throw err;
      });
  };
  const history = useHistory();

  const onLoadMore = () => {
    let skip = Skip + Limit;
    const variables = {
      skip: skip,
      limit: Limit,
      filters: Filters,
      loadMore: true
    };
    getPosts(variables);
    setSkip(skip);
  };

  const showFilteredResults = (filters) => {
    const variables = {
      skip: 0,
      limit: Limit,
      filters: filters
    };
    getPosts(variables);
    setSkip(0);
  };

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };
    newFilters[category] = filters;
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  function deletepost(post_id) {
    console.log(post_id);
    if(window.confirm("Do you want to delete this particular post"))
    {
    Axios.post(
      "https://mentor-gvpce.herokuapp.com/deletepost",
      { id: post_id },
      {
        headers: { "content-type": "application/json" },
        withCredentials: true
      }
    ).then((response) => {
      console.log(response);
      const variables = {
        skip: 0,
        limit: Limit
      };
      getPosts(variables);
    });
  }
}

  return (
    <>
      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{color:"#c92424"}}>
            Posts
            <EmojiPeopleOutlinedIcon />
          </h2>
        </div>
        <Filter handleFilters={(filters) => handleFilters(filters, "c_name")} />
        <br />
        <Filter1 handleFilters={(filters) => handleFilters(filters, "c_role")}
        />
        <br />
        <Filter2
          handleFilters={(filters) => handleFilters(filters, "branch")}
        />
        <br />
        {data.length === 0 ? (
          <div
            style={{
              display: "flex",
              height: "300px",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <h2>No posts yet.....</h2>
          </div>
        ) : (
          <div>
            <Grid container spacing={2}>
              {data.map((obj) => (
                <Grid item xs={12} sm={6} md={4}>
                  <OutlinedCard
                    key={obj._id}
                    _id={obj._id}
                    title={obj.title}
                    time={obj.time}
                    username={obj.u_name}
                    desc={obj.desc}
                    role={obj.c_role}
                    companyname={obj.c_name}
                    admin={user.isadmin}
                    fun={deletepost}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        )}
        <br />
        <br />
        {Post >= Limit && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button style={{backgroundColor:"#fcca03",color:"blue"}} onClick={onLoadMore} variant="contained" color="primary">
              Load More
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
export default Home;
