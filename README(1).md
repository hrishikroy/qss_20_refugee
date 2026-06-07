# CAS Refugee Reception and Electoral Change in Italian Communes

This repository contains the code for a commune-level analysis of whether exposure to Italian CAS refugee reception centers is associated with changes in party-bloc vote share between the 2018 and 2022 Italian Chamber of Deputies elections. The main outcome used in the final regression is the change in centre-left vote share from 2018 to 2022. The main explanatory variable is the average number of CAS refugees per 1,000 inhabitants in each commune between 2018 and 2022.

## Repository structure

```text
.
├── code/
│   ├── 00_process_refugee_dataset.ipynb
│   ├── 01_clean_election_datasets.ipynb
│   └── 02_merge_regression.ipynb
├── data/
│   ├── ches_dataset.csv
│   ├── unemp_data_2018_with_regione.csv
│   ├── unemp_data_2019_with_regione.csv
│   ├── unemp_data_2021_with_regione.csv
│   ├── unemp_data_2022_with_regione.csv
│   └── large raw data files, downloaded separately; see below
├── output/
│   └── centre_left_change_vs_refugees.png
└── README.md
```

The notebooks are numbered in the order they should be run. If your local files have download suffixes such as `(4)` or spaces in the filenames, rename them to the clean names shown above before committing them to GitHub.

## Data access

Some raw datasets are too large to upload directly to this repository. Download them from the following links and place them in the `data/` directory before running the notebooks.

