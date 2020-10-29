import * as actionTypes from '../actions/actionTypes';

const initialState = {
  posts: null,
  postLoadLoading: false,
  postLoadError: null,
  addPostLoading: false,
  addPostError: null,
  addPostSuccess: false,
  postComplete: false,
  likeError: null,
  commentLoading: false,
  commentSuccess: false,
  commentError: null,
  limit: 5,
  page: 0
};

const updatedArr = (arr) => {
  return arr.map(item => {
    return {
      ...item,
      likes: [...item.likes],
      dislikes: [...item.dislikes],
      comments: item.comments.map(comment => {
        return {
          ...comment,
          user: {
            ...comment.user
          }
        };
      }),
      user: {
        ...item.user
      }
    };
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ON_PAGE_INC:
      return {
        ...state,
        posts: updatedArr(state.posts),
        page: state.page + 1
      };
    case actionTypes.ON_POST_LOAD_START:
      return {
        ...state,
        postLoadLoading: true,
        postLoadError: null
      };
    case actionTypes.ON_POST_LOAD_SUCCESS:
      let initialPost = [];
      if (state.posts) {
        initialPost = [...state.posts];
      }
      initialPost = [...initialPost, ...action.posts];
      let cleanPosts = [...initialPost];
      if (initialPost.length > 0) {
        cleanPosts = initialPost.reduce((acc, current) => {
          const x = acc.find(item => {
            return item.post_id === current.post_id;
          });
          if(!x) {
            return acc.concat(current);
          }else {
            return acc;
          }
        }, []);
      }
      return {
        ...state,
        posts: cleanPosts,
        postLoadLoading: false,
        postLoadError: null
      };
    case actionTypes.ON_POST_LOAD_FAIL:
      return {
        ...state,
        postLoadLoading: false,
        postLoadError: action.error
      };
    case actionTypes.ON_ADD_POST_START:
      return {
        ...state,
        addPostLoading: true,
        addPostError: null
      };
    case actionTypes.ON_ADD_POST_SUCCESS:
      if (!state.posts) {
        state.posts = [];
      }
      return {
        ...state,
        posts: updatedArr(state.posts).concat(action.post),
        addPostLoading: false,
        addPostSuccess: true,
        addPostError: null
      };
    case actionTypes.ON_ADD_POST_SUCCESS_CLEAR:
      return {
        ...state,
        posts: updatedArr(state.posts),
        addPostSuccess: false
      }
    case actionTypes.ON_ADD_POST_FAIL:
      return {
        ...state,
        posts: updatedArr(state.posts),
        addPostError: action.error,
        addPostLoading: false
      };
    case actionTypes.ON_ADD_POST_ERROR_CLEAR:
      return {
        ...state,
        addPostError: null,
        addPostLoading: false
      }
    case actionTypes.ON_LIKE_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.post_id === action.post.post_id) {
            post.likes = [...action.post.likes];
            post.dislikes = [...action.post.dislikes];
          }
          return post;
        }),
        likeError: null
      };
    case actionTypes.ON_LIKE_FAIL:
      return {
        ...state,
        post: updatedArr(state.posts),
        likeError: action.error
      };
    case actionTypes.ON_DISLIKE_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.post_id === action.post.post_id) {
            post.likes = [...action.post.likes];
            post.dislikes = [...action.post.dislikes];
          }
          return post;
        }),
        likeError: null
      };
    case actionTypes.ON_DISLIKE_FAIL:
      return {
        ...state,
        posts: updatedArr(state.posts),
        likeError: action.error
      };
    case actionTypes.ON_DELETE_POST_START:
      return {
        ...state,
        posts: updatedArr(state.posts),
        loading: true,
        error: null
      };
    case actionTypes.ON_DELETE_POST_SUCCESS:
      const updatedPosts = state.posts.filter(post => {
        return post.post_id !== action.postId;
      });
      return {
        ...state,
        posts: updatedPosts,
        loading: false,
        error: null
      };
    case actionTypes.ON_DELETE_POST_FAIL:
      return {
        ...state,
        posts: updatedArr(state.posts),
        loading: false,
        error: action.error
      };
    case actionTypes.ON_COMMENT_START:
      return {
        ...state,
        posts: updatedArr(state.posts),
        commentLoading: true,
        commentError: null
      };
    case actionTypes.ON_COMMENT_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post => {
          if(+post.post_id === +action.postId) {
            post.comments = post.comments.concat(action.comment);
          }
          return post;
        }),
        commentLoading: false,
        commentError: null,
        commentSuccess: true
      };
    case actionTypes.ON_COMMENT_SUCCESS_CLEAR:
      return {
        ...state,
        posts: updatedArr(state.posts),
        commentSuccess: false
      }
    case actionTypes.ON_COMMENT_FAIL:
      return {
        ...state,
        posts: updatedArr(state.posts),
        commentLoading: false,
        commentError: action.error
      }
    case actionTypes.ON_COMMENT_ERROR_CLEAR:
      return {
        ...state,
        posts: updatedArr(state.posts),
        commentError: null
      }
    case actionTypes.ON_COMMENT_DELETE_START:
      return {
        ...state,
        posts: updatedArr(state.posts),
        commentLoading: true,
        commentError: null
      }
    case actionTypes.ON_COMMENT_DELETE_SUCCESS:
      const thisPost = state.posts.find(post => {
        return post.post_id === action.postId
      });
      thisPost.comments = thisPost.comments.filter(comment => {
        return comment.comment_id !== action.commentId;
      })
      return {
        ...state,
        posts: state.posts.map(post => {
          if(post.post_id === action.postId) {
            return thisPost;
          }
          return post;
        }),
        commentLoading: false,
        commentError: null
      }
    case actionTypes.ON_COMMENT_DELETE_FAIL:
      return {
        ...state,
        posts: updatedArr(state.posts),
        commentLoading: false,
        commentError: action.error
      }
    default:
      return state;
  };
};

export default reducer;