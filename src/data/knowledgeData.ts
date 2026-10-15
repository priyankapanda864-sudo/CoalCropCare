import { KnowledgeItem, FaqItem, CropGuideItem } from '../types';
import heroImg from '../assets/images/hero_coalcrop_landscape_1790309504962.jpg';
import diagramImg from '../assets/images/coal_mining_types_diagram_1790309519054.jpg';
import comparisonImg from '../assets/images/crop_leaf_dust_comparison_1790309532576.jpg';

export const HERO_IMAGE_PATH = heroImg;
export const COAL_MINING_DIAGRAM_PATH = diagramImg;
export const CROP_LEAF_COMPARISON_PATH = comparisonImg;

export interface MiningImpactFlowStep {
  stepNumber: string;
  stageName: string;
  title: string;
  simpleDescription: string;
  mechanism: string;
  keyFactors: string[];
}

export const MINING_TO_FARM_FLOW: MiningImpactFlowStep[] = [
  {
    stepNumber: '01',
    stageName: 'Mining Work',
    title: 'Digging and Breaking Coal',
    simpleDescription: 'Big machines dig, blast, and break coal out of the ground.',
    mechanism: 'Blasting and breaking rocks creates fine black dust in the air. Big heaps of dug-up earth and coal sit open to the wind and rain.',
    keyFactors: [
      'How far your field is from the mine',
      'Whether the mine is an open pit or deep underground',
      'Whether the mine sprays water on dirt roads to stop dust from flying',
    ],
  },
  {
    stepNumber: '02',
    stageName: 'Dust in Air & Water',
    title: 'Wind Carries Dust, Rain Washes Dirt',
    simpleDescription: 'Wind blows black dust across fields. Rain washes loose dirt downhill toward farms.',
    mechanism: 'Strong wind blows light dust into nearby villages. Heavy rain washes loose black dirt and coal particles from open ground into streams and ditches.',
    keyFactors: [
      'Wind speed and which way the wind blows',
      'Trees or hills standing between the mine and the farm',
      'How hard it rains during the monsoon',
    ],
  },
  {
    stepNumber: '03',
    stageName: 'Reaching Soil & Water',
    title: 'Dust Settles on Fields and Ponds',
    simpleDescription: 'Dust drops onto soil and into ponds. Dirty rainwater can reach village irrigation ditches.',
    mechanism: 'Over time, falling dust mixes into the top layer of farm soil. Farm ponds and ditches turn murky if dirty water from the mine area flows into them.',
    keyFactors: [
      'How much natural compost and manure is in the soil',
      'How close farm ponds are to coal roads',
      'Whether fields get fresh, clean canal water',
    ],
  },
  {
    stepNumber: '04',
    stageName: 'Reaching the Crop',
    title: 'Dust on Leaves and Roots',
    simpleDescription: 'Dust covers green leaves. Changing soil water can affect plant roots.',
    mechanism: 'A layer of dark dust blocks sunlight from reaching the green leaf. Leaves need sunlight to make food for the plant. Heavy dust can also block the tiny breathing holes on leaves.',
    keyFactors: [
      'Leaf type (hairy leaves trap dust more than smooth leaves)',
      'Crop stage (flowering crops are more sensitive)',
      'Rain that can wash dust off leaves naturally',
    ],
  },
  {
    stepNumber: '05',
    stageName: 'What Farmers Notice',
    title: 'Crop Growth and What Farmers Can Do',
    simpleDescription: 'Farmers notice dull leaves, slower plant growth, or hard soil, and take simple steps to protect their crops.',
    mechanism: 'When leaves get less sunlight, crops may grow slower or make fewer grains. Farmers can plant tree rows and add cow dung manure to keep crops healthy and strong.',
    keyFactors: [
      'Planting a thick row of trees along the field edge',
      'Writing down what you see in the field each week',
      'Testing soil and water with local farm experts',
    ],
  },
];

export interface CropEffectTopic {
  id: string;
  title: string;
  iconName: string;
  cause: string;
  whatMayHappen: string;
  whatFarmersCanObserve: string;
  caveatNote: string;
}

