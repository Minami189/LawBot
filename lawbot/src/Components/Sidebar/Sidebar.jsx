import {
  SquaresFourIcon,
  ClockCounterClockwiseIcon,
  FileTextIcon,
  HouseIcon,
  UserCircleIcon,
  ListIcon
} from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import classes from "./Sidebar.module.css";
import logo from "../../assests/logo.png";
import { withBase } from "../../functions/withBase";

function Sidebar() {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 950;
      setIsMobile(mobile);
      setOpen(!mobile);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setOpen((v) => !v);

  return (
    <div className={classes.sidebarContainer}>
      {/* Backdrop for mobile when sidebar open */}
      {isMobile && open && (
        <div
          className={classes.backdrop}
          onClick={() => setOpen(false)}
          role="button"
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={`${classes.sidebar} ${open ? classes.open : classes.closed} ${
          isMobile ? classes.mobile : ""
        }`}
        aria-expanded={open}
      >
        {/* Top area: logo + burger (burger always visible) */}
        <div className={classes.topRow}>
          <button
            className={classes.logoBtn}
            onClick={toggleSidebar}
            aria-label={open ? "Minimize sidebar" : "Open sidebar"}
          >
            <img src={logo} className={classes.logo} alt="logo" />
          </button>

          {/* burger to mimic your previous closeBtn */}
          <button
            className={classes.burgerBtn}
            onClick={toggleSidebar}
            aria-label={open ? "Close sidebar" : "Open sidebar"}
          >
            <ListIcon size={20} />
          </button>
        </div>
          
        {/* Primary nav icons (stacked) */}
        <nav className={classes.nav}>
          <a href={withBase("/index.html")}>
            <button className={classes.iconBtn}>
              <HouseIcon size={24} />
              <span className={classes.label}>Home</span>
            </button>
          </a>
          <a href={withBase("/dashboard")}>
            <button className={classes.iconBtn}>
              <SquaresFourIcon size={24} />
              <span className={classes.label}>Dashboard</span>
            </button>
          </a>

          <a href={withBase("/summary")}>
            <button className={classes.iconBtn}>
              <FileTextIcon size={24} />
              <span className={classes.label}>Summary</span>
            </button>
          </a>

          <a href={withBase("/logs")}>
            <button className={classes.iconBtn}>
              <ClockCounterClockwiseIcon size={24} />
              <span className={classes.label}>History</span>
            </button>
          </a>
        </nav>
        
        <div className={classes.section}>
          {/*
          <p className={classes.sectionTitle + " " + classes.label}>Your chats</p>

          <ul className={classes.chatList}>
            <li><span className={classes.label}>Five-level text encryption</span></li>
            <li><span className={classes.label}>Sum and divide numbers</span></li>
            <li><span className={classes.label}>Signs and Wonders Teaser</span></li>
            <li><span className={classes.label}>AI legal document summary</span></li>
            <li><span className={classes.label}>Button copy suggestions</span></li>
          </ul>
          */}
        </div>

        <div className={classes.bottomSection}>
          <div className={classes.userBox}>
            <UserCircleIcon size={30} className={classes.userIcon} />
            <div className={classes.userInfo + " " + classes.label}>
              <p className={classes.userName}>A.P. Moon</p>
              <p className={classes.userPlan}>Free</p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar;