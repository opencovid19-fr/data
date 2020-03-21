from datetime import date
from pathlib import Path
from typing import Collection

import yaml

from gatherer.entities import Result


def to_yaml(results: Collection[Result]) -> None:
    today = date.today()

    content = {
        "date": today.isoformat(),
        "source": {
            "nom": "Santé publique France",
            "url": "https://www.santepubliquefrance.fr/maladies-et-traumatismes/maladies-et-infections-respiratoires/infection-a-coronavirus/articles/infection-au-nouveau-coronavirus-sars-cov-2-covid-19-france-et-monde",
            "archive": f"https://web.archive.org/web/{today.strftime('%Y%m%d')}/https://www.santepubliquefrance.fr/maladies-et-traumatismes/maladies-et-infections-respiratoires/infection-a-coronavirus/articles/infection-au-nouveau-coronavirus-sars-cov-2-covid-19-france-et-monde",
        },
        "donneesRegionales": [
            {"nom": r.region, "casConfirmes": r.confirmed_cases} for r in results
        ],
    }

    path = Path(f"sante-publique-france/{today.isoformat()}.yaml")
    with path.open("w") as file:
        yaml.dump(content, file, allow_unicode=True, sort_keys=False)
