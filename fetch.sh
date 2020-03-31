#!/bin/bash
scp spf@sftp-gw.data.gouv.fr:~/spf-mirror/covid_hospit.csv ./
tail -n +2 covid_hospit.csv >> data-sources/sante-publique-france/covid_hospit.csv
rm covid_hospit.csv
