import {
  Channels,
  Chats,
  Header, LogOutButton, MenuScroll,
  ProfileImg, ProfileModal,
  RightMenu, WorkspaceName,
  Workspaces,
  WorkspaceWrapper
} from "@layouts/Workspace/styles";
import React, { FC, useCallback, useEffect, useState } from "react";
import useSWR, { mutate } from "swr";
import gravatar from "gravatar";
import axios from 'axios';
import fetcher from "@utils/fetcher";
import { Redirect } from "react-router";
import { Route, Switch } from "react-router-dom";
import loadable from "@loadable/component";
import Menu from '@components/Menu';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

interface IUser {
  id: number;
  email: string;
  nickname: string;
  // 기타 필요한 사용자 정보 필드
}

const Workspace : FC = ({children}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { data, mutate, error } = useSWR('/api/users', fetcher, {
    dedupingInterval: 1000 * 600,
    fallbackData: JSON.parse(localStorage.getItem('userData') || 'null'),
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem('userData', JSON.stringify(data));
    }
  }, [data]);

  // const { data, error, mutate } = useSWR('/api/users#123', fetcher, {    /// 요청은 같게 보내면서 동작을 다르게 하고 싶을 때
  //   dedupingInterval: 1000 * 60,
  // })

  // const {localStorageData} = useSWR('hello', (key) => {              // swr로 로컬스토리지를 전역관리자로 설정해서 관리
  //   localStorage.setItem('data', key); return localStorage.getItem('data');})

  const onLogout = useCallback(() => {
    axios
      .post('/api/users/logout', null, {
        withCredentials: true,
      })
      .then(() => {
        mutate(false, false);
      });
  }, []);

  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => ! prev);
  }, [])

  // if (!data && !error) {
  //   return <div>로딩중...</div>;
  // }

  // if (!data) {
  //   return <Redirect to="/login" />;
  // }

  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url((data as any).email, {s : '28px' , d : 'retro'})}
                        alt={(data as any).nickname}/>
            {showUserMenu && (
              <Menu style={{right:0, top:30}} show={showUserMenu} onCloseModal={onClickUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url((data as any).email, {s : '36px' , d : 'retro'})}
                       alt={(data as any).nickname}/>
                  <div>
                    <span id="profile-name">{(data as any).nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>test</Workspaces>
        <Channels>
          <WorkspaceName>Sleact</WorkspaceName>
          <MenuScroll>menu scroll </MenuScroll>
        </Channels>
        <Chats>
          <Switch>
            <Route path="/workspace/channel" component={Channel} />
            <Route path="/workspace/dm" component={DirectMessage} />
          </Switch>
        </Chats>
      </WorkspaceWrapper>
      {children}
    </div>
  )
}

export default Workspace;