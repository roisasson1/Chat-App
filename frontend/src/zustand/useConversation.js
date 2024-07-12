import { create } from 'zustand';

const useConversation = create((set) => (
    // it's kind of useState with object syntax
    {selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
}))

export default useConversation;