export const CROP_EFFECT_TOPICS: CropEffectTopic[] = [
  {
    id: 'dust-leaves',
    title: 'Coal Dust Settling on Leaves',
    iconName: 'Leaf',
    cause: 'Wind carries fine black coal dust and drops it on the leaves of crops.',
    whatMayHappen: 'The dark dust forms a layer on the leaf. This blocks sunlight. Leaves need sunlight to make food for the plant (this process is called photosynthesis). Dust can also block the tiny breathing holes (stomata) on the leaf.',
    whatFarmersCanObserve: 'A dull grey or black layer on leaves; leaves feel rough and gritty when rubbed with fingers; leaves lose their shiny green look.',
    caveatNote: 'Road dust, ash from burning wood, and plant fungus can look like coal dust. Seeing black dust alone does not prove it is from coal.',
  },
  {
    id: 'soil-properties',
    title: 'Changes in Soil Properties',
    iconName: 'Layers',
    cause: 'Black dust settling on fields over time and shaking from heavy trucks passing nearby.',
    whatMayHappen: 'Very fine dust can fill the tiny spaces between soil grains. When the soil dries, a hard crust can form on top. Water may take longer to soak in.',
    whatFarmersCanObserve: 'Soil looks darker than usual; water takes longer to sink into the soil after watering; a hard, thin crust forms on the surface when dry.',
    caveatNote: 'Good compost and animal manure also make soil dark and healthy. Dark soil is often a good sign, so only a soil test in a lab can tell the difference.',
  },
  {
    id: 'water-runoff',
    title: 'Dirty Water Flowing from Mine Areas',
    iconName: 'Droplet',
    cause: 'Rainwater washing over coal heaps and mine roads, flowing into village streams and canals.',
    whatMayHappen: 'Floating black dirt makes water murky. Sunlight cannot pass easily through dirty water in paddy fields. In some places, mine water can also become sour (acidic).',
    whatFarmersCanObserve: 'Dark, cloudy, or grey water in canals; black mud settling at the bottom of nursery beds; an oily shine on puddles.',
    caveatNote: 'River mud from floods and rotting leaves also make water cloudy. Testing the water is the only sure way to know.',
  },
  {
    id: 'transportation-dust',
    title: 'Dust from Coal Trucks',
    iconName: 'Truck',
    cause: 'Open trucks carrying coal on unpaved village roads kick up clouds of dust.',
    whatMayHappen: 'Passing trucks create steady dust clouds. Crops planted within 50 to 150 metres of the road get the heaviest layer of dust.',
    whatFarmersCanObserve: 'Rows of crops right next to the road have thick dust on their leaves, while crops deeper inside the field (200 metres away) stay much cleaner.',
    caveatNote: 'Normal road mud, truck smoke, and tyre dust also settle on roadside crops.',
  },
  {
    id: 'plant-development',
    title: 'Possible Effects on Crop Growth',
    iconName: 'Sprout',
    cause: 'Leaves receiving less sunlight for a long time, warming up under dark dust, and having trouble breathing.',
    whatMayHappen: 'When leaves make less food, plants may grow slower, take longer to flower, or produce fewer or smaller grains.',
    whatFarmersCanObserve: 'Plants may look slightly shorter than crops grown farther away from the mine; flowering may be delayed; leaves may look smaller.',
    caveatNote: 'Lack of fertilizer (like nitrogen or zinc), lack of water, and insect pests can cause the exact same slow growth.',
  },
];

