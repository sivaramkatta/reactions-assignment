import ReactionList from "./ReactionList";

function Post({ reactions_list, content, content_reactions }) {
  const postedBy = content.posted_by;
  return (
    <div className="post">
      <img
        className="post_avatar"
        src={postedBy.avatar}
        alt={postedBy.first_name}
      />
      <div>
        <p className="post_postedBy">
          {postedBy.first_name} {postedBy.last_name}
        </p>
        {content.type === "TEXT" ? (
          <p className="post_text">{content.text}</p>
        ) : (
          <img className="post_media" src={content?.image} alt="scenary" />
        )}
        <ReactionList
          data={reactions_list}
          content_reactions={content_reactions}
          content_id={content.id}
        />
      </div>
    </div>
  );
}

export default Post;
