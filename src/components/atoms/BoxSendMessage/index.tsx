import { useState } from "react"
import { IconButton, TextareaAutosize } from "@mui/material"
import AttachFileSharpIcon from "@mui/icons-material/AttachFileSharp"
import SendRoundedIcon from "@mui/icons-material/SendRounded"

export default function BoxSendMessage() {
  const [message, setMessage] = useState<string>()

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white p-5 px-8 flex items-center gap-2">
      <TextareaAutosize
        autoFocus
        maxRows={3}
        // {...field}
        placeholder="Write message here..."
        className="w-full bg-transparent hide-scrollbar outline-none p-2 resize-none text-sm placeholder:text-xs placeholder:pt-[3px]"
        onKeyDown={() => {
          // onKeyEnter(
          //   e,
          //   files.map(it => it.file)
          // )
          // if (e.keyCode === 13 && !e.shiftKey) {
          //   setFiles([])
          // }
        }}
        value={message}
        onChange={(v) => {
          setMessage(v.currentTarget.value)
          // field.onChange(v.currentTarget.value)
        }}
        // disabled={isDisableAll}
      />

      <IconButton className="">
        <AttachFileSharpIcon className="text-secondary400 rotate-45" />
      </IconButton>

      <IconButton
        onClick={() => setMessage("")}
        className="bg-primary rounded-[10px]"
      >
        <SendRoundedIcon className="text-white" />
      </IconButton>
    </div>
  )
}
