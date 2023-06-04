#!/usr/bin/env python3

from bullshit import THEORIES

import os
from collections import defaultdict
from datetime import datetime

print(THEORIES)

publications = ["Axios", "Business Insider", "Buzzfeed News", "CNBC", "CNN", "Economist", "Fox News", "Gizmodo", "Hyperallergic", "Mashable", "New Republic", "New Yorker", "People", "Politico", "Refinery 29", "Reuters", "TMZ", "TechCrunch", "The Hill", "The New York Times", "The Verge", "Vice", "Vice News", "Vox", "Washington Post", "Wired"]
publications = list(map(lambda x: x.lower(), publications))

data_pub = defaultdict(lambda: defaultdict(lambda: defaultdict(lambda: 0)))

data_jones = defaultdict(lambda: defaultdict(lambda: 0))

normalizations = defaultdict(int)


lines = open("../news/preprocessed.csv", "r", errors='ignore')
for line in lines:
    try:
        year = line.split(',')[1]
        if year == "year": continue
        # if year[:2] != "20": continue
        month = int(float(line.split(',')[2]))
        pub = line.split(',')[-1].strip()
        content = line
        date_string = f"{year}-{month}"
        for theory in THEORIES:
            the = " ".join(theory)
            count = content.count(the)
            data_pub[the][date_string][pub] += count
            normalizations[pub] += 1
            # if len(date_string) > 7: 
                # print(line)
                # exit()
        # for pub in publications:
            # print(len(data_pub[pub]), end="")
        # print()
    except Exception as e:
        print('EXXC '+str(e))
        pass




for x in THEORIES:
    maxx = 0
    for date in sorted(data_pub[" ".join(x)], key=lambda x: int(x.split("-")[0])*1000+int(x.split("-")[1])):
        for e,pub in enumerate(publications):
            maxx = max(maxx, data_pub[" ".join(x)][date][pub] / normalizations[pub])

    with open("../website/assets/data/timeline_pub_"+" ".join(x)+".csv", "w") as f:
        f.write("date,")
        # csv header
        for e,pub in enumerate(publications):
            f.write(pub)
            if e != len(publications)-1:
                f.write(",")
        f.write("\n")

        for date in sorted(data_pub[" ".join(x)], key=lambda x: int(x.split("-")[0])*1000+int(x.split("-")[1])):
            f.write(date+",")
            for e,pub in enumerate(publications):
                f.write(format(data_pub[" ".join(x)][date][pub] / normalizations[pub] / maxx * 100, ".10f"))
                if e != len(publications)-1:
                    f.write(",")
            f.write("\n")

        # for e,pub in enumerate(publications):
            # for date in data_pub[pub].keys():
                # f.write(date+",")
                # f.write(str(data_pub[pub][date][" ".join(x)]))
            # if e != len(publications)-1:
                # f.write(",")
exit(1)


for f in sorted(os.listdir("../infowars-main")):
    print(f)
    date = f.split("_")[0]
    year, month, day = date[0:4], date[4:6], date[6:]
    date_string = f"{year}-{month}"

    for theory in THEORIES:
        the = " ".join(theory)
        with open("../infowars-main/" + f, "r") as file:
            count = file.read().count(the)
        data_jones[date_string][the] += count


with open("../website/assets/data/timeline_jones.csv", "w") as f:
    f.write("date,")
    for e,x in enumerate(THEORIES):
        f.write(" ".join(x))
        if e != len(THEORIES)-1:
            f.write(",")
    f.write("\n")
    for date in data_jones.keys():
        f.write(date+",")
        for e,x in enumerate(THEORIES):
            f.write(str(data_jones[date][" ".join(x)]))
            if e != len(THEORIES)-1:
                f.write(",")
        f.write("\n")

