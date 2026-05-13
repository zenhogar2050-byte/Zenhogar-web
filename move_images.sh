#!/bin/bash

# Ensure target directory exists
mkdir -p public/assets/products

# Function to move and rename
move_and_clean() {
  local src="$1"
  local dest="$2"
  if [ -f "$src" ]; then
    mv "$src" "public/assets/products/$dest"
    echo "Moved $src to public/assets/products/$dest"
  fi
}

# Iterate over files in src/lib
for f in src/lib/*-apoyo-*.{webp,png}; do
  if [ -f "$f" ]; then
    # Get filename
    filename=$(basename "$f")
    
    # Remove spaces
    clean_filename=$(echo "$filename" | sed 's/ //g')
    
    # Special cases
    # resveratrol-apoyo-1 (1).webp -> resveratrol-apoyo-1.webp
    clean_filename=$(echo "$clean_filename" | sed 's/(1)//g')
    
    # Move
    mv "$f" "public/assets/products/$clean_filename"
    echo "Moved $f to public/assets/products/$clean_filename"
  fi
done

# Check for Liofhim (uppercase L)
for f in src/lib/Liofhim-apoyo-*.webp; do
  if [ -f "$f" ]; then
    filename=$(basename "$f")
    clean_filename=$(echo "$filename" | sed 's/Liofhim/liofhim/g' | sed 's/ //g')
    mv "$f" "public/assets/products/$clean_filename"
  fi
done

# Check for Titancoffee (uppercase T)
for f in src/lib/Titancoffee-apoyo-*.webp; do
  if [ -f "$f" ]; then
    filename=$(basename "$f")
    clean_filename=$(echo "$filename" | sed 's/Titancoffee/titancoffee/g' | sed 's/ //g')
    mv "$f" "public/assets/products/$clean_filename"
  fi
done

echo "Finished moving files."
