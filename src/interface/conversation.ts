export interface InboxCustomer {
  inboxCustomerId: string
  customerId?: string
  profile: string // url
  customerEmail: string
  //   customerCategory: string
  customerName: string
  lastMessage: string
  lastMessageTime: string
}

export interface ChatConversation {
  chatCustomerId?: string
  inboxCustomerId: string
  type: "outbound" | "inbound"
  message: string
  file?: string | null
  fileName?: string
  fileSize?: string | number
  fileExtension?: string
  createdAt: string
}
