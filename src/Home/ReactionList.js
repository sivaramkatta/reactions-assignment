import { useState } from "react";
import { useMutation } from "react-query";
import ReactionTile from "./ReactionTile";
import { logged_in, addReaction, deleteReaction } from "./api";

function getEmoji(id, reactionData) {
  return reactionData.find(item => item.id == id);
}

function ReactionList({ data, content_reactions, content_id }) {
  const [show, setShow] = useState(false);
  const [reactions, setReactions] = useState(content_reactions);
  const addReactionMutation = useMutation(addReaction);
  const deleteeReactionMutation = useMutation(deleteReaction);
  const reactionTypes = Object.keys(reactions);
  let timer;

  const handleEmojiClick = async item => {
    let reaction_list = reactions[item.id];
    if (!reaction_list) {
      reactions[item.id] = [];
      reaction_list = reactions[item.id];
    }
    let index, item_obj;
    for (let i = 0; i < reaction_list.length; i++) {
      if (reaction_list[i].user_id === logged_in) {
        index = i;
        item_obj = reaction_list[i];
        break;
      }
    }
    if (index >= 0) {
      await deleteeReactionMutation.mutateAsync(item_obj.reaction_id);
      reaction_list.splice(index, 1);
    } else {
      const resp = await addReactionMutation.mutateAsync({
        user_id: logged_in,
        reaction_id: item.id,
        content_id
      });
      reaction_list.push({
        user_id: logged_in,
        reaction_id: resp.id
      });
    }
    setReactions({ ...reactions });
  };

  return (
    <div className="reactions">
      {reactionTypes.map(item => {
        const emojiData = getEmoji(item, data);
        return (
          <ReactionTile
            key={item.reaction_id}
            emojiData={emojiData}
            reaction_data={reactions[item]}
            content_reactions={content_reactions}
            setReactions={setReactions}
            deleteeReactionMutation={deleteeReactionMutation}
            addReactionMutation={addReactionMutation}
            content_id={content_id}
          />
        );
      })}
      <div
        className="rections_listIcon"
        onClick={() => setShow(prev => !prev)}
        onMouseLeave={() => {
          timer = setTimeout(() => {
            setShow(false);
          }, 800);
        }}
      >
        {show && (
          <div
            className="reaction_listContainer"
            onClick={e => e.stopPropagation()}
            onMouseEnter={() => clearTimeout(timer)}
          >
            {data.map(item => (
              <div key={item.id}>
                <p
                  key={item.id}
                  className="reaction_emojiIcon"
                  onClick={() => handleEmojiClick(item)}
                >
                  {item.emoji}
                </p>
                <div className="reaction_tooltip">
                  <p className="reaction_reactionName">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <img
          src="/media/addReactionIcon.svg"
          alt="addReaction"
          style={{ marginRight: 1 }}
        />
      </div>
    </div>
  );
}

export default ReactionList;
