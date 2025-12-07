import {
  PencilSimpleIcon,
  MagnifyingGlassIcon,
  StackIcon,
  StarIcon,
  UserCircleIcon
} from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import classes from "./Navbar.module.css";
import logo from "../../assests/logo.png";

function Sidebar() {
  const [open, setOpen] = useState(true);

  // Auto-hide on small screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 950) setOpen(false);
      else setOpen(true);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside className={`${classes.sidebarWrapper} ${open ? classes.open : classes.closed}`}>
      
      {/* Mini Left Bar */}
      <div className={classes.miniBar}>
        <img src={logo} className={classes.logo} alt="logo" />

        <button onClick={() => setOpen(!open)} className={classes.iconBtn}>
          <PencilSimple size={22} className={classes.icon} />
        </button>

        <MagnifyingGlass size={22} className={classes.icon} />
        <Stack size={22} className={classes.icon} />

        <div className={classes.bottomIcons}>
          <Star size={22} className={classes.icon} />
          <UserCircle size={22} className={classes.userIcon} />
        </div>
      </div>

      {/* Main Sidebar Content */}
      <div className={classes.fullSidebar}>
        <div className={classes.section}>
          <button className={classes.newChatBtn}>＋ New chat</button>

          <button className={classes.rowBtn}>
            <PencilSimple size={20} />
            <span>New chat</span>
          </button>
          <button className={classes.rowBtn}>
            <MagnifyingGlass size={20} />
            <span>Search chats</span>
          </button>
          <button className={classes.rowBtn}>
            <Stack size={20} />
            <span>Library</span>
          </button>
          <button className={classes.rowBtn}>
            <Stack size={20} />
            <span>Projects</span>
          </button>
        </div>

        <div className={classes.section}>
          <p className={classes.sectionTitle}>Your chats</p>

          <ul className={classes.chatList}>
            <li>Five-level text encryption</li>
            <li>Sum and divide numbers</li>
            <li>Signs and Wonders Teaser</li>
            <li>AI legal document summary</li>
            <li>Button copy suggestions</li>
          </ul>
        </div>

        <div className={classes.bottomSection}>
          <div className={classes.userBox}>
            <UserCircle size={32} />
            <div className={classes.userInfo}>
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