export const KNOWLEDGE_LIBRARY_ITEMS: KnowledgeItem[] = [
  {
    id: 'lib-coal',
    category: 'coal',
    title: 'What is Coal?',
    simpleExplanation: 'Coal is a black rock found deep underground. It was formed millions of years ago from ancient dead plants buried under heavy mud and heat.',
    whyItMatters: 'Coal burns easily to make electricity. Because it is made of black carbon, crushed coal creates fine black dust that can float in the air.',
    whatFarmersCanObserve: 'Lumps of coal feel hard and brittle. When crushed, they leave a black mark on your fingers, unlike farm soil which turns into smooth mud when wet.',
    scientificContext: 'Coal types range from soft brown coal (lignite) to hard black coal (bituminous and anthracite).',
  },
  {
    id: 'lib-mining',
    category: 'coal',
    title: 'How is Coal Mined?',
    simpleExplanation: 'In open-cast mining, big machines dig away the topsoil and rocks to reach coal near the surface. In underground mining, workers dig deep tunnels below ground.',
    whyItMatters: 'Open-cast mines dig up large areas of land and make more dust in the air. Underground mines make less surface dust, but pump out dirty water from deep inside the earth.',
    whatFarmersCanObserve: 'Open pit mines look like huge terraced steps with big mounds of waste rocks, tall digging machines, and heavy dump trucks.',
    scientificContext: 'Most coal in India is extracted using open-cast surface mining.',
  },
  {
    id: 'lib-dust',
    category: 'coal',
    title: 'What is Coal Dust?',
    simpleExplanation: 'Coal dust means tiny bits of black coal that break off and float in the air when coal is blasted, crushed, or carried in trucks.',
    whyItMatters: 'Very light dust particles can stay in the air for hours. The wind can carry them hundreds of metres before they drop onto leaves, soil, and ponds.',
    whatFarmersCanObserve: 'A fine black layer on flat surfaces, window glasses, leaves, or clothes hung outside near coal roads.',
    scientificContext: 'Heavy dust settles quickly near roads, while very fine particles (called PM10 and PM2.5) can drift farther downwind.',
  },
  {
    id: 'lib-soil',
    category: 'soil',
    title: 'Healthy Farm Soil',
    simpleExplanation: 'Healthy soil is alive. It contains tiny rock particles, organic manure (humus), air, water, and millions of helpful earthworms and tiny soil creatures.',
    whyItMatters: 'Healthy soil holds water and feeds crops with food (nutrients like nitrogen, phosphorus, and potassium) through their roots.',
    whatFarmersCanObserve: 'Good soil is crumbly, smells fresh and earthy, holds moisture without staying waterlogged, and has earthworms crawling in it.',
    scientificContext: 'Soil pH shows whether soil is sweet (neutral) or sour (acidic). Most crops grow best when soil pH is between 6.0 and 7.5.',
  },
  {
    id: 'lib-water',
    category: 'water',
    title: 'Clean Water for Irrigation',
    simpleExplanation: 'Irrigation water brings moisture and air to crop roots. Good farm water should be clean and not too salty or sour.',
    whyItMatters: 'Dirty water carrying coal dirt can coat young roots, lower air in the soil, or make the water sour.',
    whatFarmersCanObserve: 'Good irrigation water looks clear. Dark grey, brown, or bad-smelling water with black mud floating in it may mean dirty water is flowing in from mine areas.',
    scientificContext: 'Good irrigation water should have a balanced pH (6.5 to 8.0) and low amounts of floating dirt.',
  },
  {
    id: 'lib-crops',
    category: 'crops',
    title: 'Which Crops Catch More Dust?',
    simpleExplanation: 'Different crops have different leaves. Crops with broad, rough, or hairy leaves catch and hold dust easily. Crops with smooth, upright leaves let dust slide off.',
    whyItMatters: 'Knowing which crops catch dust helps farmers choose what to plant near roads or put up protective tree fences.',
    whatFarmersCanObserve: 'Paddy leaves are smooth and let dust wash off in rain. Brinjal, tomato, and pumpkin leaves have tiny hairs that hold onto black dust tightly.',
    scientificContext: 'Tiny leaf hairs (trichomes) catch 30% to 50% more dust than smooth, waxy leaf surfaces.',
  },
  {
    id: 'lib-photosynthesis',
    category: 'crops',
    title: 'Photosynthesis: How Leaves Make Food',
    simpleExplanation: 'Photosynthesis means the process by which green leaves use sunlight, water, and air to make food for the plant.',
    whyItMatters: 'When a thick layer of dust covers leaves, less sunlight gets inside, and tiny breathing holes (stomata) can get partially blocked.',
    whatFarmersCanObserve: 'Leaves under thick dust look dull instead of bright green, and the crop may grow a bit slower.',
    scientificContext: 'Green parts of the plant need sunlight to turn carbon dioxide and water into plant sugars.',
  },
  {
    id: 'lib-sustainable-ag',
    category: 'sustainability',
    title: 'Farming that Protects Nature',
    simpleExplanation: 'This means farming using natural, low-cost methods like tree borders, cow dung manure, and compost to keep soil and crops healthy.',
    whyItMatters: 'Instead of spending money on expensive or harmful chemicals, natural methods protect soil and crops for many years.',
    whatFarmersCanObserve: 'Crops planted behind a thick row of neem or bamboo trees have much cleaner leaves and hold moisture better.',
    scientificContext: 'A thick row of trees can block 60% to 75% of airborne dust before it reaches crop rows.',
  },
  {
    id: 'lib-monitoring',
    category: 'monitoring',
    title: 'Checking and Recording Your Field',
    simpleExplanation: 'This means walking through your field once a week to look closely at leaves, soil, and water, and writing down what you see.',
    whyItMatters: 'Keeping simple notes gives you clear facts to show to local farm officers (Block Agriculture Officers) and scientists.',
    whatFarmersCanObserve: 'Writing down the date, how dusty leaves look, when it rained, and how clean canal water looks in a notebook or phone.',
    scientificContext: 'Regular notes taken by farmers provide real on-ground facts that help agricultural scientists give better advice.',
  },
];

