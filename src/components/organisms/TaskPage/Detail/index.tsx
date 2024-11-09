import { Divider, Step, StepButton, Stepper, Tooltip } from "@mui/material"
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined"
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined"
import ManageHistoryOutlinedIcon from "@mui/icons-material/ManageHistoryOutlined"

export default function TaskDetailPage() {
  return (
    <section className="flex gap-5 h-full overflow-hidden p-5">
      <section className="p-5 flex-1 w-full bg-white rounded-md overflow-auto">
        <h1 className="font-semibold text-2xl text-secondary">
          Masalah Wifi Tidak Bisa Terbuhung Setelah Mati Listrik
        </h1>

        <div className="my-5 flex items-center gap-3">
          <PersonPinCircleOutlinedIcon className="text-secondary400 w-5 h-5" />
          <span className="text-sm font-medium text-secondary400">
            Santika Dewi
          </span>
          <Divider orientation="vertical" variant="fullWidth" flexItem />
          <span className="text-sm font-medium text-secondary400">
            Jl. Merpati No. 52, Solobaru, Jawa Tengah
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Tooltip title="Tiket Complaint dibuat">
            <div className="flex items-center gap-3 cursor-pointer">
              <WatchLaterOutlinedIcon className="text-secondary400 w-5 h-5" />

              <span className="text-sm font-medium text-secondary400">
                Nov 07,2024 - 16.47
              </span>
            </div>
          </Tooltip>

          <Divider orientation="vertical" variant="fullWidth" flexItem />

          <Tooltip title="Perkiraan waktu service">
            <div className="flex items-center gap-3 cursor-pointer">
              <ManageHistoryOutlinedIcon className="text-warning700 w-5 h-5" />

              <span className="text-sm font-medium text-secondary400">
                Nov 08,2024 - 09.00
              </span>
            </div>
          </Tooltip>
        </div>

        <h2 className="mt-14 font-semibold text-xl text-secondary">
          Description
        </h2>

        <p className="mt-5 text-sm text-secondary leading-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, ea
          velit. Illo amet perferendis possimus magnam officia corrupti quos
          quisquam, optio laboriosam pariatur suscipit numquam hic velit nam,
          soluta quia sunt. Ipsam eos amet laboriosam voluptatum consectetur
          provident harum, dolore exercitationem nulla sit animi ea alias earum
          deleniti, quia doloribus aspernatur minus voluptates quod enim dolorem
          commodi, minima quasi. Magnam quia accusantium hic ex culpa
          perspiciatis numquam dolore consequuntur magni libero quos dicta
          velit, amet nisi tempore molestias reiciendis. Ad, est deleniti
          veritatis cum minus ducimus vero laboriosam at ipsam. Est, eveniet
          distinctio ducimus rerum repudiandae dolore earum explicabo
          blanditiis?
        </p>

        <h2 className="mt-10 mb-5 font-semibold text-xl text-secondary">
          Teknisi
        </h2>

        <Stepper nonLinear orientation="vertical">
          {["Izzul", "Ravi", "Hisyam"].map((name, index) => (
            <Step key={index} completed>
              <StepButton
                icon={
                  <span className="h-7 w-7 flex items-center justify-center text-white font-semibold text-xs rounded-full bg-primary">
                    {index + 1}
                  </span>
                }
                color="inherit"
                className="w-fit"
              >
                {name}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </section>
      <section className="p-5 w-[372px] h-full bg-white rounded-md"></section>
    </section>
  )
}
