import { Channels, Header, ProfileImg, RightMenu, Workspaces, WorkspaceWrapper } from "@layouts/Workspace/styles";
import React, { FC, useCallback, useEffect } from "react";
import useSWR, { mutate } from "swr";
import gravatar from "gravatar";
import axios from 'axios';
import fetcher from "@utils/fetcher";
import { Redirect } from "react-router";

interface IUser {
  id: number;
  email: string;
  nickname: string;
  // 기타 필요한 사용자 정보 필드
}

const Workspace : FC = ({children}) => {
  const { data, mutate, error } = useSWR('/api/users', fetcher, {
    dedupingInterval: 1000 * 600,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // const { data, error, mutate } = useSWR('/api/users#123', fetcher, {    /// 요청은 같게 보내면서 동작을 다르게 하고 싶을 때
  //   dedupingInterval: 1000 * 60,
  // })

  // const {localStorageData} = useSWR('hello', (key) => {              // swr로 로컬스토리지를 전역관리자로 설정해서 관리
  //   localStorage.setItem('data', key); return localStorage.getItem('data');})

  const onLogout = useCallback(() => {
    axios.post('/api/users/logout', null, {
      withCredentials: true,
    })
      .then(() => {
        mutate(null, false);
      })
  }, [])

  // return <div>로딩중...</div>;

  if (!data) {
    return <div>로딩중...</div>;
  }

  if (!data) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span>
            <ProfileImg src={gravatar.url((data as any).email, {s : '28px' , d : 'retro'})}
                        alt={(data as any).nickname}/>
          </span>
        </RightMenu>
      </Header>
      <button onClick={onLogout}>로그아웃</button>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>Channel</Channels>
      </WorkspaceWrapper>
      {children}
    </div>
  )
}

export default Workspace;