export const CROP_GUIDE_ITEMS: CropGuideItem[] = [
  {
    name: 'Paddy / Rice (Oryza sativa)',
    scientificName: 'Oryza sativa',
    category: 'cereal',
    leafTexture: 'Upright, narrow leaves with a smooth, slightly waxy surface.',
    typicalSeason: 'Kharif (Monsoon) & Boro (Winter)',
    vulnerabilityFactors: [
      'Standing water in paddy fields can trap falling dust and dirty runoff water.',
      'Murky water can block sunlight from reaching young seedlings.',
      'Flowering time is sensitive if heavy dust settles when flowers open.',
    ],
    keyObservationPoints: [
      'Check if upper leaf tips have black dust lines along the veins.',
      'Check if the nursery bed water has black mud settling on the bottom.',
      'Note if flowering or grain filling is taking longer than usual.',
    ],
  },
  {
    name: 'Wheat (Triticum aestivum)',
    scientificName: 'Triticum aestivum',
    category: 'cereal',
    leafTexture: 'Smooth, upright leaves with a light waxy shine.',
    typicalSeason: 'Rabi (Winter)',
    vulnerabilityFactors: [
      'Winter is usually dry, so there is little rain to wash dust off leaves naturally.',
      'Cold winter air can keep dust floating low near the ground.',
      'Young plants need full sunlight to make strong roots and branches.',
    ],
    keyObservationPoints: [
      'Look for dust settling on top leaves when grains are filling.',
      'Feel the leaf between your fingers to see if it feels rough like sand.',
      'Check if morning dew on leaves leaves dark dirty spots when it dries.',
    ],
  },
  {
    name: 'Maize / Corn (Zea mays)',
    scientificName: 'Zea mays',
    category: 'cereal',
    leafTexture: 'Broad, long arching leaves that catch dust easily.',
    typicalSeason: 'Kharif, Rabi, and Spring',
    vulnerabilityFactors: [
      'Wide leaves act like flat plates that catch falling dust.',
      'Dust can get trapped where the leaf joins the main stem.',
      'Cob silk and tassels can catch dust if weather is very dusty.',
    ],
    keyObservationPoints: [
      'Check the wide middle part of the leaf where dust settles most.',
      'Check inside the leaf base for trapped dirt after windy days.',
      'Look at cob development to see if grains are filling evenly.',
    ],
  },
  {
    name: 'Brinjal / Eggplant (Solanum melongena)',
    scientificName: 'Solanum melongena',
    category: 'vegetable',
    leafTexture: 'Broad, soft leaves covered with tiny fine hairs.',
    typicalSeason: 'Grown year-round',
    vulnerabilityFactors: [
      'Hairy leaves grip black dust tightly; rain does not wash it off easily.',
      'Leaves lose water fast, so blocked leaf pores can stress the plant.',
      'Dust can also settle on the skin of developing fruits.',
    ],
    keyObservationPoints: [
      'Gently wipe a white cotton ball across the leaf to check for black dirt.',
      'Look under the leaf for grey dust clinging to the hairs.',
      'Check if flowers drop off too early during dry, dusty weeks.',
    ],
  },
  {
    name: 'Tomato (Solanum lycopersicum)',
    scientificName: 'Solanum lycopersicum',
    category: 'vegetable',
    leafTexture: 'Small divided leaves with sticky hairs and a strong smell.',
    typicalSeason: 'Winter and Mild Summer',
    vulnerabilityFactors: [
      'Sticky leaf hairs hold onto dust and road dirt very tightly.',
      'Dark dust can make the leaf hotter in strong sunshine.',
      'Young tender shoots can curl if covered in heavy dust.',
    ],
    keyObservationPoints: [
      'Check young tender tips and flower clusters for black dirt.',
      'Look for early yellowing on lower older leaves.',
      'Check if green developing tomatoes have dark dust spots on their skin.',
    ],
  },
  {
    name: 'Pulses / Dal (Arhar, Gram, Moong)',
    scientificName: 'Leguminosae family',
    category: 'pulse',
    leafTexture: 'Delicate, thin leaves that fold together in the evening.',
    typicalSeason: 'Kharif & Rabi',
    vulnerabilityFactors: [
      'Roots need food made by leaves to feed tiny root nodules that take nitrogen from air.',
      'Delicate leaves can get shaded if coated with dark dust.',
      'Pod filling can slow down if plants are stressed.',
    ],
    keyObservationPoints: [
      'Check if leaves close smoothly in the evening without being weighed down by dirt.',
      'Carefully check root nodules: healthy nodules are pink or red inside.',
      'Check how many pods are growing and if the seeds inside are well-filled.',
    ],
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'Can coal dust reach farm fields?',
    answer: 'Yes, light coal dust carried by wind can reach nearby fields. Usually, fields within 500 metres to 1 kilometre of an open mine or dirt coal road receive the most dust. How much dust reaches your field depends on wind direction, trees in the area, and whether the mine sprays water on dirt roads.',
    category: 'Coal & Dust',
  },
  {
    question: 'How does dust settle on crop leaves?',
    answer: 'Dust settles naturally from the air onto flat leaves. Morning dew can also make dust stick to the leaf surface. Crops with hairy leaves (like brinjal and tomato) hold onto dust much more tightly than smooth leaves (like paddy and wheat), making it harder for rain to wash the dust away.',
    category: 'Harm on Crops',
  },
  {
    question: 'Can mining harm farm soil?',
    answer: 'Mining can sometimes affect nearby soil. This can happen from trucks shaking the ground, dust settling over many years, or dirty water washing in during heavy rains. In some places, dust can make the surface soil form a hard crust. But soil changes vary a lot, and only a lab soil test can tell the true condition of your soil.',
    category: 'Soil & Water',
  },
  {
    question: 'Can mining affect farm water?',
    answer: 'Rainwater flowing across open coal piles or mine roads can carry black dirt into village streams and canals. This makes the water dark and murky. In some coal areas, this water can also become sour (acidic). Farmers should avoid taking water directly from dirty, dark streams coming out of mine areas.',
    category: 'Soil & Water',
  },
  {
    question: 'Do all crops react to coal dust in the same way?',
    answer: 'No. Different crops react differently. Crops with smooth, waxy leaves (like paddy and cabbage) let dust wash off easily in the rain. Crops with hairy leaves (like brinjal and tomato) trap dust tightly. Also, upright leaves (like wheat) catch less falling dust than broad flat leaves.',
    category: 'Harm on Crops',
  },
  {
    question: 'How can farmers check their fields easily?',
    answer: 'Farmers can do a simple weekly walk in their field. Wipe a leaf with your finger to check for black dust, look at the color of canal water, check how deep roots are growing, and write down what you see in a simple notebook or use the "Check and Record Your Field" tool on this website.',
    category: 'Field Check',
  },
  {
    question: 'Where can farmers get their soil and water tested?',
    answer: 'Farmers can take samples to their nearest Krishi Vigyan Kendra (KVK), District Soil Testing Lab, or Block Agriculture Office. Basic soil testing (for soil sweetness/acidity, organic carbon, and plant food like nitrogen, phosphorus, and potassium) is often free or very cheap under the government Soil Health Card scheme.',
    category: 'Help & Testing',
  },
  {
    question: 'Does black dust on leaves mean the crop is poisoned?',
    answer: 'No. Black dust sitting on leaves is on the outside, just like normal road dust. It does not automatically mean the food inside or grains are poisoned. While heavy dust can slow plant growth by blocking sunlight, only laboratory testing can show if any harmful substance entered the plant. Always wash vegetables well with clean water before eating.',
    category: 'True Facts',
  },
];

