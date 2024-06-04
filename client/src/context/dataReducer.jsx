const initialState = { ads: [], users: [], comments: [], categories: [], tags: [], error: null };

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_ADS":
      return { ...state, ads: action.payload, error: null };
    case "FETCH_USERS":
      return { ...state, users: action.payload, error: null };
    case "FETCH_CATEGORIES":
      return { ...state, categories: action.payload, error: null };
    case "FETCH_TAGS":
      return { ...state, tags: action.payload, error: null };
    case "FETCH_COMMENTS":
      return { ...state, comments: action.payload, error: null };

    case "LIKE_COMMENT_SUCCESS":
      const updatedAdsWithCommentsAndLikes = state.ads.docs.map((ad) => {
        if (ad.id === action.payload.advertisement) {
          ad.comments = ad._comments.map((comment) => {
            if (comment.id === action.payload.id) {
              return action.payload;
            }
            return comment;
          });
        }
        return ad;
      });
      return { ...state, ads: { ...state.ads, docs: updatedAdsWithCommentsAndLikes }, error: null };
    case "DISLIKE_COMMENT_SUCCESS":
      const updatedAdsWithCommentsAndDislikes = state.ads.docs.map((ad) => {
        if (ad.id === action.payload.advertisement) {
          ad._comments = ad._comments.map((comment) => {
            if (comment.id === action.payload.id) {
              return action.payload;
            }
            return comment;
          });
        }
        return ad;
      });
      return { ...state, ads: { ...state.ads, docs: updatedAdsWithCommentsAndDislikes }, error: null };
    case "FETCH_ERROR":
    case "FETCH_USERS_ERROR":
    case "FETCH_COMMENTS_ERROR":
    case "FETCH_CATEGORIES_ERROR":
    case "FETCH_TAGS_ERROR":
    case "CREATE_AD_ERROR":
    case "CREATE_COMMENT_ERROR":
    case "UPDATE_AD_ERROR":
    case "UPDATE_COMMENT_ERROR":
    case "DELETE_AD_ERROR":
    case "DELETE_COMMENT_ERROR":
    case "LIKE_COMMENT_ERROR":
    case "DISLIKE_COMMENT_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export { initialState, reducer };
