'use client';

import React, { useState } from 'react';
import { Search, ArrowLeft, MoreVertical, Send, Bed, Maximize2, Layers } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  avatar: string;
  text: string;
  timestamp: string;
}

interface PropertyListing {
  image: string;
  title: string;
  price: string;
  bedrooms: number;
  size: string;
  floor: string;
}

export default function ChatPage() {
  const [messageInput, setMessageInput] = useState('');
  const [selectedChat, setSelectedChat] = useState('Jessica Jones');

  const chatList: Message[] = [
    { id: '1', sender: 'Jessica Jones', avatar: '👩‍💼', text: 'Great plan! The price is slightly negotia...', timestamp: 'Today' },
    { id: '2', sender: 'Guy Hawkins', avatar: '👨‍💼', text: 'this place looks beautiful! Is it still available?', timestamp: 'Today' },
    { id: '3', sender: 'Cody Fisher', avatar: '👨‍🦰', text: 'this place looks beautiful! Is it still available?', timestamp: 'Today' },
    { id: '4', sender: 'Arlene McCoy', avatar: '👩', text: 'this place looks beautiful! Is it still available?', timestamp: 'Today' },
    { id: '5', sender: 'Bessie Cooper', avatar: '👨', text: 'this place looks beautiful! Is it still available?', timestamp: 'Yesterday' },
    { id: '6', sender: 'Kristin Watson', avatar: '👩‍🦱', text: 'this place looks beautiful! Is it still available?', timestamp: 'Yesterday' },
    { id: '7', sender: 'Esther Howard', avatar: '👩‍🦳', text: 'this place looks beautiful! Is it still available?', timestamp: 'Yesterday' }
  ];

  const property: PropertyListing = {
    image: "/images/realstate-image.png",
    title: 'Flat / apartment for sale in plaza España, 12',
    price: '€692,000',
    bedrooms: 3,
    size: '60,5m²',
    floor: '2 Floor'
  };

  const conversationMessages = [
    { sender: 'other', text: 'this place looks beautiful! Is it still available?', isProperty: false },
    { 
      sender: 'me', 
      text: "Hi there! 😊 Yes, it's still available. It's a 3-bedroom flat, 60.5m², located on the 2nd floor. Are you looking to buy for yourself or as an investment?",
      isProperty: false 
    },
    { 
      sender: 'other', 
      text: 'Mostly for investment, but I might live in it for a while too. The price is €692,000 — is that negotiable?',
      isProperty: false 
    },
    { 
      sender: 'me', 
      text: 'Great plan! The price is slightly negotiable depending on the offer. The unit is fully renovated and located in a very sought-after area, which helps with both resale and rental demand.',
      isProperty: false 
    }
  ];

  return (
    <div className="flex h-full bg-[#f4f6fb]">
      {/* Sidebar - Chat List */}
      <div className="w-120 border-r border-gray-200 flex flex-col">
        {/* Search Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search your chat"
              className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {/* Today */}
          <div className="font-inter px-4 py-2 text-xs font-semibold text-gray-500">Today</div>
          {chatList.filter(chat => chat.timestamp === 'Today').map(chat => (
            <div
              key={chat.id}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                selectedChat === chat.sender ? 'bg-gray-50' : ''
              }`}
              onClick={() => setSelectedChat(chat.sender)}
            >
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-2xl">
                {chat.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-inter font-semibold text-sm text-gray-900">{chat.sender}</h3>
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </div>
                <p className="font-inter text-sm text-gray-600 truncate">{chat.text}</p>
              </div>
            </div>
          ))}

          {/* Yesterday */}
          <div className="font-inter px-4 py-2 text-xs font-semibold text-gray-500 mt-2">Yesterday</div>
          {chatList.filter(chat => chat.timestamp === 'Yesterday').map(chat => (
            <div
              key={chat.id}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                selectedChat === chat.sender ? 'bg-gray-50' : ''
              }`}
              onClick={() => setSelectedChat(chat.sender)}
            >
              <div className="w-12 h-12 rounded-full bg-linear-to-br from-green-400 to-blue-500 flex items-center justify-center text-2xl">
                {chat.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-inter font-semibold text-sm text-gray-900">{chat.sender}</h3>
                  <MoreVertical className="w-4 h-4 text-gray-400" />
                </div>
                <p className="font-inter text-sm text-gray-600 truncate">{chat.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col rounded-3xl">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center text-xl">
              👩‍💼
            </div>
            <h2 className="font-inter font-semibold text-gray-900">{selectedChat}</h2>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreVertical className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {/* Conversation Messages */}
          {conversationMessages.map((msg, idx) => (
            <div key={idx} className={`mb-4 flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-xl px-4 py-3 rounded-2xl ${
                  msg.sender === 'me'
                    ? 'font-inter bg-cyan-200 text-gray-900 '
                    : 'font-inter bg-gray-200 text-gray-900'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Enter message"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-50 border bprder-gray-400 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-cyan-400 font-inter "
            />
            <button className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors">
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}