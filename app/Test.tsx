"use client";
import React from 'react'
import { gql, useQuery } from "@apollo/client"

type Props = {}

const AllLinksQuery = gql`
    query {
        allLinks {
            nodes {
                category
                createdAt
                title
            }
        }
    }
`

const Test = (props: Props) => {

    const {data, error, loading} = useQuery(AllLinksQuery);

    console.log(data)

    return (
        <div>Test</div>
    )
}

export default Test