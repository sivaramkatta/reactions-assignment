import { useState } from "react";
import "./Reaction.css";
import { logged_in, addReaction, deleteReaction } from "../api";
import { useMutation } from "react-query";
import react from "react";

function getEmoji(id, reactionData) {
  return reactionData.find(item => item.id == id);
}

function TotalTile({
  emojiData,
  reaction_data,
  setReactions,
  content_reactions,
  addReactionMutation,
  deleteeReactionMutation,
  content_id
}) {
  const selected = reaction_data.some(item => item.user_id === logged_in);
  if (reaction_data.length === 0) {
    return null;
  }
  return (
    <div
      onClick={async () => {
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
      }}
      style={{
        padding: 8,
        backgroundColor: selected ? "#EDF5FF" : "#F4F4F4",
        border: selected ? "1px solid #0F62FE" : "1px solid #FFFFFF",
        borderRadius: 100,
        height: 32,
        cursor: "pointer",
        marginRight: 6
      }}
    >
      <p
        style={{
          fontSize: 12,
          lineHeight: "16px",
          color: "#525252"
        }}
      >
        {emojiData.emoji} . {reaction_data.length}
      </p>
    </div>
  );
}

function Reactions({ data, content_reactions, content_id }) {
  const [show, setShow] = useState(false);
  const [reactions, setReactions] = useState(content_reactions);
  const reactionTypes = Object.keys(reactions);
  const addReactionMutation = useMutation(addReaction);
  const deleteeReactionMutation = useMutation(deleteReaction);
  let timer;
  return (
    <div style={{ display: "flex" }}>
      {reactionTypes.map(item => {
        const emojiData = getEmoji(item, data);
        return (
          <TotalTile
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
        onClick={() => {
          setShow(prev => !prev);
        }}
        onMouseLeave={() => {
          timer = setTimeout(() => {
            setShow(false);
          }, 800);
        }}
        style={{
          height: 32,
          width: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#EDEEF0",
          borderRadius: 100,
          border: "1px solid #FFFFFF",
          cursor: "pointer",
          position: "relative"
        }}
      >
        {show && (
          <div
            onClick={e => {
              e.stopPropagation();
            }}
            onMouseEnter={() => {
              clearTimeout(timer);
            }}
            style={{
              position: "absolute",
              height: 32,
              border: "1px solid #E0E0E0",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.03)",
              borderRadius: 24,
              display: "flex",
              padding: "7px 13px",
              width: 233,
              top: -37,
              backgroundColor: "white"
            }}
          >
            {data.map(item => (
              <div className="emojiDiv" key={item.id}>
                <p
                  key={item.id}
                  className="emojiIcon"
                  onClick={async () => {
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
                      await deleteeReactionMutation.mutateAsync(
                        item_obj.reaction_id
                      );
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
                  }}
                >
                  {item.emoji}
                </p>
                <div className="tooltip">
                  <p className="reactionName">{item.name}</p>
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

export default Reactions;
