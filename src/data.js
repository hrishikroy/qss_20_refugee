// All project content lives here so the components stay presentational.

export const meta = {
  title: 'Does greater exposure to refugees shift voter behavior?',
  subtitle: 'Evidence from Italy',
  author: 'Hrishik Roy',
  context: 'A commune-level study of refugee reception and electoral change, 2018 \u2192 2022',
}

export const nav = [
  { id: 'question', label: 'Question' },
  { id: 'motivation', label: 'Motivation' },
  { id: 'data', label: 'Data' },
  { id: 'findings', label: 'Findings' },
  { id: 'limitations', label: 'Limitations' },
]

export const researchQuestion =
  'Amongst the communes that receive refugees in Italy, does receiving a greater amount of refugees cause voting patterns to shift more towards the right?'

export const motivation = {
  paragraphs: [
    'Past literature suggests that natives are often antagonized when they are exposed to immigrants or refugees from different backgrounds.',
    'For example, in a study conducted by Ryan Enos, commuters who were exposed to Spanish speakers on Boston\u2019s subway platforms developed more exclusionary attitudes toward immigrants.',
  ],
  citation: {
    text: 'Enos (2014), PNAS \u2014 \u201cCausal effect of intergroup contact on exclusionary attitudes\u201d',
    href: 'https://www.pnas.org/doi/10.1073/pnas.1317670111',
  },
  question:
    'But would such a shift in attitudes also be followed by a shift in political action \u2014 in how people actually vote?',
}

export const dataSources = [
  {
    name: 'ISTAT',
    full: 'Istituto Nazionale di Statistica',
    description:
      'Italy\u2019s national statistical institute. Provides commune-level demographic and socioeconomic indicators, including population and employment figures used as controls.',
    href: 'https://esploradati.istat.it/databrowser/#/en/dw/categories/IT1,Z0930TER,1.0/CFI_MUN/IT1,DF_COMP_FRA_IND_MUNICIPAL_01,1.0',
    site: 'esploradati.istat.it',
  },
  {
    name: 'Ministero dell\u2019Interno',
    full: 'Italian Ministry of the Interior',
    description:
      'The official historical archive of Italian election results, reported down to the commune level \u2014 the source for centre-left vote share in 2018 and 2022.',
    href: 'https://elezionistorico.interno.gov.it/',
    site: 'elezionistorico.interno.gov.it',
  },
  {
    name: 'Openpolis & ActionAid',
    full: 'Centri d\u2019Italia \u2014 open data',
    description:
      'The Centri d\u2019Italia project documents Italy\u2019s migrant reception system, providing open data on reception centres and the refugees they host across communes.',
    href: 'https://centriditalia.it/pages/open-data',
    site: 'centriditalia.it',
  },
]

export const findings = {
  shortAnswer:
    'Yes. A larger refugee presence is associated with a more negative change in centre-left vote share \u2014 communes that received more refugees shifted further away from the centre-left.',
  headlineStat: {
    value: '\u22120.037',
    unit: 'pp',
    caption:
      'For every additional refugee per 1,000 inhabitants, a commune\u2019s centre-left vote share change falls by ~0.037 percentage points.',
    sig: 'p < 0.01',
  },
  figure: {
    caption:
      'Refugees per 1,000 inhabitants vs. centre-left vote share change (2022\u20132018). Each point is a commune; the fitted line slopes gently downward.',
    sourceHref:
      'https://drive.google.com/file/d/1jyb3sd3zZs4mrKmqcxzgKAu-GrWB-B5N/view?usp=sharing',
  },
}

export const regression = {
  caption: 'Table 1 \u2014 Refugee presence and centre-left vote share change',
  depVar: 'Centre-left vote share change, 2022\u20132018',
  rows: [
    { label: 'Refugees per 1,000 inhabitants', coef: '\u22120.037', se: '0.007', stars: '***', highlight: true },
    { label: 'Employment rate', coef: '\u22120.036', se: '0.010', stars: '***' },
    { label: 'Centre-left vote share, 2018', coef: '\u22120.130', se: '0.012', stars: '***' },
    { label: 'Constant', coef: '7.228', se: '0.608', stars: '***' },
  ],
  stats: [
    { label: 'Observations', value: '2,879' },
    { label: 'R\u00b2', value: '0.069' },
    { label: 'Controls', value: 'Yes' },
  ],
  notes: 'Standard errors in parentheses.  *p < 0.10,  **p < 0.05,  ***p < 0.01.',
  sourceHref:
    'https://drive.google.com/file/d/1oRKa8P831Rsk-W72Nd5RT3VChvYrfHRm/view?usp=sharing',
}

export const code = `reg_model_data = reg_data_2[["centre_left_change_22_18",
        "refugees_per_1000_inhabitants_mean",
        "employment_rate_mean", "centre_left_coalition_perc_18"]].dropna()

model_controls = smf.ols(
    "centre_left_change_22_18 ~ refugees_per_1000_inhabitants_mean + employment_rate_mean + centre_left_coalition_perc_18",
    data=reg_model_data
).fit()

print(model_controls.summary())`

export const limitations = [
  {
    title: 'Missing data from 2020',
    detail:
      'A gap in the reception data for 2020 leaves part of the period uncovered.',
  },
  {
    title: 'SPRAR not included',
    detail:
      'The data omits the SPRAR network (Sistema di Protezione per Richiedenti Asilo e Rifugiati), so some hosted refugees are uncounted.',
  },
  {
    title: 'Potential missing confounders',
    detail:
      'Local factors that drive both reception levels and vote choice may not be fully captured by the controls.',
  },
  {
    title: 'Not a causal claim',
    detail:
      'These are associations from observational data; the design cannot establish that refugee exposure causes the shift.',
  },
]

export const links = {
  github: 'https://github.com/hrishikroy/qss_20_refugee',
}
