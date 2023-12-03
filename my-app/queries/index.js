import { gql } from "@apollo/client";

export const LOGIN = gql`
  query Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      statusCode
      message
      error
      data {
        token
        userId
      }
    }
  }
`;
export const REGISTER = gql`
  mutation Register($input: Register) {
    register(input: $input) {
      statusCode
      message
      error
      data {
        name
      }
    }
  }
`;
export const GET_POST = gql`
  query ReadAllPosts {
    readAllPosts {
      statusCode
      message
      error
      data {
        _id
        content
        tags
        imgUrl
        authorId
        comments {
          content
          authorId
          createdAt
          updatedAt
        }
        likes {
          authorId
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const ADD_POST = gql`
  mutation AddPost($input: AddPost) {
    addPost(input: $input) {
      statusCode
      message
      error
    }
  }
`;
export const GET_USER_BY_ID = gql`
  query Query($userId: ID!) {
    user(id: $userId) {
      statusCode
      message
      error
      data {
        _id
        name
        username
        password
        email
      }
    }
  }
`;
export const GET_USER_DETAIL = gql`
  query FollowDetail($followDetailId: ID) {
    followDetail(id: $followDetailId) {
      statusCode
      message
      error
      data {
        _id
        name
        username
        email
        followers {
          _id
          username
        }
        following {
          _id
          username
        }
      }
    }
  }
`;
export const GET_POST_DETAIL = gql`
  query ReadOnePost($readOnePostId: ID!) {
    readOnePost(id: $readOnePostId) {
      statusCode
      message
      error
      data {
        _id
        content
        tags
        imgUrl
        authorId
        comments {
          content
          authorId
          createdAt
          updatedAt
        }
        likes {
          authorId
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const FIND_USER = gql`
  query User($username: String!) {
    user(username: $username) {
      statusCode
      message
      error
      data {
        _id
        name
        username
        password
        email
      }
    }
  }
`;

export const FOLLOW = gql`
  mutation Follow($input: CreateFollowing) {
    follow(input: $input) {
      statusCode
      message
      error
      data {
        _id
        followingId
        followerId
        createdAt
        updatedAt
      }
    }
  }
`;
