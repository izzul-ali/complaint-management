import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import { navigationList } from "../../../utils/helper/list"
import { useNavigate, useLocation } from "react-router-dom"

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  //   const container =
  //     window !== undefined ? () => window.document.body : undefined

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

            return (
              <ListItem key={it.url}>
                <ListItemButton
                  selected={isActive}
                  onClick={() => navigate(it.url)}
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
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </Drawer>
    </Box>
  )
}
