#!/usr/bin/env python3

from bullshit import THEORIES

import os
from collections import defaultdict

print(THEORIES)

data = defaultdict(lambda: defaultdict(lambda: 0))

for f in sorted(os.listdir("../infowars-main")):
    print(f)
    date = f.split("_")[0]
    year, month, day = date[0:4], date[4:6], date[6:]
    date_string = f"{year}-{month}"

    for theory in THEORIES:
        the = " ".join(theory)
        with open("../infowars-main/" + f, "r") as file:
            count = file.read().count(the)
        data[date_string][the] += count
        
with open("../website/assets/data/timeline.csv", "w") as f:
    f.write("date,")
    for e,x in enumerate(THEORIES):
        f.write(" ".join(x))
        if e != len(THEORIES)-1:
            f.write(",")
    for date in data.keys():
        f.write(date+",")
        for e,x in enumerate(THEORIES):
            f.write(str(data[date][" ".join(x)]))
            if e != len(THEORIES)-1:
                f.write(",")
        f.write("\n")
