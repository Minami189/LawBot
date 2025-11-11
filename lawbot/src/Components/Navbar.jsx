import { useRef, useState, useEffect } from "react";
import { XIcon, GavelIcon, ListIcon, CaretRightIcon, CaretDownIcon } from "@phosphor-icons/react";
import classes from "../Styles/main.module.css";
import logo from "../assests/logo.png";

function Navbar() {
  const navRef = useRef();
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if viewport is mobile
  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth <= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const showNavbar = () => {
    setOpenSidebar(!openSidebar);
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

	return (
		<div className={classes.mainNavigation}>
			<header className={classes.header}>
				{/* Logo */}
				<div className={classes.leftHeader}>
					<img src={logo} alt="logo" className={classes.logo}/>
					<p className={classes.name}>LawBot</p>
				</div>

				{/* Desktop Navigation */}
				<nav className={classes.centerNav}>
					{/* Home */}
					<div className={`${classes.navItem} ${
							openDropdown === "about" ? classes.activeDropdown : ""
						}`}>
						<a href="/#">Home</a>
						<span className={classes.underline}></span>
					</div>

					{/* About Us Dropdown */}
					<div
						className={`${classes.navItem} ${
							openDropdown === "about" ? classes.activeDropdown : ""
						}`}
						onClick={() => isMobile && toggleDropdown("about")}
						onMouseEnter={() => !isMobile && setOpenDropdown("about")}
						onMouseLeave={() => !isMobile && setOpenDropdown(null)}
					>
						<a href="/#">About Us</a>
						<span className={classes.underline}></span>
						<div
							className={`${classes.dropdownMenu} ${
								openDropdown === "about" ? classes.open : ""
							}`}
						>
							<a href="/#mission">Mission & Vision</a>
							<a href="/#team">Our Team</a>
							<a href="/#history">History</a>
						</div>
					</div>

					{/* Help Dropdown */}
					<div
						className={`${classes.navItem} ${
							openDropdown === "help" ? classes.activeDropdown : ""
						}`}
						onClick={() => isMobile && toggleDropdown("help")}
						onMouseEnter={() => !isMobile && setOpenDropdown("help")}
						onMouseLeave={() => !isMobile && setOpenDropdown(null)}
					>
						<a href="/#">Help</a>
						<span className={classes.underline}></span>
						<div
							className={`${classes.dropdownMenu} ${
								openDropdown === "help" ? classes.open : ""
							}`}
						>
							<a href="/#faq">FAQ</a>
							<a href="/#support">Support</a>
						</div>
					</div>
				</nav>

				{/* Right side buttons */}
				<div className={classes.rightNav}>
					<a href="/Login" className={classes.btnLogin}>
							Login
					</a>
					<a href="/signup">
						<button className={classes.btnTrial}>
							<span className={classes.btnIconWrapper}>
								<GavelIcon weight="fill" className={classes.btnIconFill}/>
								<GavelIcon weight="bold" className={classes.btnIconReg} />
							</span> &nbsp;
							Get Free
						</button>
					</a>
				</div>
				
				{/* Burger button */}
				<button className={classes.navBtn} onClick={showNavbar}>
					<ListIcon size={28} />
				</button>

				{/* Sidebar (mobile) */}
				<nav
					ref={navRef}
					className={`${classes.sidebar} ${openSidebar ? classes.showSidebar : ""}`}
				>
					<button
						className={`${classes.navBtn} ${classes.navCloseBtn}`}
						onClick={showNavbar}
					>
						<XIcon size={28} />
					</button>

					<a href="/#">Home</a>

					<div className={classes.sidebarDropdown}>
						<button
							onClick={() => toggleDropdown("about-side")}
							className={classes.sidebarToggle}
						>
							About Us
							{openDropdown === "about-side" ? (
								<CaretDownIcon size={20} />
							) : (
								<CaretRightIcon size={20} />
							)}
						</button>
						<div
							className={`${classes.sidebarDropdownMenu} ${
								openDropdown === "about-side" ? classes.open : ""
							}`}
						>
							<a href="/#mission">Mission & Vision</a>
							<a href="/#team">Our Team</a>
							<a href="/#history">History</a>
						</div>
					</div>

					<div className={classes.sidebarDropdown}>
						<button
							onClick={() => toggleDropdown("help-side")}
							className={classes.sidebarToggle}
						>
							Help
							{openDropdown === "help-side" ? (
								<CaretDownIcon size={20} />
							) : (
								<CaretRightIcon size={20} />
							)}
						</button>
						<div
							className={`${classes.sidebarDropdownMenu} ${
								openDropdown === "help-side" ? classes.open : ""
							}`}
						>
							<a href="/#faq">FAQ</a>
							<a href="/#support">Support</a>
						</div>
					</div>

					<a href="/Login">Login</a>
					<a href="/#trial" className={classes.tryBtn}>
						Try For Free
					</a>
				</nav>
			</header>
		</div>
  );
}

export default Navbar;