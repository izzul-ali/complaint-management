import React from "react"
import { Avatar, Button, IconButton } from "@mui/material"
import dayjs from "dayjs"
import {
  ChatConversation,
  InboxCustomer,
} from "../../../interface/conversation"
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined"
import BoxSendMessage from "../../atoms/BoxSendMessage"

const chatConversations: ChatConversation[] = [
  {
    inboxCustomerId: "cust-1",
    type: "inbound",
    message: "Pesanan saya belum sampai, sudah 3 hari!",
    createdAt: dayjs().subtract(1, "day").format("YYYY-MM-DDTHH:mm:ssZ"),
  },
  {
    inboxCustomerId: "cust-1",
    type: "outbound",
    message:
      "Kami mohon maaf atas keterlambatannya. Pesanan Anda akan segera kami kirim.",
    createdAt: dayjs().subtract(30, "minutes").format("YYYY-MM-DDTHH:mm:ssZ"),
  },
  {
    inboxCustomerId: "cust-2",
    type: "inbound",
    message: "Produk yang saya terima rusak.",
    createdAt: dayjs().subtract(2, "days").format("YYYY-MM-DDTHH:mm:ssZ"),
  },
  {
    inboxCustomerId: "cust-2",
    type: "outbound",
    message:
      "Kami akan segera memproses pengembalian produk Anda. Silakan lampirkan foto produk yang rusak.",
    createdAt: dayjs().subtract(1, "hour").format("YYYY-MM-DDTHH:mm:ssZ"),
  },
]

interface Props {
  selectedCustoemr: InboxCustomer
  onCloseConversation: () => void
}

export default function Conversation({
  selectedCustoemr,
  onCloseConversation,
}: Props) {
  return (
    <section className="w-full h-full flex-1 relative">
      <div className="bg-white h-[80px] px-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconButton onClick={() => onCloseConversation()}>
            <CloseOutlinedIcon />
          </IconButton>
          <Avatar
            alt={selectedCustoemr.customerName}
            // src={selectedCustoemr.profile}
            className="w-9 h-9"
          />

          <span className="font-semibold">{selectedCustoemr.customerName}</span>
        </div>

        <Button variant="contained">Create Ticket</Button>
      </div>

      <div className="flex-1 h-full overflow-auto p-7 space-y-2">
        {chatConversations.map((item, idx) => {
          if (!item.message && !item.file) {
            return <React.Fragment key={idx}></React.Fragment>
          }

          const isRightPosition = item.type === "outbound"

          return (
            <div
              key={idx}
              // ref={el => {
              //   messageRefs.current[idx] = el
              // }}
              className={`flex ${
                isRightPosition ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex gap-2 w-fit max-w-[65%]">
                <div
                  className={`flex flex-col ${
                    isRightPosition ? "items-end" : "items-start"
                  } gap-1`}
                >
                  {item.file ? (
                    <></>
                  ) : (
                    <span
                      className={`px-4 py-2 text-sm font-medium rounded-[10px] border w-fit ${
                        isRightPosition
                          ? `text-white bg-primary  rounded-tr-none`
                          : "bg-white rounded-tl-none"
                      }`}
                    >
                      {item.message}
                    </span>
                  )}

                  <div className={`flex items-center gap-2`}>
                    <span
                      className={`text-neutral70 text-xs ${
                        isRightPosition && "text-right"
                      }`}
                    >
                      {dayjs(item.createdAt).format("MMM DD,YYYY - HH.mm")}
                    </span>
                  </div>
                </div>
                {/* {isRightPosition && (
                    <Avatar className="w-6 h-6 bg-[#6785E1] text-xs font-medium">
                      {getChipInitials(mainConversation.agentName ?? '')?.toUpperCase()}
                    </Avatar>
                  )} */}
              </div>
            </div>
          )
        })}
        {/* <div ref={messagesEndRef} /> */}
      </div>

      <BoxSendMessage />
    </section>
  )
}
