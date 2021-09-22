import { useState } from "react";
import "./Reaction.css";
import { ReactComponent as ReactLogo } from "../media/addReactionIcon.svg";

const data = [
  {
    id: 1,
    name: "Like",
    emoji: "👍"
  },
  {
    id: 2,
    name: "Love",
    emoji: "❤️"
  },
  {
    id: 3,
    name: "Haha",
    emoji: "😂"
  },
  {
    id: 4,
    name: "Wow",
    emoji: "😮"
  },
  {
    id: 5,
    name: "Sad",
    emoji: "😥"
  },
  {
    id: 6,
    name: "Angry",
    emoji: "😡"
  }
];

function Reactions() {
  const [show, setShow] = useState(false);
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          padding: 8,
          backgroundColor: "#F4F4F4",
          border: "1px solid #FFFFFF",
          borderRadius: 100,
          height: 32,
          cursor: "pointer",
          marginRight: 6
        }}
      >
        <p
          style={{
            fontFamily: "IBM Plex Sans",
            fontSize: 12,
            lineHeight: "16px",
            color: "#525252"
          }}
        >
          {data[0].emoji} . 12
        </p>
      </div>
      <div
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
            style={{
              position: "absolute",
              height: 32,
              border: "1px solid #E0E0E0",
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.03)",
              borderRadius: 24,
              display: "flex",
              padding: "7px 13px",
              width: 233,
              top: -37
            }}
          >
            {data.map(item => (
              <div className="emojiDiv">
                <p key={item.id} className="emojiIcon">
                  {item.emoji}
                </p>
                <div className="tooltip">
                  <p className="reactionName">{item.name}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <ReactLogo
          style={{ marginRight: 1 }}
          onClick={() => {
            setShow(prev => !prev);
          }}
        />
      </div>
    </div>
  );
}

export default Reactions;
