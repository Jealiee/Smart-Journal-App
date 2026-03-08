# Build the Rust/WASM crate and output to frontend/public/wasm/
# Run from the project root: ./build-wasm.ps1
#
# Prerequisites (one-time):
#   winget install LLVM.LLVM           # provides clang + llvm-ar
#   rustup target add wasm32-unknown-unknown
#   cargo install wasm-pack
#
# The Emscripten sysroot (stdlib.h etc.) is required because candle-core pulls
# in onig_sys (a C library) when compiling tokenizers.  Unity ships Emscripten;
# adjust $sysroot below if it lives elsewhere on your machine.
# We symlink it to C:\wasm-sysroot to avoid spaces in the path.
#
# First build downloads the candle git dep — expect 10-30 min.
# Subsequent builds use Cargo's cache and take ~1-2 min.

$ErrorActionPreference = "Stop"

# ── Locate / create a space-free symlink to the Emscripten sysroot ───────────
$emSysroot = "C:\Program Files\Unity\Hub\Editor\6000.2.9f1\Editor\Data\PlaybackEngines\WebGLSupport\BuildTools\Emscripten\emscripten\cache\sysroot"
$sysroot   = "C:\wasm-sysroot"
if (-not (Test-Path $sysroot)) {
    if (Test-Path $emSysroot) {
        New-Item -ItemType Junction -Path $sysroot -Target $emSysroot | Out-Null
        Write-Host "Created sysroot junction → $sysroot" -ForegroundColor Yellow
    } else {
        Write-Error "Emscripten sysroot not found at $emSysroot. Install Unity WebGL support or set `$sysroot manually."
    }
}

# ── C cross-compiler env vars ─────────────────────────────────────────────────
$llvmBin = "C:\Program Files\LLVM\bin"
$env:PATH = "$llvmBin;$env:PATH"
$env:CC_wasm32_unknown_unknown  = "clang"
$env:AR_wasm32_unknown_unknown  = "llvm-ar"
$env:CFLAGS_wasm32_unknown_unknown = "--sysroot=$sysroot"

$outDir = Join-Path $PSScriptRoot "frontend/public/wasm"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

Write-Host "Building food-wasm (target: wasm32-unknown-unknown)..." -ForegroundColor Cyan

Push-Location (Join-Path $PSScriptRoot "wasm-t5")
try {
    wasm-pack build `
        --target web `
        --release `
        --out-dir $outDir `
        --out-name food_wasm `
        --no-pack   # skip package.json / README generation

    Write-Host "WASM build complete → $outDir" -ForegroundColor Green
    Get-ChildItem $outDir | Select-Object Name, Length
}
finally {
    Pop-Location
}
