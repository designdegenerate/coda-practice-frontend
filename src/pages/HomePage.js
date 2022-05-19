import { useEffect } from "react";
import reactDom from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import HeroBanner from "../components/HeroBanner";
import { fetchSpaces } from "../store/spaces/actions";
import {areSpacesLoading, selectAllSpaces} from "../store/spaces/selectors";

export default function HomePage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(areSpacesLoading);
  const getSpaces = useSelector(selectAllSpaces);

  useEffect(() => {
    dispatch(fetchSpaces());
  }, [dispatch]);

  return (
    <main>
      <HeroBanner>
        <h1>Home</h1>
      </HeroBanner>
      <ul>
        {isLoading? 
        <li>loading</li> :
        getSpaces.map( space => {
          return (
            <li
            style={{
              color: space.color ? space.color : "#000",
              backgroundColor: space.backgroundColor ? space.backgroundColor : ""
            }}
            key={space.id}
            >
              <h2>{space.title}</h2>
              <p>{space.description}</p>
              <Link to={`/spaces/${space.id}`}>Visit space</Link>
              
            </li>
          )
        })
        }
      </ul>
    </main>
  );
}
