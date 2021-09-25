import { useQuery } from "react-query";
import Reactions from "../components/Reactions";
import {
  getReactions,
  getUserContentReactions,
  getUsers,
  logged_in
} from "../api";

function Post({ reactions_list, content, content_reactions }) {
  const postedBy = content.posted_by;
  return (
    <div
      style={{
        padding: 25,
        display: "flex"
      }}
    >
      <img
        src={postedBy.avatar}
        alt={postedBy.first_name}
        style={{
          height: 32,
          width: 32,
          marginRight: 8
        }}
      />
      <div>
        <p
          style={{
            fontWeight: "bold",
            fontSize: 14,
            lineHeight: "18px"
          }}
        >
          {postedBy.first_name} {postedBy.last_name}
        </p>
        {content.type === "TEXT" ? (
          <p
            style={{
              fontSize: 14,
              lineHeight: "18px",
              margin: "8px 0px"
            }}
          >
            {content.text}
          </p>
        ) : (
          <img
            src={content?.image}
            alt="scenary"
            style={{ height: 200, width: 223, margin: "8px 0px" }}
          />
        )}
        <Reactions
          data={reactions_list}
          content_reactions={content_reactions}
          content_id={content.id}
        />
      </div>
    </div>
  );
}

function getContentReactions(reactions) {
  const result = {};
  for (let i of reactions) {
    if (!result[i.content_id]) {
      result[i.content_id] = {};
    }
    const current_content_obj = result[i.content_id];
    if (!current_content_obj[i.reaction_id]) {
      current_content_obj[i.reaction_id] = [
        {
          reaction_id: i.id,
          user_id: i.user_id
        }
      ];
    } else {
      current_content_obj[i.reaction_id] = [
        ...current_content_obj[i.reaction_id],
        {
          reaction_id: i.id,
          user_id: i.user_id
        }
      ];
    }
  }
  return result;
}

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
    console.log(contentReactions);
    return (
      <div style={{ margin: 50 }}>
        <p style={{ marginBottom: 24, paddingLeft: 25 }}>
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
