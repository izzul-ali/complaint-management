import {
  Button,
  Divider,
  Step,
  StepButton,
  Stepper,
  Tooltip,
} from "@mui/material"
import PersonPinCircleOutlinedIcon from "@mui/icons-material/PersonPinCircleOutlined"
import WatchLaterOutlinedIcon from "@mui/icons-material/WatchLaterOutlined"
import ManageHistoryOutlinedIcon from "@mui/icons-material/ManageHistoryOutlined"
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined"
import InputFile from "../../../atoms/Input/InputFile"
import InputMultiline from "../../../atoms/Input/InputMultiline"

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

        <h2 className="mt-10 font-semibold text-xl text-secondary">
          Description
        </h2>

        <p className="mt-5 text-sm text-secondary leading-6 hyphens-auto tracking-wide">
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
      <section className="p-5 w-[372px] h-full overflow-auto bg-white rounded-md">
        <h1 className="font-semibold text-xl text-secondary">
          Laporan Hasil Kerja Teknisi
        </h1>

        {/* Technician */}
        <div className="flex items-center gap-2 mt-3">
          <EngineeringOutlinedIcon className="text-secondary400 w-4 h-4" />

          <span className="block text-sm font-medium text-secondary400">
            Hisyam Arsyad - A1301
          </span>
        </div>

        {/* Detail Customer */}
        <h2 className="mt-8 font-semibold text-lg text-secondary">
          Detail Customer
        </h2>

        <div className="mt-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary400 font-medium">
              Nama Customer
            </span>
            <span className="flex-1 w-full text-right text-sm text-secondary font-semibold">
              Santika Dewi
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary400 font-medium">Type</span>
            <span className="flex-1 w-full text-right text-sm text-secondary font-semibold">
              Broadband
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-secondary400 font-medium">
              Jumlah Complaint
            </span>
            <span className="flex-1 w-full text-right text-sm text-secondary font-semibold">
              1
            </span>
          </div>
        </div>

        {/* Report */}
        <h2 className="mt-8 mb-5 font-semibold text-lg text-secondary">
          Laporan
        </h2>

        <div className="space-y-3">
          <InputFile label="File submissions" />

          <InputMultiline label="Note" />

          <Button className="w-full py-2.5" variant="contained">
            Submit
          </Button>
        </div>
      </section>
    </section>
  )
}
