import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchSomeSpace } from "../store/someSpace/actions";
import {
  selectSomeSpace,
  selectSomeSpaceStories,
} from "../store/someSpace/selectors";

export default function SomeSpace() {
  const dispatch = useDispatch();
  const params = useParams();
  const someSpace = useSelector(selectSomeSpace);
  const someSpaceStories = useSelector(selectSomeSpaceStories);

  //See Reference [1]
  const sortByDate = (a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    console.log(dateA, dateB)
    return dateB > dateA;
  };

  useEffect(() => {
    dispatch(fetchSomeSpace(params.id));
  }, [dispatch, params.id]);

  return (
    <main>
      <div
        className="some-space-header"
        style={{
          color: someSpace.color ? someSpace.color : "#000",
          backgroundColor: someSpace.backgroundColor
            ? someSpace.backgroundColor
            : "",
        }}
      >
        <h1>{someSpace.title}</h1>
        <p>{someSpace.description}</p>
      </div>
      <ul className="stories-list">
        {!someSpaceStories ? (
          <li>loading</li>
        ) : (
          [...someSpaceStories].sort(sortByDate).map((story) => {
            return (
              <li key={story.id}>
                <img alt="" src={story.imageURL}></img>
                <h2>{story.name}</h2>
                <p>{story.content}</p>
              </li>
            );
          })
        )}
      </ul>
    </main>
  );
}
