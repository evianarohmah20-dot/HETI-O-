import { useState, useEffect } from "react";
import { Home, FileText, Clock, User, Sun, Moon } from "lucide-react";
import { SplashScreen } from "./components/SplashScreen";
import { AuthScreen } from "./components/AuthScreen";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { HomeScreen } from "./components/HomeScreen";
import { CaptureGuideScreen } from "./components/CaptureGuideScreen";
import { CameraScreen } from "./components/CameraScreen";
import { PreviewScreen } from "./components/PreviewScreen";
import { ProcessingScreen } from "./components/ProcessingScreen";
import { ReportScreen } from "./components/ReportScreen";
import { ActionScreen } from "./components/ActionScreen";
import { FindDentistScreen } from "./components/FindDentistScreen";
import { HistoryScreen } from "./components/HistoryScreen";
import { ProfileScreen } from "./components/ProfileScreen";
import "../styles/fonts.css";

type Screen =
  | "splash"
  | "login"
  | "register"
  | "onboarding-1"
  | "onboarding-2"
  | "onboarding-3"
  | "home"
  | "capture-guide"
  | "camera"
  | "preview"
  | "processing"
  | "report"
  | "action-plan"
  | "find-dentist"
  | "history"
  | "profile";

type AnimClass = "screen-fade" | "screen-slide-right" | "screen-slide-left" | "screen-slide-up";

const BOTTOM_NAV_SCREENS: Screen[] = ["home", "report", "history", "profile"];

