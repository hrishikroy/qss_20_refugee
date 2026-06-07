# Italy Refugee Reception and Electoral Change Project

This repository contains the code for a commune-level analysis of the relationship between refugee reception and changes in Italian electoral support between the 2018 and 2022 Chamber of Deputies elections.

The project asks whether communes with higher average refugee presence between 2018 and 2022 experienced different changes in centre-left vote share between the 2018 and 2022 elections. The analysis combines refugee reception data, commune-level election results, party ideology/coalition classifications, and commune-level employment data.

## Repository structure

```text
final_project/
├── code/
│   ├── 00_process_refugee_dataset.ipynb
│   ├── 01_clean_election_datasets.ipynb
│   └── 02_merge_regression.ipynb
├── data/
│   ├── cas_data.csv
│   ├── commune_results_election_2018.csv
│   ├── commune_results_election_2022.csv
│   ├── ches_dataset.csv
│   ├── unemp_data_2018_with_regione.csv
│   ├── unemp_data_2019_with_regione.csv
│   ├── unemp_data_2021_with_regione.csv
│   ├── unemp_data_2022_with_regione.csv
│   ├── cas_refugees_by_commune_2018_2022.csv
│   └── merged_elections.csv
├── output/
│   └── centre_left_change_vs_refugees.png
└── README.md
```

The notebooks are numbered in the order they should be run. The `data/` directory stores raw and processed datasets, while `output/` stores generated figures and other final outputs.

If the raw data are not included directly in the GitHub repository, add a shared data-folder link here:

**Data folder link:** `[add link here]`

## Code files and run order

| File | Inputs | What it does | Outputs |
|---|---|---|---|
| [`00_process_refugee_dataset.ipynb`](code/00_process_refugee_dataset.ipynb) | `data/cas_data.csv` | Cleans the CAS refugee reception dataset, separates the data by year from 2018 to 2022, aggregates refugee counts by commune, calculates refugees per 1,000 inhabitants for each year, and then calculates the mean refugee presence across the five-year period. | `data/cas_refugees_by_commune_2018_2022.csv` |
| [`01_clean_election_datasets.ipynb`](code/01_clean_election_datasets.ipynb) | `data/commune_results_election_2018.csv`, `data/commune_results_election_2022.csv`, `data/ches_dataset.csv` | Cleans the 2018 and 2022 commune-level election datasets, uses CHES party data and manually defined party lookup tables to classify parties into ideological/electoral blocs, calculates coalition vote shares, and merges 2018 and 2022 election results. | `data/merged_elections.csv` |
| [`02_merge_regression.ipynb`](code/02_merge_regression.ipynb) | `data/cas_refugees_by_commune_2018_2022.csv`, `data/merged_elections.csv`, `data/unemp_data_2018_with_regione.csv`, `data/unemp_data_2019_with_regione.csv`, `data/unemp_data_2021_with_regione.csv`, `data/unemp_data_2022_with_regione.csv` | Merges the processed refugee, election, and employment datasets; creates the final commune-level regression dataset; estimates an OLS regression of centre-left vote-share change on refugee presence and controls; and creates a scatterplot with a linear fit. | Regression output printed in notebook; `output/centre_left_change_vs_refugees.png` |

## Data sources and variables

The unit of analysis is the Italian commune. The main datasets are:

1. **CAS refugee reception data**  
   Used to measure the number of refugees in reception centers by commune between 2018 and 2022.

2. **Italian Chamber of Deputies election data, 2018 and 2022**  
   Used to calculate commune-level coalition vote shares and vote-share changes between 2018 and 2022.

3. **CHES party dataset**  
   Used to help classify Italian parties into ideological/electoral blocs.

4. **ISTAT employment data**  
   Used to create commune-level employment controls. The analysis uses employment data for 2018, 2019, 2021, and 2022.

Key variables created in the analysis include:

| Variable | Definition |
|---|---|
| `refugees_per_1000_inhabitants_mean` | Mean number of refugees per 1,000 inhabitants in each commune across 2018, 2019, 2020, 2021, and 2022. |
| `centre_left_coalition_perc_18` | Centre-left coalition vote share in the 2018 Chamber of Deputies election. |
| `centre_left_coalition_perc_22` | Centre-left coalition vote share in the 2022 Chamber of Deputies election. |
| `centre_left_change_22_18` | Change in centre-left coalition vote share, calculated as 2022 centre-left vote share minus 2018 centre-left vote share. |
| `employment_rate_mean` | Mean commune-level employment rate across the available employment years used in the analysis. |

