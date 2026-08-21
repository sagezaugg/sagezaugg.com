import React, { useCallback, useMemo, useState } from "react";
import { MotionConfig } from "framer-motion";
import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { type Engine, type ISourceOptions } from "@tsparticles/engine";

import { EFFECTS, LAYOUT } from "./config/site";

import BootSequence from "./components/os/BootSequence";
import DeviceFrame from "./components/os/DeviceFrame";
import ScreenOverlay from "./components/os/ScreenOverlay";
import StatusBar from "./components/os/StatusBar";

import LauncherLayout from "./components/launcher/LauncherLayout";
import ScrollLayout from "./components/layouts/ScrollLayout";

// tsparticles v4 requires the init callback to be stable across the app
// lifecycle, so it must live at module scope (not recreated per render).
const initParticles = async (engine: Engine) => {
  await loadSlim(engine);
};

const App: React.FC = () => {
  const [booting, setBooting] = useState(EFFECTS.bootSequence);
  const finishBoot = useCallback(() => setBooting(false), []);

  const particleOptions: ISourceOptions = useMemo(
    () => ({
      background: {
        color: "transparent",
      },
      fpsLimit: 120,
      particles: {
        // Density keeps the dust looking the same on a laptop and an ultrawide,
        // where a flat count would spread to nothing.
        number: { value: 80, density: { enable: true, area: 800 } },
        color: { value: "#dff2ff" },
        opacity: {
          value: { min: 0.2, max: 0.6 },
          animation: {
            enable: true,
            speed: 0.35,
            startValue: "random",
            sync: false,
          },
        },
        size: { value: { min: 0.8, max: 2.2 } },
        move: { enable: true, speed: 0.25 },
      },
    }),
    []
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen">
        {EFFECTS.particles && (
          <div className="print-hidden fixed inset-0 z-0" aria-hidden="true">
            <ParticlesProvider init={initParticles}>
              <Particles
                id="tsparticles"
                options={particleOptions}
                className="h-full w-full"
              />
            </ParticlesProvider>
          </div>
        )}

        {EFFECTS.scanlines && <ScreenOverlay />}
        {EFFECTS.deviceFrame && <DeviceFrame />}

        <StatusBar />

        {LAYOUT === "launcher" ? <LauncherLayout /> : <ScrollLayout />}

        {booting && <BootSequence onComplete={finishBoot} />}
      </div>
    </MotionConfig>
  );
};

export default App;
