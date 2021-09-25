import { useQuery } from "react-query";
import Post from "./Post";
import {
  getReactions,
  getUserContentReactions,
  getUsers,
  logged_in
} from "./api";
import "./index.css";
import { getContentReactions } from "./utils";

function Home() {
  const { data: reactions_list } = useQuery("getReactions", getReactions);
  const { data: users } = useQuery("getUsers", getUsers);
  const { data: reactions } = useQuery(
    "getUserContentReactions",
    getUserContentReactions
  );

  if (reactions_list && users && reactions) {
    const content = [
      {
        id: 1,
        type: "TEXT",
        text: "Hello this is good post comment",
        posted_by: users[0]
      },
      {
        id: 2,
        type: "MEDIA",
        image: "/media/contentImage.jpeg",
        posted_by: users[1]
      }
    ];
    const contentReactions = getContentReactions(reactions);
    return (
      <div className="container">
        <p className="container_headerText">
          You are logged in as user id: {logged_in}
        </p>
        {content.map(item => {
          return (
            <Post
              key={item.id}
              reactions_list={reactions_list}
              content={item}
              content_reactions={contentReactions[item.id]}
            />
          );
        })}
      </div>
    );
  }
  return <h3>Loading...</h3>;
}

export default Home;
