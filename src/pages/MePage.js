import { useSelector } from "react-redux";
import {
  selectToken,
  selectUser,
} from "../store/user/selectors";

export default function MePage() {
  const user = useSelector(selectUser);
  const hasToken = useSelector(selectToken);

  //See Reference [1]
  const sortByDate = (a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB > dateA;
  };

  return (
    <div>
      {hasToken && user !== null ? (
        <div>
          <div
            className="some-space-header"
            style={{
              color: user.space.color ? user.space.color : "#000",
              backgroundColor: user.space.backgroundColor 
                ? user.space.backgroundColor 
                : "",
            }}
          >
            <h1>{user.space.title}</h1>
            <p>{user.space.description}</p>
          </div>
          <ul className="stories-list">
            {[...user.space.stories].sort(sortByDate).map((story) => {
              return (
                <li key={story.id}>
                  <img alt="" src={story.imageURL}></img>
                  <h2>{story.name}</h2>
                  <p>{story.content}</p>
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>Please login to view your profile</p>
      )}
    </div>
  );
}
