import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { apiUrl } from "../config/constants";
import { deleteUserStory } from "../store/user/slice";
import { createStory } from "../store/user/actions";
import { selectUserSpace } from "../store/user/selectors";
import { useState } from "react";

export default function MePage() {
  const dispatch = useDispatch();
  const userSpace = useSelector(selectUserSpace);
  const [getName, setName] = useState("");
  const [getContent, setContent] = useState("");
  const [getImageURL, setImageURL] = useState("");

  //See Reference [1]
  const sortByDate = (a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB > dateA;
  };

  const deleteStory = async (storyId) => {
    try {
      await axios.delete(`${apiUrl}/stories/${storyId}`);

      dispatch(deleteUserStory(storyId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {userSpace ? (
        <div
          className="some-space-header"
          style={{
            color: userSpace?.color ? userSpace.color : "#000",
            backgroundColor: userSpace?.backgroundColor
              ? userSpace.backgroundColor
              : "",
          }}
        >
          <h1>{userSpace?.title}</h1>
          <p>{userSpace?.description}</p>
        </div>
      ) : (
        "please login to view your profile"
      )}
      {userSpace ? (
        <details>
          <summary>NEW STORY BRUH</summary>
          <form onSubmit={ (event) => {
          event.preventDefault();
          dispatch(createStory({
            name: getName,
            content: getContent,
            imageURL: getImageURL,
            spaceId: userSpace.id
          }))
        }
        }>
          <label>name your story bruh</label>
          <input
            value={getName}
            onChange={(event) => setName(event.target.value)}
            type="text"
          ></input>
          <label>wots your story bruh</label>
          <input
            value={getContent}
            type="text"
            onChange={(event) => setContent(event.target.value)}
          ></input>
          <label>show your story bruh (imageurl)</label>
          <input
            value={getImageURL}
            type="text"
            onChange={(event) => setImageURL(event.target.value)}
          ></input>
          <img src={getImageURL} alt=""></img>
          <button type="submit">Post your story bruh</button>
        </form>
        </details>
      ) : (
        <p></p>
      )}

      {userSpace?.stories ? (
        <div>
          <ul className="stories-list">
            {[...userSpace.stories].sort(sortByDate).map((story) => {
              return (
                <li key={story.id}>
                  <img alt="" src={story.imageURL}></img>
                  <h2>{story.name}</h2>
                  <p>{story.content}</p>
                  <button
                    onClick={() => {
                      deleteStory(story.id);
                    }}
                  >
                    Didn't happen bruh
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
