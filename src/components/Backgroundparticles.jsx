import React from "react";
import Particles from "../components/Particles";

const BackgroundParticles = () => {
  return (
    <div className="bg-black w-full h-full z">
      <Particles
        particleColors={['#ffffff', '#ffffff']}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={true}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>
  );
};

export default BackgroundParticles;