#!/usr/bin/env python3
import re
date_regex = re.compile(r"^20\d\d-\d\d-\d\d")
with open("all-the-news-2-1.csv", "r") as orig, open("preprocessed.csv", "w") as prep:
    fixed_line = ""
    for line in orig:
        if date_regex.match(line.strip()) is not None:
            # If it starts with the usual date format, it's probably a date from a new dataset line
            # Write out the previous line
            prep.write(fixed_line.strip() + "\n")
            # Set up the new line
            fixed_line = line.strip().lower()
        else:
            # Not a new dataset line => it's a continuation of the previous line
            fixed_line += " " + line.strip().lower()
    # Write out the last line
    prep.write(fixed_line.strip() + "\n")