export interface NcscProjectData {
  title: string;
  theme: string;
  subTheme: string;
  gradeLevel: string;
  academicYear: string;
  aim: string;
  hypothesis: string;
  methodology: string[];
  surveyDetails: {
    targetAudience: string;
    sampleSize: string;
    keyQuestions: string[];
  };
  observations: string[];
  dataAnalysis: string[];
  results: string[];
  sustainableSolutions: string[];
  futurePlan: string[];
}

export const NCSC_PROJECT_DATA: NcscProjectData = {
  title: 'Crops Affected by Coal Mines',
  theme: 'Science and Innovation for Sustainability',
  subTheme: 'Food, Agriculture & Health',
  gradeLevel: 'Class 7',
  academicYear: '2026–27',
  aim: 'To find out how living near coal mines and coal truck roads affects crop leaves, soil, and irrigation water, and to find simple, low-cost natural ways to protect crops.',
  hypothesis: 'Crops growing within 500 metres of coal mines or unpaved coal truck roads have more dust on their leaves and look less green than crops growing 3 kilometres away.',
  methodology: [
    'Farmer Survey: Spoke directly with 35 local farmers across 4 villages located at different distances from the coal mine.',
    'Checking Dust on Leaves: Collected leaves from paddy, brinjal, and maize fields; used clear tape and clean cotton swabs to see how much dust was on the leaves.',
    'Checking Farm Water: Tested irrigation water from 8 farm points using simple meters to check if water was clear or sour.',
    'Looking Under a Microscope: Looked at leaf surfaces under a school microscope to see how dust covers the tiny breathing holes on leaves.',
    'Comparing Crop Growth: Measured plant height, number of leaves, and green color in dusty fields and cleaner fields over 60 days.',
  ],
  surveyDetails: {
    targetAudience: 'Small farmers growing paddy, vegetables, and pulses near coal mining areas.',
    sampleSize: '35 farming families across 4 village areas.',
    keyQuestions: [
      'Do you see black dust settling on your crop leaves during dry months?',
      'Does distance from the coal truck road change how thick the dust is?',
      'Have you noticed any change in canal water after rainstorms?',
      'What simple steps (like planting trees or watering) have you tried to protect crops?',
    ],
  },
  observations: [
    'Crops within 300 metres of the coal truck road had a clear dark grey dust layer on their leaves, especially on hairy vegetables like brinjal and tomato.',
    'Fields protected by a row of bamboo, neem, and mango trees had up to 65% less dust on their leaves compared to open fields.',
    'Monsoon rain washed leaves clean naturally, but farm ponds collected dark silt from open slopes.',
    'Dry winter months had the most dust because there was no rain to wash the leaves.',
  ],
  dataAnalysis: [
    'Distance from road: Dust drops quickly once you move more than 800 metres away from unpaved coal roads.',
    'Which crops catch more dust: Brinjal and tomato leaves caught over 2 times more dust than paddy leaves because of their fine leaf hairs.',
    'Water quality check: 6 out of 8 farm ponds had safe, normal water, showing that coal dust in the area acted mostly as a dust shade on leaves rather than making the water very sour.',
  ],
  results: [
    'The main effect on crops in the surveyed area is physical dust blocking sunlight from reaching leaves, which can slow down plant growth.',
    'Moving coal trucks on unpaved dirt roads caused more daily dust on crops than the mine pit itself.',
    'Planting 2 to 3 rows of local trees (like Neem, Subabul, and Bamboo) along the field border works like a natural green wall that catches dust before it hits crops.',
  ],
  sustainableSolutions: [
    'Plant Green Tree Borders: Plant two rows of fast-growing green trees (Bamboo, Neem, Jamun) along the field edge facing the mine or road.',
    'Add Cow Dung & Compost: Add farmyard manure and straw mulch to keep soil soft, spongy, and moist.',
    'Ask Trucks to Cover Coal: Work with village leaders and mine managers so coal trucks are covered with tarpaulin and roads are sprayed with water.',
    'Keep a Field Diary: Write down weekly field notes so you have clear facts to share with local farm officers.',
  ],
  futurePlan: [
    'Test crops in both rainy season (Kharif) and winter season (Rabi) to compare differences.',
    'Work with the local Krishi Vigyan Kendra (KVK) to test leaf greenness in a certified lab.',
    'Provide tree saplings of dust-catching trees to 50 farming families living near coal roads.',
    'Share the project findings with school students, farmers, and mine managers to find helpful solutions together.',
  ],
};

