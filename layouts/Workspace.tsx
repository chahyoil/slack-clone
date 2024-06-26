import React, { FC, useCallback } from "react";
import useSWR from "swr";
import axios from 'axios';
import fetcher from "@utils/fetcher";
import { Redirect } from "react-router";

const Workspace : FC = ({children}) => {
  const { data, error, mutate } = useSWR('/api/users', fetcher, {
    dedupingInterval: 1000 * 60,
  })

  const onLogout = useCallback(() => {
    axios.post('/api/users/logout', null, {
      withCredentials: true,
    })
      .then(() => {
        mutate();
      })
  }, [])

  if (data === undefined) {
    return <div>로딩중...</div>;
  }

  if (!data) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <button onClick={onLogout}>로그아웃</button>
      {children}
    </div>
  )
}

export default Workspace;