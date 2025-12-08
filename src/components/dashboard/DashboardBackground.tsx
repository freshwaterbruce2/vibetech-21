import MeshAuroraBackground from "@/components/ui/mesh-aurora-background";

const DashboardBackground = () => {
  return (
    // Removed THREE.js ParticleNetwork to prevent WebGL context loss
    // Using only CSS-based aurora background for better performance
    <MeshAuroraBackground intensity="very-low" />
  );
};

export default DashboardBackground;
