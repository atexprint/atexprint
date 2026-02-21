#!/usr/bin/env bash
set -euo pipefail

INPUT=""
OUTPUT=""
SEGMENT_SIZE=""

usage() {
  echo "Usage: $(basename "$0") -i <input.mp4> -o <output.m3u8> [-s <max_size_bytes>]"
  echo
  echo "  -i  Path to the input MP4 file (required)"
  echo "  -o  Path to the output M3U8 playlist file (required)"
  echo "  -s  Target maximum size of each .ts segment in bytes (optional, e.g. 5242880 for 5 MB)."
  echo "      The segment duration is derived from the input bitrate and keyframes are"
  echo "      forced at that interval, so chunks stay close to the requested size."
  echo "  -h  Show this help message"
  exit 1
}

while getopts ":i:o:s:h" opt; do
  case "$opt" in
    i) INPUT="$OPTARG" ;;
    o) OUTPUT="$OPTARG" ;;
    s) SEGMENT_SIZE="$OPTARG" ;;
    h) usage ;;
    :) echo "Error: option -$OPTARG requires an argument." >&2; usage ;;
    \?) echo "Error: unknown option -$OPTARG." >&2; usage ;;
  esac
done

if [[ -z "$INPUT" ]]; then
  echo "Error: input file (-i) is required." >&2
  usage
fi

if [[ -z "$OUTPUT" ]]; then
  echo "Error: output file (-o) is required." >&2
  usage
fi

if [[ ! -f "$INPUT" ]]; then
  echo "Error: input file not found: $INPUT" >&2
  exit 1
fi

if [[ "$OUTPUT" != *.m3u8 ]]; then
  echo "Error: output file must have a .m3u8 extension." >&2
  exit 1
fi

if [[ -n "$SEGMENT_SIZE" ]] && ! [[ "$SEGMENT_SIZE" =~ ^[1-9][0-9]*$ ]]; then
  echo "Error: -s must be a positive integer (bytes)." >&2
  exit 1
fi

if ! command -v ffmpeg &>/dev/null; then
  echo "Error: ffmpeg is not installed or not in PATH." >&2
  exit 1
fi

OUTPUT_DIR="$(dirname "$OUTPUT")"
OUTPUT_BASENAME="$(basename "$OUTPUT" .m3u8)"

mkdir -p "$OUTPUT_DIR"

SEGMENT_PATTERN="${OUTPUT_DIR}/${OUTPUT_BASENAME}_%03d.ts"

echo "Converting: $INPUT -> $OUTPUT"
echo "Segments  : $SEGMENT_PATTERN"
[[ -n "$SEGMENT_SIZE" ]] && echo "Max size  : ${SEGMENT_SIZE} bytes per segment"
echo

HLS_TIME=6
KEYFRAME_ARGS=()
if [[ -n "$SEGMENT_SIZE" ]]; then
  BITRATE_BPS=$(ffprobe -v error -select_streams v:0 \
    -show_entries stream=bit_rate -of default=noprint_wrappers=1:nokey=1 \
    "$INPUT" 2>/dev/null || echo "")

  if [[ -z "$BITRATE_BPS" || "$BITRATE_BPS" == "N/A" ]]; then
    BITRATE_BPS=$(ffprobe -v error \
      -show_entries format=bit_rate -of default=noprint_wrappers=1:nokey=1 \
      "$INPUT" 2>/dev/null || echo "")
  fi

  if [[ -n "$BITRATE_BPS" && "$BITRATE_BPS" =~ ^[0-9]+$ && "$BITRATE_BPS" -gt 0 ]]; then
    HLS_TIME=$(( (SEGMENT_SIZE * 8) / BITRATE_BPS ))
    (( HLS_TIME < 1 )) && HLS_TIME=1
    echo "Bitrate   : ${BITRATE_BPS} bps  ->  target segment duration: ${HLS_TIME}s"
    KEYFRAME_ARGS=(-force_key_frames "expr:gte(t,n_forced*${HLS_TIME})")
  else
    echo "Warning: could not determine input bitrate; using default segment duration (${HLS_TIME}s)." >&2
  fi
fi

ffmpeg -i "$INPUT" \
  -c:v libx264 -preset medium -crf 23 \
  -c:a aac -b:a 128k \
  "${KEYFRAME_ARGS[@]}" \
  -hls_time "$HLS_TIME" \
  -hls_playlist_type vod \
  -hls_segment_filename "$SEGMENT_PATTERN" \
  "$OUTPUT"

echo
echo "Done. Playlist written to: $OUTPUT"