## Empirical specification

The main regression estimated in `02_merge_regression.ipynb` is:

```text
centre_left_change_22_18 =
    β0
    + β1(refugees_per_1000_inhabitants_mean)
    + β2(employment_rate_mean)
    + β3(centre_left_coalition_perc_18)
    + ε
```

The dependent variable is the change in centre-left vote share from 2018 to 2022. The main independent variable is average refugee presence per 1,000 inhabitants between 2018 and 2022. The model also controls for the average employment rate and the 2018 centre-left vote share.

This is an observational analysis, so the regression should be interpreted as evidence of association rather than a causal estimate.

## How to reproduce the analysis

1. Clone or download this repository.

2. Install the required Python packages:

```bash
pip install pandas numpy matplotlib seaborn plotnine statsmodels jupyter
```

3. Place all required raw data files in the `data/` folder.

4. Open Jupyter Notebook or JupyterLab:

```bash
jupyter notebook
```

5. Run the notebooks in this order:

```text
code/00_process_refugee_dataset.ipynb
code/01_clean_election_datasets.ipynb
code/02_merge_regression.ipynb
```

6. Check the generated outputs:
   - Processed refugee dataset: `data/cas_refugees_by_commune_2018_2022.csv`
   - Processed election dataset: `data/merged_elections.csv`
   - Scatterplot: `output/centre_left_change_vs_refugees.png`

## Notes on paths and reproducibility

The code is intended to use relative paths from the project folder rather than machine-specific paths. Avoid paths such as:

```text
/Users/yourname/Documents/final_project/data/file.csv
```

Instead, the notebooks should use `pathlib` and relative project directories, for example:

```python
from pathlib import Path

PROJECT_DIR = Path.cwd().parent
DATA_DIR = PROJECT_DIR / "data"
OUTPUT_DIR = PROJECT_DIR / "output"

OUTPUT_DIR.mkdir(exist_ok=True)
```

Then files should be loaded using:

```python
pd.read_csv(DATA_DIR / "cas_data.csv")
```

and saved using:

```python
df.to_csv(DATA_DIR / "processed_file.csv", index=False)
```

This makes the project easier to run on another computer.

## Merge strategy

The analysis uses exact-match merges.

- Refugee datasets are aggregated by commune and merged across years using commune identifiers and commune names.
- Election datasets are merged across 2018 and 2022 using commune and electoral-region/circumscription information.
- The final refugee-election dataset is merged using commune names.
- Employment data are merged after standardizing commune names to uppercase and stripping whitespace.

The notebooks include merge diagnostics for key merges, including row counts before and after merging and the number of matched and unmatched rows.

## Limitations

Several limitations should be considered when interpreting the results:

1. The analysis is observational and does not establish a causal effect of refugee presence on vote-share change.
2. The refugee measure is based on CAS reception-center data and may not capture all forms of refugee or migrant presence.
3. Employment data for 2020 are not included, so the employment control is based on the available years only.
4. Exact matching on commune names can miss observations when names differ across datasets because of spelling, formatting, or administrative changes.
5. Party-bloc classification requires judgment, especially when using party-level CHES data to classify electoral lists and coalitions.

## Output figure

The main figure generated by the code is:

```text
output/centre_left_change_vs_refugees.png
```

This figure plots average refugees per 1,000 inhabitants against the change in centre-left vote share from 2018 to 2022, with a fitted linear regression line.

## AI/coding assistance disclosure

Claude was primarily used for website-building support and for step-by-step help with GitHub/Vercel deployment issues. ChatGPT was used for limited support with the linear regression code and project formatting.

Agentic website coding history:  
https://drive.google.com/file/d/1rmaNIxP2rWptIOtNx9n0kGXc_kKxlRD-/view?usp=sharing

Agentic analysis coding history:  
https://drive.google.com/file/d/1FflYCupmnLtSI_PcdCAMGDH3sefkfxAq/view?usp=sharing
