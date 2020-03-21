import logging

from gatherer.fetch import sante_publique_france
from gatherer.format import to_yaml


def main() -> None:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s | %(levelname)-7s | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )
    results = sante_publique_france.get_results()
    to_yaml(results)


if __name__ == "__main__":
    main()
