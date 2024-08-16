#!/bin/bash

# Check if the correct number of arguments is passed
if [ "$#" -ne 3 ]; then
    echo "Usage: $0 file1.txt file2.txt output.json"
    exit 1
fi

file1="$1"
file2="$2"
output="$3"

# Check if the files exist
if [ ! -f "$file1" ] || [ ! -f "$file2" ]; then
    echo "Both input files must exist."
    exit 1
fi

# Get the number of lines in both files
lines_file1=$(wc -l < "$file1")
lines_file2=$(wc -l < "$file2")

# Check if the files have the same number of lines
if [ "$lines_file1" -ne "$lines_file2" ]; then
    echo "Both files must have the same number of lines."
    exit 1
fi

# Create the JSON file
{
    echo "{"
    echo "  \"pairs\": ["
    paste -d '\t' "$file1" "$file2" | awk -F'\t' '{
        printf "    {\n      \"%s\": \"%s\"\n    }", $1, $2;
        if (NR < NF) { print "," } else { print "" }
    }'
    echo "  ]"
    echo "}"
} > "$output"

echo "JSON file created successfully: $output"
