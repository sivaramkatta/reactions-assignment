export function getContentReactions(reactions) {
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
