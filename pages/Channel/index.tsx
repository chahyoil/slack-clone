import React, { useCallback } from "react";
import Workspace from "@layouts/Workspace";
import { Container, Header } from "@pages/Channel/styles";
import useInput from "@hooks/useInput";
import gravatar from "gravatar";
import useSWR from "swr";
import { IUser } from "@typings/db";
import fetcher from "@utils/fetcher";
import ChatList from "@components/ChatList";
import ChatBox from "@components/ChatBox";
import workspace from "@layouts/Workspace";
import { useParams } from "react-router";

const Channel = () => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string }>();
  const [chat, onChangeChat] = useInput('');
  const { data: userData, error, mutate } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000, // 2초
  });
  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    if(chat?.trim()) {
      // axios.post(`/api/workspaces/${workspace}/dms/${id}/chats`)
    }
  }, []);

  if(!userData) {
    return null
  }

  return (
    <Container>
      <Header>
        <img src={gravatar.url(userData?.email, {s:'24px', d : 'retro'})} alt = {userData?.nickname} />
        <span>{userData?.nickname}</span>
      </Header>
      <ChatList/>
      <ChatBox chat ={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm}/>
    </Container>
  )
}

export default Channel;