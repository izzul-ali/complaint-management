import { useState } from "react"
import { List } from "@mui/material"
import InboxItem from "../../molecules/InboxItem"
import { InboxCustomer } from "../../../interface/conversation"
import InputSearch from "../../atoms/Search"
import Conversation from "../../molecules/Conversation"
import SpeakerNotesOutlinedIcon from "@mui/icons-material/SpeakerNotesOutlined"

const inboxCustomers: InboxCustomer[] = [
  {
    inboxCustomerId: "cust-1",
    profile: "https://source.unsplash.com/random/200x200/?portrait,indonesia",
    customerEmail: "dwi.setyawan@gmail.com",
    customerName: "Dwi Setyawan",
    lastMessage: "Apakah produk ini bisa COD?",
    lastMessageTime: "2023-11-23T13:15:24Z",
  },
  {
    inboxCustomerId: "cust-2",
    profile: "https://source.unsplash.com/random/200x200/?woman,balinese",
    customerEmail: "rini.puspitasari@yahoo.com",
    customerName: "Rini Puspitasari",
    lastMessage: "Kapan pengiriman pesanan saya?",
    lastMessageTime: "2023-11-22T16:42:05Z",
  },
  {
    inboxCustomerId: "cust-3",
    profile: "https://source.unsplash.com/random/200x200/?man,jogja",
    customerEmail: "hadi.sutrisno@outlook.com",
    customerName: "Hadi Sutrisno",
    lastMessage: "Bagaimana cara mengembalikan barang?",
    lastMessageTime: "2023-11-21T10:25:32Z",
  },
  {
    inboxCustomerId: "cust-4",
    profile: "https://source.unsplash.com/random/200x200/?portrait,jakarta",
    customerEmail: "santika.dewi@gmail.com",
    customerName: "Santika Dewi",
    lastMessage: "Apakah ada promo terbaru?",
    lastMessageTime: "2023-11-20T14:35:24Z",
  },
  {
    inboxCustomerId: "cust-5",
    profile: "https://source.unsplash.com/random/200x200/?woman,sumatra",
    customerEmail: "ayu.lestari@yahoo.com",
    customerName: "Ayu Lestari",
    lastMessage: "Berapa lama estimasi pengiriman?",
    lastMessageTime: "2023-11-19T17:12:05Z",
  },
  {
    inboxCustomerId: "cust-6",
    profile: "https://source.unsplash.com/random/200x200/?man,surabaya",
    customerEmail: "eko.purnomo@outlook.com",
    customerName: "Eko Purnomo",
    lastMessage: "Bagaimana cara pembayarannya?",
    lastMessageTime: "2023-11-18T11:45:32Z",
  },
  {
    inboxCustomerId: "cust-7",
    profile: "https://source.unsplash.com/random/200x200/?portrait,bandung",
    customerEmail: "dinda.permata@gmail.com",
    customerName: "Dinda Permata",
    lastMessage: "Apakah produk ini original?",
    lastMessageTime: "2023-11-17T15:35:24Z",
  },
  {
    inboxCustomerId: "cust-8",
    profile: "https://source.unsplash.com/random/200x200/?woman,makassar",
    customerEmail: "silvia.rahmawati@yahoo.com",
    customerName: "Silvia Rahmawati",
    lastMessage: "Kapan promo diskon berakhir?",
    lastMessageTime: "2023-11-16T18:12:05Z",
  },
  {
    inboxCustomerId: "cust-9",
    profile: "https://source.unsplash.com/random/200x200/?man,medan",
    customerEmail: "indra.wijaya@outlook.com",
    customerName: "Indra Wijaya",
    lastMessage: "Bagaimana cara merawat produk ini?",
    lastMessageTime: "2023-11-15T12:45:32Z",
  },
]

export interface ChatConversation {
  chatCustomerId?: string
  inboxCustomerId: string
  type: "inbound" | "outbound"
  message: string
  file?: string | null
  fileName?: string
  fileSize?: string | number
  fileExtension?: string
  createdAt: string
}

export default function ConversationPage() {
  const [selectedCustoemr, setSelectedCustoemr] = useState<InboxCustomer>()

  return (
    <section className="flex h-[90%] overflow-hidden">
      {/* Inbox */}
      <section className="w-[400px] h-full bg-white">
        <div className="p-5">
          <InputSearch placeholder="Search  Name" />
        </div>

        <div className="overflow-auto h-full pb-10">
          <div className="px-5 h-full space-y-0.5">
            <List sx={{ gap: 10 }}>
              {/* <TransitionGroup appear> */}
              {inboxCustomers.map((it) => {
                const selected =
                  selectedCustoemr?.inboxCustomerId === it.inboxCustomerId

                return (
                  // <Collapse key={it.inboxCustomerId} unmountOnExit>
                  <InboxItem
                    key={it.inboxCustomerId + it.lastMessage}
                    inbox={it}
                    isSelected={selected}
                    onClick={() => setSelectedCustoemr(it)}
                  />
                  // </Collapse>
                )
              })}
              {/* </TransitionGroup> */}
            </List>
          </div>
        </div>
      </section>

      {/* Conversation */}
      {selectedCustoemr ? (
        <Conversation
          selectedCustoemr={selectedCustoemr}
          onCloseConversation={() => setSelectedCustoemr(undefined)}
        />
      ) : (
        <div className="h-full w-full flex-1 flex flex-col gap-2 items-center justify-center">
          <SpeakerNotesOutlinedIcon className="text-secondary300 w-8 h-8" />
          <span className="font-semibold text-secondary300 text-lg block w-fit">
            Select one of the chats from the left sidebar
          </span>
        </div>
      )}
    </section>
  )
}
