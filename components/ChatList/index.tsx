import React, { FC, useCallback, useState, VFC } from "react";
import { ChatZone, Section } from "@components/ChatList/styles";
import { IDM } from "@typings/db";
import Chat from "@components/Chat";

interface Props {
  chatData?: IDM[];
}

const ChatList: VFC<Props> = ({chatData}) => {
  return (
    <ChatZone>
      {chatData?.map((chat, index) => (
        <Chat key={chat.id || index} data={chat} />
      ))}
    </ChatZone>
  )
};

export default ChatList;