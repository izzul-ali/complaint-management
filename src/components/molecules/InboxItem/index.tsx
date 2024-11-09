import { Avatar, ListItemButton, Tooltip, Zoom } from "@mui/material"
import { InboxCustomer } from "../../../interface/conversation"
import { dateFormat } from "../../../utils/helper/dateFormat"

interface Props {
  inbox: InboxCustomer
  isSelected: boolean
  onClick: () => void
}

export default function InboxItem({ inbox, isSelected, onClick }: Props) {
  return (
    <ListItemButton
      onClick={() => onClick()}
      selected={isSelected}
      className={`outline-none w-full mt-2 p-2 rounded-lg h-fit transition-all duration-100 hover:bg-[#FAFAFA] flex gap-2`}
    >
      <Avatar
        alt={inbox.customerName}
        // src={inbox.profile}
        className="w-9 h-9"
      />

      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-neutral90">
            {inbox.customerName}
          </span>
          <span className="text-xs font-medium text-neutral70">
            {dateFormat(inbox.lastMessageTime)}
          </span>
        </div>

        <div className="flex items-center justify-between mt-0.5">
          <Tooltip
            title={
              (inbox?.lastMessage?.length ?? 0) > 30
                ? inbox.lastMessage
                : undefined
            }
            TransitionComponent={Zoom}
            enterDelay={1000}
          >
            <span className="text-xs text-neutral60 whitespace-nowrap block max-w-[220px] overflow-hidden text-ellipsis">
              {inbox.lastMessage}
            </span>
          </Tooltip>
        </div>
      </div>
    </ListItemButton>
  )
}
