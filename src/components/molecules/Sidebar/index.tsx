import React, { useState } from "react"
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { navigationList } from "../../../utils/helper/list"
import { useNavigate, useLocation } from "react-router-dom"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"
import { useAuth } from "../../../hooks/useAuth"
import { hasPermssion } from "../../../utils/helper/permission"

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const auth = useAuth()

  const [open, setOpen] = useState(false)

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: 245 },
        flexShrink: { sm: 0 },
        backgroundColor: "white",
      }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      {/* <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer> */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 252 },
        }}
        open
      >
        <div className="h-[70px] flex items-center shadow-sm gap-2 pl-6 mb-4">
          <img src="/images/primary-icon.png" alt="" />
          <span className="text-secondary font-semibold text-xl">Nuegas</span>
        </div>
        {/* <Divider /> */}
        <List>
          {navigationList.map((it) => {
            const isActive = location.pathname === it.url

            const isHasPermission = hasPermssion(
              it.roles,
              (auth?.user?.role_name ?? "-") as any
            )

            if (!isHasPermission) {
              return <React.Fragment key={it.name}></React.Fragment>
            }

            return (
              <React.Fragment key={it.name}>
                <ListItemButton
                  selected={isActive}
                  onClick={() => {
                    if (it.submenu) {
                      setOpen(!open)
                    } else {
                      navigate(it.url)
                    }
                  }}
                  className="rounded-lg"
                >
                  <ListItemIcon
                    className={`min-w-0 mr-4 ${
                      isActive ? "text-secondary" : "text-secondary300"
                    }`}
                  >
                    {it.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={it.name}
                    sx={{ fontSize: "10px" }}
                    className={`font-semibold text-[10px] ${
                      isActive ? "text-secondary" : "text-secondary300"
                    }`}
                  />

                  {it?.submenu && (
                    <>
                      {open ? (
                        <ExpandLess className="text-secondary300" />
                      ) : (
                        <ExpandMore className="text-secondary300" />
                      )}
                    </>
                  )}
                </ListItemButton>
                {it.submenu && (
                  <Collapse
                    className="block"
                    in={open}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List
                      component="div"
                      disablePadding={false}
                      className="block"
                    >
                      {it.submenu.map((sub) => {
                        const isSubmenuActive = location.pathname.includes(
                          sub.url
                        )

                        const isSubmenuHasPermission = hasPermssion(
                          sub.roles,
                          (auth?.user?.role_name ?? "-") as any
                        )

                        if (!isSubmenuHasPermission) {
                          return <React.Fragment key={it.name}></React.Fragment>
                        }

                        return (
                          <ListItemButton
                            sx={{ pl: 7 }}
                            onClick={() => navigate(sub.url)}
                          >
                            <ListItemText
                              primary={sub.name}
                              sx={{ fontSize: "10px" }}
                              className={`font-semibold text-[10px] ${
                                isSubmenuActive
                                  ? "text-secondary"
                                  : "text-secondary300"
                              }`}
                            />
                          </ListItemButton>
                        )
                      })}
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            )
          })}
        </List>
      </Drawer>
    </Box>
  )
}
