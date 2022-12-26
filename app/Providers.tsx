"use client";
import React from 'react'
import {ApolloProvider} from "@apollo/client"
import {apolloClient} from "../lib/apollo"


type Props = {
    children: React.ReactNode
}

const Providers = ({children}: Props) => {
  return (
    <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
  )
}

export default Providers