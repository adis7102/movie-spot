export type MovieListItem = {
  id: string,
  poster_path: string,
  backdrop_path: string,
  title: string,
  vote_average: number,
  overview: string,
  popularity: number,
  release_date: Date,
  vote_count: number
}

export type InitialState = {
  movieList: MovieListItem[],
  totalPage: number
}

export type MovieList = {
  page: string,
  results: MovieListItem[],
  total_pages: number,
  total_results: number
}

export type MovieListStorageType = {
  favouriteMovies: MovieListItem[] | null;
};

export type CommentDataType = {
  senderUsername: string;
  comment: string;
};

export type ListCommentType = {
  movieId: string;
  listComment: CommentDataType[];
};

export type CommentStorageType = {
  comments: ListCommentType[];
};

export type UserDataType = {
  username: string;
  email: string;
};