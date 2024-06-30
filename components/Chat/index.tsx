import React, { VFC } from "react";
import { ChatWrapper } from "@components/Chat/styles";
import gravatar from "gravatar";
import { IChat, IDM } from "@typings/db";
import { useParams } from "react-router";

interface Props {
  data: IDM | IChat;
}

const Chat : VFC<Props> = ({data} : Props) => {
  const { workspace } = useParams<{ workspace: string; channel: string }>();
  const user = 'Sender' in data ? data.Sender : data.User;

  if (!data || !user) {
    return null;
  }

  return (
    <ChatWrapper>
      <div className="chat-img">
        <img src={gravatar.url(user?.email, { s: '36px', d: 'retro' })} alt={user?.nickname} />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>{user?.nickname}</b>
          <span>{data.createdAt}</span>
        </div>
        <p>{data.content}</p>
      </div>
    </ChatWrapper>
  )
};

export default Chat;