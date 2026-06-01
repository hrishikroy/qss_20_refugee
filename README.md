# qss_20_refugee

**Project Summary:** 
The primary question that I am looking to answer is whether or not having a higher share of refugees in an area results in lesser votes for centre-left parties and subsequently higher share of votes for centre-right or far-right parties in Italy. 

**final_project_1.ipynb** contains all the code for loading the datasets, cleaning and merging them together, and running a regression which has centre-left vote share difference between 2022 and 2018 as a dependent variable and the number of refugees per 1000 inhabitants as an independent variable, while having employment rate and baseline center-left support (represented through a proxy of centre-left vote share in 2018) as control variables. All these variables are at the Comune level - which is the smallest administrative level in Italy.

**figure_1.png** contains a regression plot of the centre-left vote share difference between 2022 and 2018 and the number of refugees. 
**table.png** contains a table with the results of the regression. 

Within, the _data_ folder which is inside the _code_ folder, **commune_results_election_2018.csv** and **commune_results_election_2018.csv** are the datasets on the national election results in the years of 2018 and 2022. 

**unemp_data_2018_with_regione.csv**, **unemp_data_2019_with_regione.csv**, **unemp_data_2021_with_regione.csv**, and **unemp_data_2022_with_regione.csv**, has data on the annual unemployment rates for the years 2018, 2019, 2021, and 2022. 

**cas_data.csv** has the data on the CAS refugee centers, including their locations and population, between the years of 2018 to 2023. 

The datasets have been sourced from the following sources: 
- ISTAT (Istituto Nazionale di Statistica) 
- Italian Ministry of Interior 
- Openpolis Foundation and ActionAid
