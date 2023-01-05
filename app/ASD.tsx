"use client";

import React from "react";
import { useQuery, gql, useSubscription } from "@apollo/client";
import { json } from "stream/consumers";

type Props = {};

const COMMENTS_SUBSCRIPTION = gql`
  subscription {
    links {
      nodes {
        category
        createdAt
        description
        id
        imageUrl
        nodeId
        title
        updatedAt
        url
      }
    }
  }
`;

const ASD = (props: Props) => {
  const { data, loading } = useSubscription(COMMENTS_SUBSCRIPTION);

  console.log(data);

  return <div>{JSON.stringify(data)}</div>;
};

export default ASD;
