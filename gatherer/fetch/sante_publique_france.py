import logging
from typing import Collection, Iterator

from bs4 import BeautifulSoup, element
from requests import Response, get

from gatherer.entities import Result

URL = "https://www.santepubliquefrance.fr/maladies-et-traumatismes/maladies-et-infections-respiratoires/infection-a-coronavirus/articles/infection-au-nouveau-coronavirus-sars-cov-2-covid-19-france-et-monde"

LOGGER = logging.getLogger(__name__)


def get_results() -> Collection[Result]:
    """
    Fetch HTML page of Santé Publique France.
    Parse the page to find the rows containing the information.
    Convert each row to a generic result.
    """
    LOGGER.info("Fetching the results from Santé Publique France…")
    response: Response = get(url=URL)
    soup = BeautifulSoup(response.text, features="html.parser")
    table = soup.find("table")
    rows: Iterator[element.ResultSet] = filter(
        None, (row.find_all("td") for row in table.find_all("tr"))
    )
    return tuple(convert(row) for row in rows)


def convert(row: element.ResultSet) -> Result:
    """
    Convert a raw HTML row into a proper Result.
    """
    region_column, confirmed_cases_column = row
    return Result(
        region=region_column.text,
        confirmed_cases=int(confirmed_cases_column.text.replace(" ", "")),
    )