const FULLSCREEN_SCREENS: Screen[] = ["splash", "camera", "preview", "processing"];

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [animClass, setAnimClass] = useState<AnimClass>("screen-fade");
  const [animKey, setAnimKey] = useState(0);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    document.body.style.background = isDark ? "#080E18" : "#F0F4F8";
  }, [isDark]);

  function navigate(to: Screen, anim: AnimClass = "screen-slide-right") {
    setAnimClass(anim);
    setAnimKey((k: number) => k + 1);
    setScreen(to);
  }

  const showBottomNav = BOTTOM_NAV_SCREENS.includes(screen);
  const isFullscreen = FULLSCREEN_SCREENS.includes(screen);
  const showThemeToggle = !isFullscreen;

  const activeTab =
    screen === "home"    ? "home"
    : screen === "report" ? "report"
    : screen === "history"? "history"
    : screen === "profile"? "profile"
    : null;

  // Bottom nav tap handler — always "fade" transition for tabs
  const tabNav = (tab: Screen) => navigate(tab, "screen-fade");

  return (
    <div
      className="min-h-svh flex items-start justify-center font-['Inter',system-ui,sans-serif]"
      style={{ background: isDark ? "#030811" : "#CBD5E1" }}
    >
      {/* Mobile frame */}
      <div
        className={`w-full max-w-[390px] relative overflow-x-hidden shadow-[0_0_60px_rgba(0,0,0,0.25)]`}
        style={{
          minHeight: "100svh",
          background: isDark ? "#080E18" : "#F0F4F8",
        }}
      >
        {/* Theme toggle — skip on fullscreen screens */}
        {showThemeToggle && (
          <button
            onClick={() => setIsDark(!isDark)}
            className="fixed z-[300] w-9 h-9 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-md shadow-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 active:scale-90 transition-transform"
            style={{ top: "16px", right: "max(16px, calc((100vw - 390px) / 2 + 16px))" }}
          >
            {isDark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        )}

        {/* Screen layer */}
        <div key={animKey} className={animClass} style={{ willChange: "transform" }}>
          {screen === "splash" && (
            <SplashScreen onDone={() => navigate("login", "screen-fade")} />
          )}

          {screen === "login" && (
            <AuthScreen
              defaultTab="login"
              onLogin={() => navigate("home", "screen-slide-right")}
              onSwitchToRegister={() => navigate("register", "screen-slide-right")}
            />
          )}

          {screen === "register" && (
            <AuthScreen
              defaultTab="register"
              onLogin={() => navigate("login", "screen-slide-left")}
              onSwitchToRegister={() => navigate("onboarding-1", "screen-slide-right")}
            />
          )}

          {(screen === "onboarding-1" ||
            screen === "onboarding-2" ||
            screen === "onboarding-3") && (
            <OnboardingScreen
              step={
                screen === "onboarding-1" ? 1
                : screen === "onboarding-2" ? 2
                : 3
              }
              onNext={() => {
                if (screen === "onboarding-1") navigate("onboarding-2", "screen-slide-right");
                else if (screen === "onboarding-2") navigate("onboarding-3", "screen-slide-right");
                else navigate("home", "screen-slide-right");
              }}
              onBack={() => {
                if (screen === "onboarding-2") navigate("onboarding-1", "screen-slide-left");
                else if (screen === "onboarding-3") navigate("onboarding-2", "screen-slide-left");
              }}
            />
          )}

          {screen === "home" && (
            <HomeScreen
              onScan={() => navigate("capture-guide", "screen-slide-up")}
              onReport={() => navigate("report", "screen-slide-right")}
            />
          )}

          {screen === "capture-guide" && (
            <CaptureGuideScreen
              onStart={() => navigate("camera", "screen-fade")}
              onBack={() => navigate("home", "screen-slide-left")}
            />
          )}

          {screen === "camera" && (
            <CameraScreen
              onCapture={() => navigate("preview", "screen-fade")}
              onBack={() => navigate("capture-guide", "screen-slide-left")}
            />
          )}

          {screen === "preview" && (
            <PreviewScreen
              onAnalyze={() => navigate("processing", "screen-slide-up")}
              onRetake={() => navigate("camera", "screen-fade")}
              onBack={() => navigate("camera", "screen-slide-left")}
            />
          )}

          {screen === "processing" && (
            <ProcessingScreen
              onNext={() => navigate("report", "screen-slide-right")}
            />
          )}

          {screen === "report" && (
            <ReportScreen
              onAction={() => navigate("action-plan", "screen-slide-right")}
              onBack={() => navigate("home", "screen-slide-left")}
            />
          )}

          {screen === "action-plan" && (
            <ActionScreen
              onPrev={() => navigate("report", "screen-slide-left")}
              onFindDentist={() => navigate("find-dentist", "screen-slide-up")}
            />
          )}

          {screen === "find-dentist" && (
            <FindDentistScreen
              onBack={() => navigate("action-plan", "screen-slide-left")}
            />
          )}

          {screen === "history" && (
            <HistoryScreen
              onSelectReport={() => navigate("report", "screen-slide-right")}
            />
          )}

          {screen === "profile" && (
            <ProfileScreen
              isDark={isDark}
              onToggleDark={() => setIsDark(!isDark)}
            />
          )}
        </div>

        {/* ── Bottom Tab Navigation ── */}
        {showBottomNav && (
          <nav
            className="fixed bottom-0 z-[100] bg-white/95 dark:bg-[#0F1926]/95 backdrop-blur-xl border-t border-slate-200/80 dark:border-white/8"
            style={{
              left: "max(0px, calc((100vw - 390px) / 2))",
              width: "min(390px, 100vw)",
              paddingBottom: "env(safe-area-inset-bottom, 16px)",
            }}
          >
            <div className="flex">
              {[
                { id: "home"    as Screen, Icon: Home,     label: "Beranda" },
                { id: "report"  as Screen, Icon: FileText,  label: "Laporan" },
                { id: "history" as Screen, Icon: Clock,     label: "Riwayat" },
                { id: "profile" as Screen, Icon: User,      label: "Profil" },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => tabNav(tab.id)}
                    className={`flex-1 flex flex-col items-center justify-center py-3 gap-0.5 relative transition-colors active:opacity-70 ${
                      isActive
                        ? "text-[#0D9488]"
                        : "text-slate-400 dark:text-[#4E6D8A]"
                    }`}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#0D9488] rounded-full" />
                    )}
                    <tab.Icon
                      size={22}
                      strokeWidth={isActive ? 2.5 : 1.5}
                    />
                    <span
                      className="text-[10px] font-semibold mt-0.5"
                      style={{ fontFamily: '"Syne", system-ui, sans-serif' }}
                    >
                      {tab.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
