import {
  PencilSimpleIcon,
  MagnifyingGlassIcon,
  StackIcon,
  StarIcon,
  UserCircleIcon
} from "@phosphor-icons/react";
import { useState } from "react";
import classes from "./Navbar.module.css";
import logo from "../../assests/logo.png";

function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside className={classes.sidebarWrapper}>
      {/* MINI BAR (always visible) */}
      <div className={classes.miniBar}>
        <img
          src={logo}
          className={classes.logo}
          alt="logo"
          onClick={() => setOpen(!open)}
        />

        <PencilSimpleIcon size={22} className={classes.icon} />
        <MagnifyingGlassIcon size={22} className={classes.icon} />
        <StackIcon size={22} className={classes.icon} />

        <div className={classes.bottomIcons}>
          <StarIcon size={22} className={classes.icon} />
          <UserCircleIcon size={22} className={classes.userIcon} />
        </div>
      </div>

      {/* FULL SIDEBAR WITH SMOOTH COLLAPSE */}
      <div
        className={`${classes.fullSidebar} ${open ? classes.open : classes.closed}`}
      >
        <div className={classes.section}>
          <button className={`${classes.newChatBtn} ${classes.fade}`}>
            ＋ New chat
          </button>

          <button className={`${classes.rowBtn} ${classes.fade}`}>
            <PencilSimpleIcon size={20} />
            <span>New chat</span>
          </button>
          <button className={`${classes.rowBtn} ${classes.fade}`}>
            <MagnifyingGlassIcon size={20} />
            <span>Search chats</span>
          </button>
          <button className={`${classes.rowBtn} ${classes.fade}`}>
            <StackIcon size={20} />
            <span>Library</span>
          </button>
          <button className={`${classes.rowBtn} ${classes.fade}`}>
            <StackIcon size={20} />
            <span>Projects</span>
          </button>
        </div>

        <div className={`${classes.section} ${classes.fade}`}>
          <p className={classes.sectionTitle}>Your chats</p>

          <ul className={classes.chatList}>
            <li>Five-level text encryption</li>
            <li>Sum and divide numbers</li>
            <li>Signs and Wonders Teaser</li>
            <li>AI legal document summary</li>
            <li>Button copy suggestions</li>
          </ul>
        </div>

        <div className={`${classes.bottomSection} ${classes.fade}`}>
          <div className={classes.userBox}>
            <UserCircleIcon size={32} />
            <div>
              <p className={classes.userName}>A.P. Moon</p>
              <p className={classes.userPlan}>Free</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;