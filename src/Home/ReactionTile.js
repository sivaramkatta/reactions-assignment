import { logged_in } from "./api";

function ReactionTile({
  emojiData,
  reaction_data,
  setReactions,
  content_reactions,
  addReactionMutation,
  deleteeReactionMutation,
  content_id
}) {
  const handleEmojiTileClick = async () => {
    let index, item_obj;
    for (let i = 0; i < reaction_data.length; i++) {
      if (reaction_data[i].user_id === logged_in) {
        index = i;
        item_obj = reaction_data[i];
        break;
      }
    }
    if (index >= 0) {
      await deleteeReactionMutation.mutateAsync(item_obj.reaction_id);
      reaction_data.splice(index, 1);
    } else {
      const resp = await addReactionMutation.mutateAsync({
        user_id: logged_in,
        reaction_id: emojiData.id,
        content_id
      });
      reaction_data.push({ user_id: logged_in, reaction_id: resp.id });
    }
    setReactions({ ...content_reactions });
  };

  const selected = reaction_data.some(item => item.user_id === logged_in);

  if (reaction_data.length > 0) {
    return (
      <div
        className="reactionTile_contaner"
        onClick={async () => handleEmojiTileClick()}
        style={{
          backgroundColor: selected ? "#EDF5FF" : "#F4F4F4",
          border: selected ? "1px solid #0F62FE" : "1px solid #FFFFFF"
        }}
      >
        <p className="reactionTile_name">
          {emojiData.emoji} . {reaction_data.length}
        </p>
      </div>
    );
  }
  return null;
}

export default ReactionTile;