| File | Download link | Notes |
|---|---|---|
| `cas_data.csv` | [Google Drive](https://drive.google.com/file/d/1QDiEDHPC3ANpmlwnHx7YBgBHWU_xj1yC/view?usp=sharing) | Raw CAS refugee reception center data. Used in `00_process_refugee_dataset.ipynb`. |
| `commune_results_2018.txt` | [Google Drive](https://drive.google.com/file/d/18AOYr_v8z25tqU3FSHM-YjmKad9kThlc/view?usp=sharing) | Raw 2018 Chamber of Deputies commune-level election results. The notebook currently reads this as `Camera2018_livComune.txt`, so either save it under that name or update the path in the notebook. |
| `commune_results_2022.csv` | [Google Drive](https://drive.google.com/file/d/16fQbdtvgZbc-uwi85UKxs6J3QzGSyLKA/view?usp=sharing) | Raw 2022 Chamber of Deputies commune-level election results. The notebook currently reads this as `Camera_Italia_LivComune.csv`, so either save it under that name or update the path in the notebook. |

The repository also uses the following smaller input files, which should be stored in `data/`:

| File | Description |
|---|---|
| `ches_dataset.csv` | Chapel Hill Expert Survey data used to classify Italian parties into ideological blocs using `lrgen`. |
| `unemp_data_2018_with_regione.csv` | Commune-level employment-rate data for 2018. |
| `unemp_data_2019_with_regione.csv` | Commune-level employment-rate data for 2019. |
| `unemp_data_2021_with_regione.csv` | Commune-level employment-rate data for 2021. |
| `unemp_data_2022_with_regione.csv` | Commune-level employment-rate data for 2022. |

## Environment setup

This project uses Python notebooks. To reproduce the analysis, install the required packages in a virtual environment or conda environment.

```bash
pip install pandas numpy matplotlib seaborn plotnine statsmodels jupyter
```

Then open the notebooks from the `code/` folder and run them in numerical order.

```bash
jupyter notebook
```

## Important path note

The intended project structure uses a `data/` directory and an `output/` directory. The notebooks define these paths with `pathlib`:

```python
PROJECT_DIR = Path.cwd().parent
DATA_DIR = PROJECT_DIR / "data"
OUTPUT_DIR = PROJECT_DIR / "output"
```

For best reproducibility, file reads and writes should use `DATA_DIR / "filename.csv"` and `OUTPUT_DIR / "filename.png"`. If any notebook line still uses a literal string such as `"DATA_DIR/cas_data.csv"`, update it to use the `DATA_DIR` variable before running, or create a local folder named `DATA_DIR/` that matches the existing code.

## Code files

| Notebook | Inputs | What it does | Outputs |
|---|---|---|---|
| [`00_process_refugee_dataset.ipynb`](code/00_process_refugee_dataset.ipynb) | `cas_data.csv` | Filters CAS records by year, aggregates refugee counts by commune, calculates refugees per 1,000 inhabitants for each year, and computes the 2018-2022 average refugee exposure measure. | `cas_refugees_by_commune_2018_2022.csv` |
| [`01_clean_election_datasets.ipynb`](code/01_clean_election_datasets.ipynb) | 2018 election results, 2022 election results, `ches_dataset.csv` | Pivots raw election results from long to wide format, uses CHES left-right party scores to group parties into far-left, centre-left, centre-right, and far-right blocs, calculates bloc vote shares, and merges 2018 and 2022 election results by commune. | `commune_results_2018_pivoted.csv`, `commune_results_election_2022.csv`, `election_2018_vote_share.csv`, `election_2022_vote_share.csv`, `merged_elections.csv` |
| [`02_merge_regression.ipynb`](code/02_merge_regression.ipynb) | `cas_refugees_by_commune_2018_2022.csv`, `merged_elections.csv`, employment-rate CSVs | Merges refugee exposure, election outcomes, and employment-rate controls; estimates an OLS regression of centre-left vote-share change on refugee exposure, mean employment rate, and 2018 centre-left vote share; creates the final scatterplot. | `centre_left_change_vs_refugees.png` |

## Main variables

| Variable | Description |
|---|---|
| `refugees_per_1000_inhabitants_mean` | Mean number of CAS refugees per 1,000 inhabitants in a commune across 2018, 2019, 2020, 2021, and 2022. |
| `centre_left_change_22_18` | Centre-left vote share in 2022 minus centre-left vote share in 2018. Positive values mean the centre-left bloc gained vote share; negative values mean it lost vote share. |
| `employment_rate_mean` | Mean commune-level employment rate across the available years: 2018, 2019, 2021, and 2022. |
| `centre_left_coalition_perc_18` | Centre-left vote share in 2018, included as a baseline political control. |

## Method summary

1. The CAS dataset is filtered into yearly snapshots using the reported date of each center.
2. For each year, the code groups CAS centers by commune and sums the number of daily refugee presences.
3. The yearly refugee total is divided by commune population and multiplied by 1,000 to create a comparable exposure measure across communes of different sizes.
4. The yearly exposure measures are merged into one commune-level dataset, and the mean 2018-2022 refugee exposure measure is calculated.
5. The 2018 and 2022 election datasets are reshaped so that each commune is one row and party lists are columns.
6. CHES party-position scores are used to classify parties into ideological blocs.
7. Bloc-level vote shares are calculated for each commune and election year.
8. The code calculates the change in vote share between 2018 and 2022 for each bloc.
9. Refugee exposure, election outcomes, and employment-rate controls are merged into the final regression dataset.
10. The final OLS model estimates the association between refugee exposure and centre-left vote-share change, controlling for employment rate and the 2018 centre-left vote share.

## Final regression specification

The main regression estimated in `02_merge_regression.ipynb` is:

```text
centre_left_change_22_18 = β0
    + β1(refugees_per_1000_inhabitants_mean)
    + β2(employment_rate_mean)
    + β3(centre_left_coalition_perc_18)
    + ε
```

This model should be interpreted as an associational analysis, not as proof of a causal relationship. The analysis does not randomly assign refugee reception centers to communes, and omitted commune-level factors may still influence both refugee-center placement and electoral change.

## Output

The main figure produced by the analysis is:

```text
output/centre_left_change_vs_refugees.png
```

This figure plots commune-level centre-left vote-share change from 2018 to 2022 against average CAS refugees per 1,000 inhabitants, with a fitted linear trend line.

## Notes on limitations

- The regression is observational and should not be interpreted as causal without stronger identification assumptions.
- Employment-rate data are available for 2018, 2019, 2021, and 2022; 2020 is not included in the employment-rate mean.
- Party-bloc classification depends on CHES party-position scores and manual standardization of party names across datasets.
- The refugee exposure measure is based on CAS data and may not capture all forms of refugee or migrant presence in a commune.
- Commune names must match across datasets for merges to succeed, so spelling, capitalization, and administrative naming differences may affect the merged sample.

## Reproducibility checklist

Before running the project, confirm that:

- The notebooks are stored in the `code/` directory and numbered in run order.
- The `data/` directory contains all required CSV/TXT inputs.
- The three large files linked above have been downloaded and saved using the filenames expected by the notebooks.
- The `output/` directory exists, or the notebooks are allowed to create it.
- File paths use the `DATA_DIR` and `OUTPUT_DIR` variables rather than machine-specific absolute paths.

