import React, { useCallback, useRef } from "react";
import Workspace from "@layouts/Workspace";
import { Container } from "@pages/Channel/styles";
import { Header } from "@pages/DirectMessage/styles";
import gravatar from "gravatar";
import useSWR from "swr";
import workspace from "@layouts/Workspace";
import fetcher from "@utils/fetcher";
import { useParams } from "react-router";
import ChatBox from "@components/ChatBox";
import useInput from "@hooks/useInput";
import axios from "axios";
import useSWRInfinite from "swr/infinite";
import { IDM } from "@typings/db";
import Scrollbars from 'react-custom-scrollbars';
import ChatList from "@components/ChatList";

const DirectMessage = () => {
  const { workspace, id } = useParams<{ workspace: string; id: string }>();
  const { data: userData, mutate } = useSWR(`/api/workspaces/${workspace}/users/${id}`, fetcher);
  const {data : myData} = useSWR(`/api/users`, fetcher)
  const [chat, onChangeChat, setChat] = useInput('');
  const { data: chatData, mutate: mutateChat, setSize } = useSWRInfinite<IDM>(
    (index) => `/api/workspaces/${workspace}/dms/${id}/chats?perPage=20&page=${index + 1}`,
    fetcher,
  );
  const scrollbarRef = useRef<Scrollbars>(null);

  const onSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log(chat);
      if (chat?.trim() && chatData) {
        const savedChat = chat;
        mutateChat((prevChatData) => {
          prevChatData?.unshift({
            id: (chatData[0]?.id || 0) + 1,
            content: savedChat,
            SenderId: myData.id,
            Sender: myData,
            ReceiverId: userData.id,
            Receiver: userData,
            createdAt: new Date(),
          });
          return prevChatData;
        }, false).then(() => {
          setChat('');
          scrollbarRef.current?.scrollToBottom();
        });
        axios
          .post(`/api/workspaces/${workspace}/dms/${id}/chats`, {
            content: chat,
          })
          .then(() => {
            mutate();
          })
          .catch(console.error);
      }
    },
    [chat, chatData, myData, userData, workspace, id],
  );


  if(!userData || !myData) {
    return null
  }

  return (
    <Container>
      <Header>
      <img src={gravatar.url(userData.email, {s: '24px', d: 'retro'})} alt={userData.nickname}></img>
        <span>{userData.nickname}</span>
      </Header>
      <ChatList chatData={chatData}/>
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
    </Container>
  )
}

export default DirectMessage;