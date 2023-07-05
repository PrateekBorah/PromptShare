"use client"
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {
        data?.length > 0 && data.map((post) => (
          <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
        ))
      }
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchResults, setSearchResults] = useState([])

  const [posts, setPosts] = useState("");

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
  }
  useEffect(() => {

    fetchPosts();

  }, [])

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return posts.filter((post) => {
      return regex.test(post.creator.username) || regex.test(post.tag) || regex.test(post.prompt)
    })
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setTimeout(() => {
      const searchResult = filterPrompts(e.target.value);
      setSearchResults(searchResult);
    }, 500)
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
    const searchResult = filterPrompts(searchText);
    setSearchResults(searchResult);
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center flex-col">
        <input type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />

        {searchText ? <PromptCardList
          data={searchResults}
          handleTagClick={handleTagClick}
        />
          :
          <PromptCardList
            data={posts}
            handleTagClick={handleTagClick}
          />
        }
      </form>
    </section>
  )
}

export default Feed