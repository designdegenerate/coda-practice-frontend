import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { apiUrl } from "../config/constants";
import { selectToken, selectUserSpace } from "../store/user/selectors";

export default function MePage() {
  const userSpace = useSelector(selectUserSpace);
  const hasToken = useSelector(selectToken);

  //See Reference [1]
  const sortByDate = (a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB > dateA;
  };

  //Have useEfffect here that watches the redux store
  const deleteStory = async (storyId) => {
    try {
      const deletedStory = await axios.delete(
        `${apiUrl}/stories/${storyId}`
      );
      console.log(deletedStory.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  }, []);

  return (
    <div>
      {userSpace? (
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
      ) : "please login to view your profile"}

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
                    Delete Story
                  </button>
                </li>
              );
            })
            }
          </ul>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}
