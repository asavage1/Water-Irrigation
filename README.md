IDHack 2017 Project

Algorithm Outline:
- Leaf Processing
  - read in image of leaf
  - convert image to rgb format
  - separate nxm rgbs into a 64x64 grid
  - calculate average rgb value of each grid, store into array
  - for each pixel
    - calculate average of 3x3 grid that pixel belongs to
      - don't forget edge/corner cases!
    - calculate the contrast between the pixel and the average, store value
  - IF WE HAVE TIME: calculate best fit line of high contrast (find root vein)
- City Processing
  - read in population density map
  - convert image to readable format
  - for each pixel
    - reduce information in each pixel to population parameter
    - put in new 
  - split into 64x64 grid
  - calculate average of each grid
  - find two highest
  - connect in line sigment
  - rotate that line segment to be vertical
- Comparison
  - for each leaf
    - 