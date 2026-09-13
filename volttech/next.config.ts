import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Este proyecto vive en un subdirectorio de un repo que también tiene un
  // lockfile en la raíz (el sitio de BOLD Agency) — se fija explícitamente
  // para que Next no intente adivinar la raíz del workspace.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
