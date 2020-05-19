#!/usr/bin/python
import os
import yaml

# ReadItem, if not exists, set 0 value
def readItem(item,itemname):
    if itemname not in item['donneesNationales']:
        return 0

    return item['donneesNationales'][itemname]


# Get yaml files list
searchpath='.'
files = [f for f in os.listdir(searchpath) if f.rfind('.yaml')>=0 and os.path.isfile(os.path.join(searchpath, f))]
files = sorted(files)

# Generate data lists
deltas = []
datas = []
for filename in files:
    with open(filename, 'r') as f:
        # Get Yaml item
        item = yaml.safe_load(f)

        # Add to datas array
        data = (
            item['date'],
            readItem(item,'casConfirmes'),
            readItem(item,'hospitalises'),
            readItem(item,'gueris'),
            readItem(item,'reanimation'),
            readItem(item,'deces'),
            readItem(item,'casEhpad'),
            readItem(item,'casConfirmesEhpad'),
            readItem(item,'decesEhpad')
            )
        datas.append(data)

# Compute deltas
dsize = len(datas)
isize = len(datas[0])
deltas.append([0]*(len(data)-1)) # Init first delta
for didx in range(1,dsize):
    idelta = []
    for iidx in range(1,isize):
        delta = datas[didx][iidx]-datas[didx-1][iidx]
        idelta.append(delta)

    deltas.append(idelta)

# Export to csv file
with open('sante-publique-france.csv','w') as f:
    header = "date;casConfirmes;hospitalises;gueris;reanimation;deces;casEhpad;casConfirmesEhpad;decesEhpad;"
    header += "delta_casConfirmes;delta_hospitalises;delta_gueris;delta_reanimation;delta_deces;delta_casEhpad;delta_casConfirmesEhpad;delta_decesEhpad"
    header += "\n"
    f.write(header)
    for didx in range(dsize):
        strdata=""
        # Datas
        for col in datas[didx]:
            strdata += f";{col}"
        # Deltas
        for col in deltas[didx]:
            strdata += f";{col}"

        f.write(f"{strdata[1:]}\n")
