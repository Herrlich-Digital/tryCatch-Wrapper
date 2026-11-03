import { copyFile, rm } from "node:fs/promises";

// Ersetzt tsup: JavaScript baut Bun, die Typen erzeugt tsc (TypeScript 7).
await rm("dist", { recursive: true, force: true });

for (const format of ["esm", "cjs"] as const) {
  const result = await Bun.build({
    entrypoints: ["index.ts"],
    outdir: "dist",
    format,
    target: "node",
    sourcemap: "linked",
    naming: format === "cjs" ? "[name].cjs" : "[name].js",
  });

  if (!result.success) {
    for (const log of result.logs) console.error(log);
    process.exit(1);
  }
}

const tsc = Bun.spawnSync(["tsc", "-p", "tsconfig.build.json"], {
  stdout: "inherit",
  stderr: "inherit",
});
if (tsc.exitCode !== 0) process.exit(tsc.exitCode ?? 1);

// Eigene Typdatei für require(), damit "node16"/"nodenext"-Projekte sauber auflösen.
await copyFile("dist/index.d.ts", "dist/index.d.cts");
