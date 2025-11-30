import { Code, Bot, Smartphone, Zap, Brain, Cpu } from "lucide-react";
import { OrbitingCircles } from "./ui/orbiting-circles";

export function LargeHemisphereOrbits() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full max-w-md max-h-md relative">
          <OrbitingCircles
            radius={120}
            duration={20}
            speed={1}
            iconSize={40}
            path={true}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/30">
              <Bot className="w-5 h-5 text-blue-500" />
            </div>
          </OrbitingCircles>

          <OrbitingCircles
            radius={120}
            duration={20}
            delay={3}
            speed={1}
            iconSize={40}
            path={false}
            reverse
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30">
              <Code className="w-5 h-5 text-purple-500" />
            </div>
          </OrbitingCircles>

          <OrbitingCircles
            radius={160}
            duration={30}
            speed={1}
            iconSize={40}
            path={true}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10 border border-green-500/30">
              <Smartphone className="w-5 h-5 text-green-500" />
            </div>
          </OrbitingCircles>

          <OrbitingCircles
            radius={160}
            duration={30}
            delay={5}
            speed={1}
            iconSize={40}
            path={false}
            reverse
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500/10 border border-orange-500/30">
              <Brain className="w-5 h-5 text-orange-500" />
            </div>
          </OrbitingCircles>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center border border-gray-700/50 shadow-lg">
              <Cpu className="w-8 h-8 text-gray-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
