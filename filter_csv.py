import csv
import json
import datetime
from pathlib import Path
# import requests
from os import listdir
from os.path import isfile, join


INPUT_DIR = Path("./dist")
INPUT_FILE_PATH = join(str(INPUT_DIR), "chiffres-cles.json")
OUTPUT_FILE_PATH = join(str(INPUT_DIR), "chiffres-cles-filtered.json")

print (">>> Start building " + OUTPUT_FILE_PATH)

with open(INPUT_FILE_PATH, 'r', encoding='utf8') as infile:
    all_data = json.load(infile)

new_data = []
today = datetime.date.today()
delta = today - datetime.timedelta(days=30)

for entry in all_data:
    date = datetime.datetime.strptime(entry['date'].replace('_', '-'), '%Y-%m-%d').date()
    if delta > date:
        continue

    # print (date)
    if 'source' in entry:
        del entry['source']
    if 'sourceType' in entry:
        del entry['sourceType']
    new_data.append(entry)


# print (new_data)
print ("<<< End building " + OUTPUT_FILE_PATH)
with open(OUTPUT_FILE_PATH, 'w', encoding='utf8') as outfile:
    json.dump(new_data, outfile, ensure_ascii=False)