export const EXTENSION_HELP_GUIDE = {
  title: 'Where Farmers Can Get Verified Help',
  subTitle: 'Connect with local government farm centres, testing labs, and farm scientists.',
  institutions: [
    {
      name: 'Krishi Vigyan Kendra (KVK)',
      role: 'District Farm Science Centre',
      description: 'Gives free advice to farmers, teaches good farming methods, helps identify crop diseases, and shows how to plant protective tree borders.',
      actionNote: 'Visit your district KVK office or attend their village farm camps.',
    },
    {
      name: 'District Soil Testing Laboratory',
      role: 'Soil Testing Lab',
      description: 'Tests your field soil for sweetness/acidity (pH), organic carbon, and essential plant food (nitrogen, phosphorus, and potassium).',
      actionNote: 'Take 500 grams of soil mixed from 5 spots in your field and submit it for a Soil Health Card.',
    },
    {
      name: 'Block Agriculture Officer & Kisan Call Centre',
      role: 'Government Farm Support',
      description: 'Helps farmers get government support for drip watering, farm ponds, compost pits, and tree saplings under farm schemes.',
      actionNote: 'Call the National Kisan Call Centre toll-free at 1800-180-1551 to speak with experts in your language.',
    },
    {
      name: 'State Pollution Control Board (SPCB)',
      role: 'Environment and Dust Monitoring Office',
      description: 'Checks whether mines are spraying water on dirt roads and making sure coal trucks are covered with tarpaulins.',
      actionNote: 'Speak with village elders to send a group letter to the local environment office about spraying water on dusty roads.',
    },
  ],
  sampleCollectionTips: [
    'How to Take a Soil Sample: Clear dry leaves on top. Dig a V-shaped hole (15 cm deep). Take a thin slice of soil from top to bottom. Repeat across 5 spots in your field. Mix all the soil together, dry in shade, and put 500 grams in a clean plastic bag.',
    'How to Take a Water Sample: Wash a clean 1-litre plastic bottle 3 times with the canal or pond water. Fill the bottle from under the surface (avoid mud at the bottom). Close tightly, write the date and canal name, and take to the lab within 24 hours.',
    'How to Take Field Notes: Write down the crop name, date of last rain, how far the field is from the road, and check both upper and lower leaf surfaces in morning light.',
  ],
};
