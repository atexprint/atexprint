#!/usr/bin/env python3

import subprocess
from pathlib import Path
import shutil

SRC = Path("latest-projects")
DST = Path("latest-projects-optimized")

MAX_SIZE = 2_000_000  # 2MB

START_QUALITY = 1     # 🔥 higher quality (was 3)
QUALITY_STEP = 1      # 🔥 smaller steps (was 2)
MAX_QUALITY = 8       # 🔥 stop before it gets ugly


def run(cmd):
    result = subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    return result.returncode == 0


def optimize_image(src: Path, dst: Path):
    dst = dst.with_suffix(".jpg")
    dst.parent.mkdir(parents=True, exist_ok=True)

    quality = START_QUALITY

    # initial conversion (high quality)
    if not run([
        "ffmpeg", "-y", "-i", str(src),
        "-vf", "scale=2048:2048:force_original_aspect_ratio=decrease:flags=lanczos",
        "-q:v", str(quality),
        "-map_metadata", "-1",
        "-frames:v", "1",
        str(dst)
    ]):
        print(f"❌ Failed: {src}")
        return

    # if already small enough -> done
    if dst.stat().st_size <= MAX_SIZE:
        print(f"✅ Image done (no extra compression): {dst} ({dst.stat().st_size // 1024} KB)")
        return

    # gentle compression loop
    while dst.exists() and dst.stat().st_size > MAX_SIZE:
        quality += QUALITY_STEP

        if quality > MAX_QUALITY:
            print(f"⚠️ Reached quality limit (still >2MB): {dst}")
            break

        tmp = dst.with_suffix(".tmp.jpg")

        if not run([
            "ffmpeg", "-y", "-i", str(dst),
            "-q:v", str(quality),
            "-frames:v", "1",
            str(tmp)
        ]):
            print(f"❌ Failed recompress: {dst}")
            break

        tmp.replace(dst)

    print(f"✅ Image done: {dst} ({dst.stat().st_size // 1024} KB, q={quality})")


def copy_file(src: Path, dst: Path):
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)
    print(f"📁 Copied: {dst}")


def main():
    if not SRC.exists():
        print("❌ Source directory does not exist")
        return

    for path in SRC.rglob("*"):
        if not path.is_file():
            continue

        rel = path.relative_to(SRC)
        dst = DST / rel

        ext = path.suffix.lower()

        try:
            if ext in [".jpg", ".jpeg", ".png"]:
                print(f"🖼 Processing: {path}")
                optimize_image(path, dst)
            else:
                copy_file(path, dst)

        except Exception as e:
            print(f"❌ Error processing {path}: {e}")


if __name__ == "__main__":
    main()
