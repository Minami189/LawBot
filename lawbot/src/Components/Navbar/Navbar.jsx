import { useRef, useState, useEffect } from "react";
import { XIcon, GavelIcon, ListIcon, CaretRightIcon, CaretDownIcon, SignInIcon } from "@phosphor-icons/react";
import classes from "./Navbar.module.css";
import logo from "../../assests/logo.png";
import { withBase } from "../../functions/withBase";

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
					<img src={logo} alt="Lawbot Logo" className={classes.logo}/>
					<p className={classes.name}>LawBot</p>
				</div>

				{/* Desktop Navigation */}
				<nav className={classes.centerNav}>
					{/* Home */}
					<div className={`${classes.navItem} ${
							openDropdown === "about" ? classes.activeDropdown : ""
						}`}>
						<a href={withBase("/")}>Home</a>
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
						<a href={withBase("/about")}>About Us</a>
						<span className={classes.underline}></span>
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
						<a href={withBase("/help")}>Help</a>
						<span className={classes.underline}></span>
					</div>
				</nav>

				{/* Right side buttons */}
				<div className={classes.rightNav}>
					<a href={withBase("/login")} className={classes.btnLogin}>
							Login
					</a>
					<a href={withBase("/signup")}>
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

					<div className={classes.sidebarTop}>
						<a className={classes.btnHome} href={withBase("/index.html")}>Home</a>
						<a className={classes.btnHome} href={withBase("/about")}>About Us</a>
						<a className={classes.btnHome} href={withBase("/help")}>Help</a>
					</div>
					<hr />
					<div className={classes.sidebarBottom}>
						<a href={withBase("/login")}>
							<button className={classes.btnSidebarLogin}>
								<span className={classes.btnIconWrapper}>
									<SignInIcon weight="bold" className={classes.btnIconReg} />
								</span> &nbsp;
								Login
							</button>
						</a>
						<a href={withBase("/signup")}>
							<button className={classes.btnSidebarTrial}>
								<span className={classes.btnIconWrapper}>
									<GavelIcon weight="fill" className={classes.btnIconFill}/>
									<GavelIcon weight="bold" className={classes.btnIconReg} />
								</span> &nbsp;
								Try Free
							</button>
						</a>
					</div>
				</nav>
			</header>
		</div>
  	);
}

export default Navbar;