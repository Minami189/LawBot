import classes from "../Styles/dashboard.module.css";
import fileIcon from "../assests/dashboard/fileIcon.png";
import bx_box from "../assests/dashboard/bx_box.png";
import FileText from "../assests/dashboard/FileText.png";
import Calendar from "../assests/dashboard/CalendarDots.png";
import Vector from "../assests/dashboard/Vector.png";
import Folder from "../assests/dashboard/Folder.png";
import Drives from "../assests/dashboard/HardDrives.png";
export default function Dashboard() {
  return (
    <div className={classes.DashboardContainer}>
  <div className={classes.Dashboard}>Dashboard</div>

  <div className={classes.dashboardText}>
    See your latest activities, analyzed documents, and insights at a glance.
    Stay organized and in control of your legal workflow.
  </div>

  {/* NEW FLEX WRAPPER */}
  <div className={classes.DashboardMainContent}>
    {/* LEFT SIDE */}
    <div className={classes.LeftSection}>
      <div className={classes.QuickActionsContainer}>
        <div className={classes.QuickActionsTitle}>Quick Actions</div>
        <div className={classes.QuickActionsButtons}>
          {/* Upload New Document */}
          <div className={classes.ActionBox}>
            <div className={classes.ActionContent}>
              <img src={fileIcon} alt="file icon" className={classes.ActionIcon} />
              <span className={classes.ActionText}>Upload New Document</span>
            </div>
          </div>

          {/* View Document History */}
          <div className={classes.ActionBox}>
            <div className={classes.ActionContent}>
              <img src={bx_box} alt="box icon" className={classes.ActionIcon} />
              <span className={classes.ActionText}>View Document History</span>
            </div>
          </div>
        </div>
      </div>

      <div className={classes.RecentSummariesContainer}>
        <div className={classes.RecentSummariesTitle}>Recent Summaries</div>
        <div className={classes.summaryCard}>
          <div className={classes.summaryHeader}>
            <div className={classes.summaryTitle}>
              Employment Contract - Jordan Poole
            </div>
            <div className={classes.summaryDescription}>
              Topics covered: Legal employment agreement with terms and conditions...
              <div className={classes.filesDetailsContainer}>
                <div className={classes.summaryDate}>
                  <img src={Calendar} alt="Calendar" className={classes.icon} />
                  November 05, 2025
                </div>
                <div className={classes.fileType}>
                  <img src={Vector} alt="Calendar" className={classes.icon} />
                  PDF
                </div>
              </div>
            </div>
          </div>
          <div className={classes.statusBadge}>
            <span className={classes.statusIcon}>✓</span>
            Success
          </div>
        </div>
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className={classes.RightSection}>
      <div className={classes.UsageStatsContainer}>
        <div className={classes.UsageStatsHeader}>
          <h3 className={classes.UsageStatsTitle}>Usage Statistics</h3>
        </div>

        <div className={classes.UsageStatsItem}>
          <div className={classes.UsageStatsText}>
            <span className={classes.UsageStatsLabel}>Documents Processed</span>
            <span className={classes.UsageStatsNumber}>24</span>
            <span className={classes.UsageStatsInfo}>+14% from last period</span>
          </div>
          <img src={Folder} alt="Folder" className={classes.UsageIconImage} />
        </div>

        <div className={classes.UsageStatsItem}>
          <div className={classes.UsageStatsText}>
            <span className={classes.UsageStatsLabel}>Storage Used</span>
            <span className={classes.UsageStatsNumber}>1.1 gb</span>
            <div className={classes.UsageBar}>
              <div className={classes.UsageBarFill}></div>
            </div>
            <span className={classes.UsageStatsInfo}>47% of 2.5 gb limit</span>
          </div>
          <img src={Drives} alt="Drives" className={classes.UsageIconImage} />
        </div>
      </div>
    </div>
  </div>
</div>

  );
}
